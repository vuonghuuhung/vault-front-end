import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { dataTableType } from 'src/mock/dataTable.mock';

export const columnsTable: ColumnDef<dataTableType>[] = [
    {
        accessorKey: 'chain',
        header: () => <div className="text-[12px] text-left w-[45%]">Farm</div>,
        cell: ({ row }) => {
            const chain: {
                iconChain: JSX.Element;
                iconChainType: JSX.Element[];
                name: string;
                description: string;
            } = row.getValue('chain');

            return (
                <div className="flex items-center w-full justify-between">
                    <div className="w-[15%]">
                        <div className="w-[23px] h-[23px] border-[2px] border-[#29ce84] rounded-[8px] flex items-center justify-center">
                            {chain.iconChain}
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-[45%]">
                        <div className="w-[37px] h-[37px] translate-x-[8px]">{chain.iconChainType[0]}</div>
                        <div className="w-[37px] h-[37px]">{chain.iconChainType[1]}</div>
                    </div>
                    <div className="pr-4 flex-1 text-left">
                        <div className="font-semibold">{chain.name}</div>
                        <div className="font-medium">{chain.description}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'apy',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    APY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'dailyApy',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    Daily APY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'tvl',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    TVL
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'myBalance',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    My balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
];
