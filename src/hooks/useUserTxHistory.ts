import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { TxHistory } from 'src/types/vault.type';

export const useUserTxHistory = ({ user, vault }: { user: string | undefined, vault: string | undefined }) => {
    const { data: historyInfo, isLoading } = useQuery({
        queryKey: ['user-tx-history'],
        queryFn: () => getUserTxHistory(user, vault),
        enabled: !!user && !!vault,
    });

    return {
        historyInfo,
        isLoading,
    };
};

export const getUserTxHistory = async (user: string | undefined, vault: string | undefined): Promise<TxHistory[]> => {
    try {
        if (!user || !vault) {
            return [];
        }
        const txHistory = await vaultApi.getUserTxHistory(vault, user);

        return txHistory.data;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
