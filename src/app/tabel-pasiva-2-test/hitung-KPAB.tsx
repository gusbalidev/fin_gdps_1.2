"use client"

import toidr from "@/lib/toidr";
import useAktivitasContextB from "@/context/aktivitas-contex-b";
import useSaldoAwalContextB from "@/context/saldo-awal-context-b";

import SubTotalAktivitas from './total-aktivitas';
import GetSaldoAwalB from "@/lib/get-SaldoAwal-b";
import { TulisRekap } from "../neraca/TulisRekap";
import { JustValueTotal } from "../neraca2/title-value";

const HitungKPAB = ({ titleTotal, month }:
    { titleTotal: string; month: number }) => {

    const { totalSelisihAB, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB } = useAktivitasContextB();
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

    //set Aset Bersih Akhir
    // setTotalAsetAkhir(totalSelisihAB + totalAsetAwal)

    // const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                {/* Untuk bulan Maret, gunakan saldo awal dari COA 31.00.0000 */}
                {/* {month === 3 ?
                    <SubTotalAktivitas value={toidr(saldoAwal)} />
                    :
                    <SubTotalAktivitas value={toidr(totalKPAB)} />
                } */}

                {/* <SubTotalAktivitas value={toidr(totalSelisihAB)} /> */}
                <JustValueTotal value={toidr(totalSelisihAB)} />

            </div>

        </>

    )
}

export default HitungKPAB;

//export default