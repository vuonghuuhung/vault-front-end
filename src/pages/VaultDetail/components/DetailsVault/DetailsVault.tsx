import {} from 'chart.js';

const DetailsVault = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mv-[25px]">
                <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                    <h3 className="text-[#d9d9d9] text-[14px] font-medium">Live APY</h3>
                    <h2 className="text-[22px] font-semibold">451.60%</h2>
                </div>
                <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                    <h3 className="text-[#d9d9d9] text-[14px] font-medium">Daily APY</h3>
                    <h2 className="text-[22px] font-semibold">0.469%</h2>
                </div>
                <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                    <h3 className="text-[#d9d9d9] text-[14px] font-medium">TVL</h3>
                    <h2 className="text-[22px] font-semibold">$41.29K</h2>
                </div>
                <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                    <h3 className="text-[#d9d9d9] text-[14px] font-medium">Last Harvest</h3>
                    <h2 className="text-[22px] font-semibold">1h 31m ago</h2>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default DetailsVault;
