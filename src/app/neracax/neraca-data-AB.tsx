"use client"

import { useQuery } from '@tanstack/react-query';
import global from "@/config.js";

import toidr from "@/lib/toidr";
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from '@/context/aktivitas-context';
import useSaldoAwalContext from '@/context/saldo-awal-context';
import { getMonth, set } from 'date-fns';
import TotalKPAB from '@/lib/total-kp-aset-bersih';
// import GetSaldoAwal2 from '@/lib/get-SaldoAwal2';

// NeracaDataAB component to fetch and display CURRENT balance sheet data for Aset Bersih (AB) and Aset Bersih 2 (AB2)
const NeracaDataAB = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Import context to set total values
    const { setTotalAB, setTotalAB2 } = useNeracaTContext();

    const { totalAsetAwal, setTotalAsetAwal, setTotalAsetAkhir, 
            totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAkhirX} = useAktivitasContext();
    const { saldoAwal, saldoAwal2 } = useSaldoAwalContext();

    GetSaldoAwal2();
    
    //Hitung KPAB periode sebelum
    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));

    const month = getMonth(new Date(end)) + 1; // Get current month (1-12)


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

    //Simpan di context, total Aset Awal
    setTotalAsetAwal(Math.abs(totalBalance));
    // setTotalAsetAwal(total);

    if (month === 3) {
        setTotalAsetAkhir(totalAsetAwal + saldoAwal);
    }

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
                {/* <TulisRekapRp value={toidr(totalAsetAwal+saldoAwal2)} title={titleTotal} /> */}
            </div>

        </>

    )
}

export default NeracaDataAB;

//export default


//
function GetSaldoAwal2() {

    const id = 80; // ID Aset Bersih Awal COA 31.00.0000
    const { setSaldoAwal2, setSaldoAwalX } = useSaldoAwalContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['sa2', id],
        queryFn: () => fetch(`/api/accountbl1?id=${id}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    // Add null check for result data
    if (!result.balance1) {
        return <div>Data balance tidak ditemukan</div>;
    }

    //Total & data for table
    // const { accounts: data} = result;
    const newTotal = Math.abs(result.balance1);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(result.balance1);
        setSaldoAwal2(newTotal);
        setSaldoAwalX(newTotal);
    };

    return (
        null
    )
}