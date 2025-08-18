"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";

import useAktivitasContextB from '@/context/aktivitas-contex-b';
import SubTotalAktivitasBefore from './total-aktivitas-before';

const NeracaDataNew = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalAsetAwal, setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3 } = useAktivitasContextB()

    // hitung KPAB periode sebelum
    // const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    // const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));
    // setTotalSelisihABX(newTotalSelisihABX);

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group2],
        // queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/ns-nom?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');

                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    // const newTotal = Math.abs(totalBalance);

    // ditambah total KP-AB periode sebelumnya
    const totalBalancePositive = Math.abs(totalBalance);
    const newTotal = Math.abs(totalBalancePositive);
    // const newTotalBalance = toidr(newTotal);

    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                setTotalTerima1(newTotal)
                break;
            case 9:
                setTotalTerima2(newTotal)
                break;

            case 6:
                setTotalAsetAwal(newTotal)
                break;

            case 10:
                setTotalBebanOp(newTotal)

            case 11:
                setTotalBeban2(newTotal)
                break;

            case 12:
                setTotalBeban3(newTotal)
                break;

            default:
                // Handle default case
                break;
        }

    };

    return (
        <>
            <div className="w-full">

                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}

            </div>

        </>

    )
}

export default NeracaDataNew;

//export default