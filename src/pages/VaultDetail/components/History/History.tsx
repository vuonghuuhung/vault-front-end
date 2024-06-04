import Loading from 'src/components/Loading/Loading';
import { VaultInfo } from 'src/types/vault.type';
import { useAccount } from 'wagmi';
import { useUserTxHistory } from 'src/hooks/useUserTxHistory';

const History = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const account = useAccount();

    const { historyInfo, isLoading } = useUserTxHistory({ user: account.address, vault: vaultDetail.vaultAddress });

    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    return (
        <>
            {historyInfo && (
                <div className="p-6 h-auto justify-center max-w-7xl rounded shadow-md">
                    <h1 className="block w-full text-center text-2xl font-bold mb-4 text-white">Transaction History</h1>
                    <div className="flex flex-col space-y-4">
                        {historyInfo.map((history) => (
                            <div
                                key={history.txHash}
                                className="flex justify-between items-center p-4 border rounded-lg"
                                onClick={() => seeTransaction(history.txHash)}
                            >
                                <div className="w-1/6 text-sm">
                                    <p className="truncate">{history.txHash}</p>
                                </div>
                                <div className="text-sm">
                                    <p>{history.eventName}</p>
                                </div>
                                <div className="w-1/6 text-sm">
                                    <p className="truncate">{history.from}</p>
                                </div>
                                <div className="w-1/6 text-sm">
                                    <p className="truncate">{history.to}</p>
                                </div>
                                <div className="w-1/6 text-sm">
                                    <p className="truncate">{history.logs}</p>
                                </div>
                                <div className="w-1/6 text-sm">
                                    <p>{history.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </>
    );
};

export default History;
