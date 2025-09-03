"use client"

import { useQuery } from '@tanstack/react-query';


// const CountCashFlow = ({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) => {
export default function CountCashFlow ({ title, type, group2, start, end, 
    // onDataReceived 
    }: { 
    title: string; 
    type: number; 
    group2: number; 
    start: string;
    end: string;
    // onDataReceived?: (value: number) => void;
    
})  {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, group2],
        // queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/ns-nom?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');

                return response.json();
            }),
    });

    if (isLoading) return <div className='text-right'>Tunggu...</div>; // Handle loading state
    if (error) return <div className='text-right'>Error: {error.message}</div>; // Handle error state
    if (!result) return <div className='text-right'>Tidak ada data (null)</div>;

    //Total & data for table
    // const { accounts: data, totalBalance } = result;
    
    if (isSuccess && result) {
        const totalBalancePositive = Math.abs(result.totalBalance);
        const newTotal = Math.abs(totalBalancePositive);
        
        // Call the callback with the value
        // onDataReceived?.(newTotal);
        console.log(`Total for ${title} - ${start} to ${end} :`, newTotal);
        return newTotal;
    }
    return 0;


}


