import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { ControllerInfoInBackend, ControllerInfoInContract } from 'src/types/vault.type';
import { ContractClient } from 'src/utils/ContractClient';

export const useControllerInfo = () => {

    const { data: controllerInfos, isLoading } = useQuery({
        queryKey: ['controller-info'],
        queryFn: () => getControllerInfos(),
        refetchInterval: 2000
    });

    return {
        controllerInfos,
        isLoading,
    };
};

export const getControllerInfoFromContract = async (): Promise<ControllerInfoInContract> => {
    try {
        const controller = ContractClient.getController();
        const implementationDelay = await controller.nextImplementationDelay();
        const profitProtocolNumerator = await controller.platformFeeNumerator();
        const profitProtocolReceiver = await controller.profitSharingReceiver();
        const profitStrategistNumerator = await controller.strategistFeeNumerator();
        const rewardForwarder = await controller.rewardForwarder();
        const universalLiquidator = await controller.universalLiquidator();

        return {
            implementationDelay: implementationDelay.toString(),
            profitProtocolNumerator: profitProtocolNumerator.toString(),
            profitProtocolReceiver: profitProtocolReceiver,
            profitStrategistNumerator: profitStrategistNumerator.toString(), 
            rewardForwarder: rewardForwarder, 
            universalLiquidator: universalLiquidator, 
        };
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};

export const getControllerInfoFromBackend = async (): Promise<ControllerInfoInBackend> => {
    try {
        const hardWorkers = await vaultApi.getHardWotkers();
        const whiteList = await vaultApi.getWhiteList();

        return {
            address: '0x798f111c92E38F102931F34D1e0ea7e671BDBE31',
            hardWorkers: hardWorkers.data.map((data) => data.address),
            whiteList: whiteList.data.map((data) => data.address),
        };
    } catch (error) {
        console.error('Error getting vault info from backend', error);
        throw error;
    }
}

export const getControllerInfos = async () => {
    try {
        const controllerInfoInBackEnd = await getControllerInfoFromBackend();
        const controllerInfoInContract = await getControllerInfoFromContract();
        return { ...controllerInfoInBackEnd, ...controllerInfoInContract };
    } catch (error) {
        console.error('Error getting controller info from contract', error);
        throw error;
    }
}
