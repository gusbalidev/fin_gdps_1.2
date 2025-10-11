"use client"

import useAktivitasContextB from "@/context/aktivitas-contex-b";
import useSaldoAwalContextB from "@/context/saldo-awal-context-b";

import GetSaldoAwalB from "@/lib/get-SaldoAwal-b";

const HitungKPAB = ({ titleTotal, month }:
    { titleTotal: string; month: number }) => {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB } = useAktivitasContextB();
    const { saldoAwal } = useSaldoAwalContextB();

    // Dapatkan dan Set Aset Bersih Awal, dari COA 82 (Kenaikan ( Penurunan ) Aset Bersih)
    GetSaldoAwalB({ title: "Saldo Awal", coaId: 82 });

    const totalTerima = Math.abs(totalTerima1 + totalTerima2);
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    //Hitung Kenaikan/Penurunan Aset Bersih
    // const newTotal = Math.abs(totalTerima1 + totalTerima2 - totalBeban);
    const totalKPAB = Math.abs(totalTerima - totalBeban);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihAB(totalKPAB);

    // Untuk bulan Maret, gunakan saldo awal dari COA 31.00.0000
    if (month === 3) {
        setTotalSelisihAB(saldoAwal);
    }


    return (
        <>
        </>

    )
}

export default HitungKPAB;

//export default