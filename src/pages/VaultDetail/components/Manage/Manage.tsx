import { ToastAction } from '@radix-ui/react-toast';
import Loading from 'src/components/Loading/Loading';
import { toast } from 'src/components/ui/use-toast';
import { useInvestHistory } from 'src/hooks/useInvestHistory';

import { VaultInfo } from 'src/types/vault.type';
import { doHardWork } from 'src/utils/ContractClient';
import { useEthersSigner } from 'src/utils/ethers';

const Manage = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const signer = useEthersSigner({ chainId: 31337 });

    const { historyInfo, isLoading } = useInvestHistory(vaultDetail.vaultAddress);
    
    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    const invest = async () => {
        if (signer) {
            const tx = await doHardWork({
                signer,
                vaultAddress: vaultDetail.vaultAddress,
            });

            toast({
                className: 'bg-black',
                title: `Invest/Re-invest`,
                description: `Successfully invested/re-invested`,
                action: (
                    <ToastAction
                        className="bg-white-500 text-white"
                        altText="Click to see transaction"
                        onClick={() => seeTransaction(tx)}
                    >
                        See transaction
                    </ToastAction>
                ),
            });
        }
    };

    return (
        <>
            {vaultDetail && (
                <div>
                    <div className="grid grid-cols-4 gap-4 mv-[25px]">
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">Live APY</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.estimatedAPY}%</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">Daily APY</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.dailyAPY}%</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">TVL</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.tvlUsd}</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <button
                                className="block w-full py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4]"
                                onClick={() => invest()}
                            >
                                Invest For Vault
                            </button>
                        </div>
                    </div>
                    <div className="mt-[25px] flex justify-center gap-6">


                        {historyInfo && (
                            <div className="p-6 h-auto justify-center max-w-7xl rounded shadow-md">
                                <h1 className="block w-full text-center text-2xl font-bold mb-4 text-white">
                                    Transaction History
                                </h1>
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



                    </div>
                </div>
            )}
            {!vaultDetail && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </>
    );
};

export default Manage;
