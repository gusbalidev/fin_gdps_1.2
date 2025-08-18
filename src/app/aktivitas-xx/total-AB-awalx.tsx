"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitasBefore from './total-aktivitas-before';
import { useAktivitasStoreBefore } from './aktivitas-store-before';
import GetBalance1 from '@/lib/get-balance1';
import useSaldoAwalContext from '@/context/saldo-awal-context';
import { getMonth } from 'date-fns';

const TotalABAwalX = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    // AKUN 31.00.0000
    const type = 3; // 3 = Tipe Aset Bersih
    const group2 = 6;   // 6 = Group2 Aset Bersih Awal

    const { saldoAwal } = useSaldoAwalContext();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
        setTotalAsetAwal, setTotalAsetAwalX, setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3 } = useAktivitasContext();

    const prevMonth = getMonth(new Date(end)); // Get previous month from start date

    // hitung KPAB periode sebelum
    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['total-ABAwalX', type, group2],
        queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        // queryFn: () => fetch(`/api/ns-nom?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
    const totalBalancePositive = Math.abs(totalBalance);

    //Total ditambah Total KP AB sebelumnya
    const newTotal = Math.abs(totalBalancePositive+newTotalSelisihABX);

    //Simpan Aset Bersi Awal Previous
    setTotalAsetAwalX(newTotal);
    // const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        const newTotal = Math.abs(totalBalance);

        setTotalAsetAwal(newTotal);

    };

    return (
        <>
            {/* Hitung Saldo Awal KP Aset Bersih akun 82*/}
            <GetBalance1 title='bal1' titleTotal='SA' id={82} />

            <div className="w-full">

                {/* Total + Saldo Awal akun KPAB */}

                { prevMonth === 3 ? 
                <SubTotalAktivitasBefore value={toidr(newTotal+saldoAwal)} title={titleTotal} />
                :
                <SubTotalAktivitasBefore value={toidr(newTotal)} title={titleTotal} />
                }

                {/* Total tanpa Saldo Awal akun KPAB */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}

                {/* Debug perhitungan Aset Bersih Awal: */}
                <p className='text-right text-sm'>Total sblm: {toidr(totalBalancePositive)}</p>
                <p className='text-right text-sm'>KPAB: {toidr(newTotalSelisihABX)}</p>
                <p className='text-right text-sm'>SA KPAB: {toidr(saldoAwal)}</p>
                <p className='text-right text-sm'>Total: {toidr(newTotal)}</p>
                <p className='text-right text-sm'>Total+SA: {toidr(newTotal+saldoAwal)}</p>
                <p className='text-right text-sm'>PrevMonth: {prevMonth}</p>
                
                {/* <p>T. Terima: {totalTerima1X + totalTerima2X}</p> */}
                {/* <p>T. Beban: {totalBebanX}</p> */}
                {/* <p>Total Akhir: {toidr(newTotal+saldoAwal)}</p> */}
                {/* end of Debug */}
                


            </div>

        </>

    )
}

export default TotalABAwalX;

//export default