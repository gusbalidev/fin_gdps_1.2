"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import Divider from "@/components/Divider";

import { DataTable } from "./data-tables";
import { columns } from "./columns";


//
const CashFlowDataTitle = ({ title, titleTotal, type, group2, start, end }: 
    { title: string; titleTotal: string; type: number; group2: number, start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error } = useQuery({
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

export default CashFlowDataTitle;


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
