"use client"

import { useQuery } from '@tanstack/react-query';

const NeracaDataTitle = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['lampns-title', type, group],
        queryFn: () => fetch(`/api/neraca-group1-title?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })

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

    return (
        <>
            <div className="w-full text-start">
                <p className='text-[0.9em] font-bold text-blue-600 dark:text-orange-500'>{titleTotal}</p>
            </div>

        </>

    )
}

export default NeracaDataTitle;
