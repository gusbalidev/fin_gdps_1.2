"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';

//Hitung Akumulasi Penyusutan
const NeracaDataAP = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    const { setTotalAPX } = useNeracaTContext();
    const type = 1;
    const group = 14;

    // Fetch data
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [{ title }, type, group],
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

    if (isSuccess) {
        setTotalAPX(totalBalance);
    }

    return (
        <>

        </>

    )
}

export default NeracaDataAP;

//export default