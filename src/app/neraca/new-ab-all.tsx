import React from 'react'
import toidr from '@/lib/toidr';
import { TulisRekap, TulisRekapFull } from './TulisRekap';
import useAktivitasContext from '@/context/aktivitas-context';
import useSaldoAwalContext from '@/context/saldo-awal-context';
import Divider from '@/components/Divider';
import NeracaDataAB from './neraca-data-AB';

//
export default function NewAB({ isCurrent, titleTotal, start, end, month }: { isCurrent: boolean; titleTotal: string; start: string; end: string, month: number }) {
  
  
  return (
    <>
        {isCurrent ? 
        (
            <ABKolomCurrent start={start} end={end} month={month} />
        )
        : 
        (
            <ABKolomPrevious start={start} end={end} month={month} />
        )}

    </>
  )
};


function ABKolomCurrent({ start, end, month }: { start: string, end: string, month: number}) {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB, totalAsetAwal, totalAsetAkhir,
            setTotalSelisihAB
            } = useAktivitasContext();
    const { saldoAwal, saldoAwalX } = useSaldoAwalContext();
   
    // Hitung Total Beban Terima & Beban
    const totalTerima = Math.abs(totalTerima1 + totalTerima2);
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);
      
    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima - totalBeban);   
    
    //set Kenaikan/Penurunan Aset Bersih, cek bulan

    setTotalSelisihAB(newTotal);
    if (month === 3) 
        {
            setTotalSelisihAB(saldoAwal);
        }
       
    return (
        <>
        <br />
        <h2>Current</h2>
        {/* <TulisRekap value={toidr(saldoAwal)}  /> */}
        {/* <TulisRekap value={toidr(totalAsetAwal)}  /> */}
        <NeracaDataAB title="AB" titleTotal="Aset Bersih Awal" type={3} group={6} start={start} end={end} />
        <TulisRekap value={toidr(totalSelisihAB)}  />
        <Divider />
        <TulisRekap value={toidr(totalAsetAkhir)} />
        </>
    )
}

function ABKolomPrevious({ start, end, month }: { start: string, end: string, month: number}) {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, totalAsetAwalX, totalAsetAkhirX } = useAktivitasContext();
    const { saldoAwal, saldoAwalX } = useSaldoAwalContext();

    return (
        <>
        <br />
        <h2>Previous</h2>
        {/* <TulisRekapFull value={toidr(saldoAwal)} title={'Saldo Awal'}  /> */}
        <TulisRekapFull value={toidr(totalAsetAwalX)} title={'Aset Bersih Awal'}  />
        <TulisRekapFull value={toidr(totalSelisihABX)} title={'Kenaikan (Penurunan) Aset Bersih'}  />
        <Divider />
        <TulisRekapFull value={toidr(totalAsetAkhirX)} title={'Total Aset Bersih Akhir'}  />
        </>
    )
};


