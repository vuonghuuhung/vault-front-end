import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { TxHistory } from 'src/types/vault.type';

export const useInvestHistory = (vault: string) => {
    const { data: historyInfo, isLoading } = useQuery({
        queryKey: ['invest-history'],
        queryFn: () => getInvestHistory(vault),
        enabled: !!vault,
    });

    return {
        historyInfo,
        isLoading,
    };
};

export const getInvestHistory = async (vault: string | undefined): Promise<TxHistory[]> => {
    try {
        if (!vault) {
            return [];
        }
        const txHistory = await vaultApi.getInvestHistory(vault);

        return txHistory.data;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
