import { useEffect, useState } from 'react';
import IconETH from 'src/assets/IconETH';
import { columnsTable } from 'src/components/ColumnTable/ColumnTable';
import { DataTable } from 'src/components/DataTable/DataTable';
import InputSearch from 'src/components/InputSearch';
import Loading from 'src/components/Loading/Loading';
import { ToggleGroup, ToggleGroupItem } from 'src/components/ui/toggle-group';
import { dataTableMock, dataTableType } from 'src/mock/dataTable.mock';
import useGetValueSearch from 'src/state/valueSearch.ztd';
const FarmsPage = () => {
    const { valueSearch } = useGetValueSearch();
    const [listDataTableNow, setListDataTableNow] = useState<dataTableType[]>(dataTableMock);
    const [totalFilter, setTotalFilter] = useState<string[]>([]);
    useEffect(() => {
        let newList = dataTableMock.filter(
            (e) =>
                e.chain.name.toLocaleLowerCase().includes(valueSearch?.trim().toLocaleLowerCase() || '') ||
                e.chain.description.toLocaleLowerCase().includes(valueSearch?.trim().toLocaleLowerCase() || ''),
        );
        setListDataTableNow(newList);
        if (valueSearch) {
            setTotalFilter((prev) => {
                const newTotal = [...prev];
                const isHaveValueSearch = newTotal.find((item) => item === 'valueSearch');
                if (isHaveValueSearch) {
                    return newTotal;
                } else {
                    const newTotalAdd = [...prev, 'valueSearch'];
                    return newTotalAdd;
                }
            });
        } else {
            setTotalFilter((prev) => {
                const arr = [...prev];
                const newTotal = arr.filter((item) => item != 'valueSearch');
                return newTotal;
            });
        }
    }, [valueSearch]);
    return (
        <div>
            <div className="w-full flex items-center justify-between">
                <div className="bg-bgButton cursor-pointer hover:bg-[#242f3a] transition-all duration-250 ease-in-out rounded-[10px] flex items-center justify-center w-[50px] py-[9px] px-[16px] border border-[#1f242f]">
                    <IconETH />
                </div>
                <button className="group flex items-center rounded-primary justify-start bg-bgButton py-[10px] px-4  text-[14px] font-semibold">
                    <div className="mr-2 w-[20px] h-[20px] rounded-[4px] grid place-items-center bg-[#15b088]">
                        {totalFilter.length > 0 && totalFilter.length}
                    </div>
                    &nbsp;
                    <div className="group-hover:text-[#036666] text-[14px] transition-all duration-250">
                        {' '}
                        Clear Filters
                    </div>
                </button>
            </div>
            <div className="my-[25px] h-[40px] flex items-center gap-[15px]">
                <div>
                    <ToggleGroup
                        onValueChange={(value) => console.log(value)}
                        type="single"
                        className="normalButton !bg-bgButton gap-0 overflow-hidden"
                    >
                        <ToggleGroupItem
                            value="AllFarms"
                            aria-label="Toggle bold"
                            className={`data-[state=on]:${
                                true ? 'bg-bgButtonHover' : 'bg-bgButton'
                            } data-[state=on]:text-white border-r border-borderConnectBtn rounded-none hover:bg-bgButtonHover hover:text-white px-4 py-[10px]`}
                        >
                            All Farms
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="MyFarms"
                            aria-label="Toggle strikethrough"
                            className={`data-[state=on]:${
                                true ? 'bg-bgButtonHover' : 'bg-bgButton'
                            } data-[state=on]:text-white hover:bg-bgButtonHover hover:text-white rounded-none px-4 py-[10px]`}
                        >
                            My Farms
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div>
                    <ToggleGroup lang="3" type="single" className="normalButton !bg-bgButton gap-0 overflow-hidden">
                        <ToggleGroupItem
                            value="LP"
                            aria-label="Toggle bold"
                            className={`data-[state=on]:${
                                true ? 'bg-bgButtonHover' : 'bg-bgButton'
                            } data-[state=on]:text-white border-r border-borderConnectBtn rounded-none hover:bg-bgButtonHover hover:text-white px-4 py-[10px]`}
                        >
                            LP
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="Single"
                            aria-label="Toggle bold"
                            className={`data-[state=on]:${
                                true ? 'bg-bgButtonHover' : 'bg-bgButton'
                            } data-[state=on]:text-white border-r border-borderConnectBtn rounded-none hover:bg-bgButtonHover hover:text-white px-4 py-[10px]`}
                        >
                            Single
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="Stable"
                            aria-label="Toggle strikethrough"
                            className={`data-[state=on]:${
                                true ? 'bg-bgButtonHover' : 'bg-bgButton'
                            } data-[state=on]:text-white hover:bg-bgButtonHover hover:text-white rounded-none px-4 py-[10px]`}
                        >
                            Stable
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="flex-1 h-full">
                    <InputSearch />
                </div>
            </div>
            <div>
                <DataTable columns={columnsTable} data={listDataTableNow} />
                {/* <div className="w-full h-[400px]">
                    <Loading />
                </div> */}
            </div>
        </div>
    );
};

export default FarmsPage;
