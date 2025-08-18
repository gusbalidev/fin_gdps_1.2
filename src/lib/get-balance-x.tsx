"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";
import Divider from '@/components/Divider';

// import SubTotalAktivitasBefore from './total-aktivitas-before';

const GetBalanceX = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    // const { totalSelisihABX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
        // setTotalAsetAwalX, setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X, setTotalSelisihABX } = useAktivitasStoreBefore();
    // const { totalSelisihAB, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3,
        // setTotalAsetAwal, setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3 } = useAktivitasContext();
    const { totalSelisihABX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
        setTotalAsetAwalX, setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X } = useAktivitasContext();        

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group2],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                setTotalTerima1X(newTotal)
                break;
            case 9:
                setTotalTerima2X(newTotal)
                break;

            case 6:
                setTotalAsetAwalX(newTotal)
                break;

            case 10:
                setTotalBebanOpX(newTotal)

            case 11:
                setTotalBeban2X(newTotal)
                break;

            case 12:
                setTotalBeban3X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }

    };

    return (
        <>
            <div className="w-full">
                {/* <InfoTotal value={newTotalBalance} title={titleTotal} /> */}

            </div>

        </>

    )
}

export default GetBalanceX;

//export default


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            {/* <Divider /> */}
            <div className='flex justify-between'>
                <p className='text-sm pl-1 text-gray-700 dark:text-gray-400'>{title}</p>
                <p className='text-sm text-end text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}