"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import SubTotalAktivitas from './total-aktivitas';
import Divider from '@/components/Divider';

import useAktivitasContext from '@/context/aktivitas-context';
import useNeracaTContext from '@/context/neraca-t-context';


//Hitung Akumulasi Penyusutan
const NeracaDataAPSurplus = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    const { setTotalAP } = useNeracaTContext();
    const { totalSelisihAB } = useAktivitasContext();
    const type = 5;
    const group = 22;
    const id = 271;

    // Fetch data
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [{ title }, id, start, end],
        // queryFn: () => fetch(`/api/neraca-group1?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/ns-coa?id=${id}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
        setTotalAP(totalBalance);
    }

    return (
        <>
            {/* <Divider /> */}
            <div className="w-full">

                <SubTotalAktivitas value={toidr(totalSelisihAB)} />
                <SubTotalAktivitas value={'(' + newTotalBalance + ')'} />
                <SubTotalAktivitas value={toidr(totalSelisihAB - newTotal)} />
                
            </div>

        </>

    )
}

export default NeracaDataAPSurplus;

//export default