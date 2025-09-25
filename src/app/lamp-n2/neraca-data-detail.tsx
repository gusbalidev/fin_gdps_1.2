"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import { DataTable } from './data-tables';
import { columns } from './columns';

const NeracaDataDetail = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['lampns-detail1', type, group],
        queryFn: () => fetch(`/api/neraca-group1?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })

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
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                <DataTable columns={columns} data={data} />
                {/* <TulisRekapRp value={newTotalBalance} title={titleTotal} /> */}
            </div>

        </>

    )
}

export default NeracaDataDetail;

//export default