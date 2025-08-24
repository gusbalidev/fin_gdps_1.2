"use client"

import { useQuery } from '@tanstack/react-query';
import global from "@/config.js";

import toidr from "@/lib/toidr";
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from '@/context/aktivitas-context';

// NeracaDataAB component to fetch and display CURRENT balance sheet data for Aset Bersih (AB) and Aset Bersih 2 (AB2)
const NeracaDataAB = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Import context to set total values
    const { setTotalAB, setTotalAB2 } = useNeracaTContext();

    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAkhirX } = useAktivitasContext();

    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));

    // Fetch data using react-query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group],
        queryFn: () => fetch(`/api/saldo?accountTypeId=${type}&accountGroup2Id=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error(global.msgText.netErr);
                return response.json();
            }),
    });

    // Handle loading, error, and empty states
    if (isLoading) return <div>{global.msgText.wait}</div>; 
    if (error) return <div>{global.msgText.error}: {error.message}</div>; 
    if (!result) return <div>{global.msgText.noData}</div>;

    // Destructure the result to get accounts and total balance
    const { accounts: data, totalBalance } = result;

    const totalBalancePositive = Math.abs(totalBalance);
    const newTotal = Math.abs(totalBalancePositive+newTotalSelisihABX);
    const newTotalBalance = toidr(newTotal);
    
    //Update Total global States
    if (isSuccess) {
        const newTotal = Math.abs(totalBalance);
        switch (group) {

            case 6:
                setTotalAB(newTotal)
                break;
            case 7:
                setTotalAB2(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                {/* <TulisRekapRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <p className='text-right text-[0.8em] font-thin'>{toidr(totalBalancePositive)}</p> */}
                {/* <p className='text-right text-[0.8em] font-thin'>{toidr(newTotalSelisihABX)}</p> */}
            </div>

        </>

    )
}

export default NeracaDataAB;

//export default