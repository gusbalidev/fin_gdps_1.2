"use client"

import { useQuery } from '@tanstack/react-query';
import global from "@/config.js";

import toidr from "@/lib/toidr";
import TulisRekapRp from '@/components/TulisRekapRpNeraca';
import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from '@/context/aktivitas-context';
import useSaldoAwalContext from '@/context/saldo-awal-context';

// NeracaDataABX component to fetch and display PREVIOUS balance sheet data for Aset Bersih (AB) and Aset Bersih 2 (AB2)
const NeracaDataABX = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Import context to set total values
    const { setTotalABX, setTotalAB2X } = useNeracaTContext();
    const { setTotalAsetAwalX, totalAsetAwalX } = useAktivitasContext();
    const { saldoAwal, saldoAwal2 } = useSaldoAwalContext();


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
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Simpan di context, total Aset Awal
    setTotalAsetAwalX(Math.abs(totalBalance));

    // Set ABX or AB2X based on the group
    if (isSuccess) {
        const newTotal = Math.abs(totalBalance);
        switch (group) {

            case 6:
                setTotalABX(newTotal)
                break;
            case 7:
                setTotalAB2X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                {/* <TulisRekapRp value={toidr(totalAsetAwalX+saldoAwal)} title={'Hitung '+titleTotal} /> */}
            </div>

        </>

    )
}

export default NeracaDataABX;

//export default