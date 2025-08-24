"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContextB from '@/context/aktivitas-contex-b';
import useAktivitasContext from '@/context/aktivitas-context';

const HitungPrevious = ({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) => {

    const { totalTerima1XX, totalTerima2XX, totalBebanOpXX, totalBeban2XX, totalBeban3XX,
        setTotalTerima1XX, setTotalTerima2XX, setTotalBebanOpXX, setTotalBeban2XX, setTotalBeban3XX,
    } = useAktivitasContext();

    // hitung KPAB periode sebelum
    // const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    // const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));
    // setTotalSelisihABX(newTotalSelisihABX);

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

    switch (group2) {

        case 8:
            setTotalTerima1XX(newTotal)
            console.log('Total Terima 1:', newTotal);
            break;
        case 9:
            setTotalTerima2XX(newTotal)
            console.log('Total Terima 2:', newTotal);
            break;

        case 10:
            setTotalBebanOpXX(newTotal)
            console.log('Total Beban Operasional:', newTotal);
            break;

        case 11:
            setTotalBeban2XX(newTotal)
            console.log('Total Beban 2:', newTotal);
            break;

        case 12:
            setTotalBeban3XX(newTotal)
            console.log('Total Beban 3:', newTotal);
            break;

        default:
            // Handle default case
            break;
    }

    console.log('Total PenerimaanXX:', totalTerima1XX + totalTerima2XX);
    console.log('Total BebanXX:', totalBebanOpXX + totalBeban2XX + totalBeban3XX);
    console.log('Total Selisih ABXX:', totalTerima1XX + totalTerima2XX - (totalBebanOpXX + totalBeban2XX + totalBeban3XX));


    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

    };

    return (
        <>
            {/* {totalTerima1X} <br /> */}
        </>

    )
}

export default HitungPrevious;

//export default