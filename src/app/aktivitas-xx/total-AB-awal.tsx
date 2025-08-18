"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitasBefore from './total-aktivitas-before';
import { useAktivitasStoreBefore } from './aktivitas-store-before';
import GetBalance1 from '@/lib/get-balance1';
import useSaldoAwalContext from '@/context/saldo-awal-context';
import { getMonth } from 'date-fns';
import Divider from '@/components/Divider';

const TotalABAwal = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    // AKUN 31.00.0000
    const type = 3; // 3 = Tipe Aset Bersih
    const group2 = 6;   // 6 = Group2 Aset Bersih Awal

    const { saldoAwal } = useSaldoAwalContext();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
        totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3,
        setTotalAsetAwal } = useAktivitasContext();

    const prevMonth = getMonth(new Date(end)); // Get previous month from start date

    // hitung KPAB periode sebelum
    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);
    const newTotalSelisihABX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));
    const newTotalSelisihAB = Math.abs(totalTerima1 + totalTerima2 - (totalBeban));

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group2],
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
    const newTotal = Math.abs(totalBalancePositive + newTotalSelisihABX);

    //Simpan Aset Bersi Awal
    setTotalAsetAwal(newTotal);

    // const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        const newTotal = Math.abs(totalBalance);

        setTotalAsetAwal(newTotal)

    };

    return (
        <>
            {/* Hitung Saldo Awal KP Aset-Bersih akun-id 82 - simpan di data context Saldo Awal*/}
            <GetBalance1 title='bal1' titleTotal='SA' id={82} />

            <div className="w-full">

                {/* Untuk bulan Maret, maka Total ditambah saldo-awal akun KPAB (31.00.0000) */}
                {prevMonth === 2 ?
                    <SubTotalAktivitasBefore value={toidr(newTotal + saldoAwal)} title={titleTotal} />
                    :
                    // Untuk bulan selain Maret, Total ditambah nilai KPAB periode sebelumnya
                    // <SubTotalAktivitasBefore value={toidr(totalBalancePositive+newTotalSelisihABX)} title={titleTotal} />
                    <SubTotalAktivitasBefore value={toidr(totalBalancePositive + newTotalSelisihABX)} title={titleTotal} />
                    // <SubTotal value={toidr(totalBalancePositive+newTotalSelisihABX)} title={titleTotal} />
                }

                {/* Total tanpa Saldo Awal akun KPAB */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}

                {/* Debug perhitungan Aset Bersih Awal: */}
                {/* <p className='text-right text-sm'>Total sblm: {toidr(totalBalancePositive)}</p>
                <p className='text-right text-sm'>KPABX: {toidr(newTotalSelisihABX)}</p>
                <p className='text-right text-sm'>SA KPAB: {toidr(saldoAwal)}</p>
                <p className='text-right text-sm'>Total: {toidr(newTotal)}</p>
                <p className='text-right text-sm'>Total+SA: {toidr(newTotal+saldoAwal)}</p>
                <p className='text-right text-sm'>PrevMonth: {prevMonth}</p> */}

                {/* <p>T. Terima: {totalTerima1X + totalTerima2X}</p> */}
                {/* <p>T. Beban: {totalBebanX}</p> */}
                {/* <p>Total Akhir: {toidr(newTotal+saldoAwal)}</p> */}
                {/* end of Debug */}



            </div>

        </>

    )
}

export default TotalABAwal;




function SubTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

//export default