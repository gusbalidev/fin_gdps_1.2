"use client"

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";

import { useQuery } from '@tanstack/react-query';
import { useCfStore } from '../cf2/cf-store'
import Divider from "@/components/Divider";
//import useCashFlowContext from "@/context/cashflow-context";


const CashFlowData = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number, start: string, end: string }) => {

    // const { setTotalT1, setTotalT2, setTotalK1, setTotalK2, setTotalK3 } = useCfStore();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['cftitle', type, group2],
        queryFn: () => fetch(`/api/ns-nom-title?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })

            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    // if (isSuccess) {
    //     //UpdateTotalCF(group2, totalBalance);
    //     const newTotal = Math.abs(totalBalance);

    //     switch (group2) {

    //         case 8:
    //             setTotalT1(newTotal)
    //             break;
    //         case 9:
    //             setTotalT2(newTotal)
    //             break;
    //         case 10:
    //             setTotalK1(newTotal)
    //             break;
    //         case 11:
    //             setTotalK2(newTotal)
    //             break;
    //         case 12:

    //             setTotalK3(newTotal)
    //             break;

    //         default:
    //             // Handle default case
    //             break;
    //     }
    // };

    return (
        <>
            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2>
                <DataTable columns={columns} data={data} />
                <p></p>
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
            </div>
        </>

    )
}

export default CashFlowData;


function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>Total {title}:</p>
                <p></p>
                {/* <p className='text-lg font-bold'>{value}</p> */}
            </div>
        </>
    )
}
