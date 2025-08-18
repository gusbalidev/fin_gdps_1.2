"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';
import useSaldoAwalContext from "@/context/saldo-awal-context";

import SubTotalAktivitas from './total-aktivitas';
import GetSaldoAwal from "@/lib/get-SaldoAwal";

const HitungKPAB = ({ titleTotal, month }:
    { titleTotal: string; month: number }) => {

    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB, setTotalAsetAkhir } = useAktivitasContext();
    const { saldoAwal } = useSaldoAwalContext();

    // Dapatkan dan Set Aset Bersih Awal, dari COA 82 (Kenaikan ( Penurunan ) Aset Bersih)
    GetSaldoAwal({ title: "Saldo Awal", coaId: 82 });

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

                <SubTotalAktivitas value={toidr(totalSelisihAB)} />

            </div>

        </>

    )
}

export default HitungKPAB;

//export default