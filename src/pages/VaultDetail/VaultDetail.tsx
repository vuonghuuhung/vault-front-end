import { Link } from 'react-router-dom';
import IconArrowLeft from 'src/assets/IconArrowLeft';
import IconChainType from 'src/assets/IconChainType';
import IconChainTypeS from 'src/assets/IconChainTypeS';
import IconDetailVault from 'src/assets/IconDetailVault';
import IconManageVault from 'src/assets/IconManageVault';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import path from 'src/constants/path';
import DetailsVault from './components/DetailsVault';
const VaultDetail = () => {
    return (
        <div className="">
            <Tabs defaultValue="details">
                <div className="pl-[76px] pr-[72px] bg-bgVaultDetail pt-[50px]">
                    <div className="mb-[49px]">
                        <Link
                            to={path.farms}
                            className="flex hover:bg-[#ecececb3] h-[35px] w-[96px] rounded-[5px] items-center justify-between px-[15px] py-[5px] border-[0.5px] border-white"
                        >
                            <IconArrowLeft />
                            <span className="pl-[15px] text-[14px] font-semibold">Back</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div>
                                <IconChainType width={69} height={69} />
                            </div>
                            <div className="translate-x-[-12px]">
                                <IconChainTypeS width={69} height={69} />
                            </div>
                        </div>
                        <h1 className="block ml-[4px] text-[25px] font-semibold">AERO • USDC</h1>
                    </div>
                    <div className="flex items-center mt-3 mb-[49px]">
                        <div className="rounded-[5px] w-fit py-[2px] px-2 text-[14px] font-medium mr-[10px] border-[1.3px] border-white">
                            238.57% APY
                        </div>
                        <div className="rounded-[5px] w-fit py-[2px] px-2 text-[14px] font-medium mr-[10px] border-[1.3px] border-white">
                            $70.01K TVL
                        </div>
                    </div>
                    <div>
                        <div>
                            <TabsList defaultValue="details">
                                <TabsTrigger
                                    value="details"
                                    className="bg-transparent rounded-t-[6px] rounded-b-none py-3 px-[15px] font-semibold data-[state=active]:bg-[#161B26] text-white"
                                >
                                    <div className="mr-2">
                                        <IconDetailVault />
                                    </div>
                                    <span>Details</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manage"
                                    className="bg-transparent rounded-t-[6px] rounded-b-none py-3 px-[15px] font-semibold data-[state=active]:bg-[#161B26] text-white"
                                >
                                    <div className="mr-2">
                                        <IconManageVault />
                                    </div>
                                    <span>Manage</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                </div>
                <div className="pt-[25px] pl-[76px] pr-[72px] pb-[200px]">
                    <TabsContent value="details" className="mt-0">
                        <DetailsVault />
                    </TabsContent>
                    <TabsContent value="manage" className="mt-0">
                        Manage
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default VaultDetail;
