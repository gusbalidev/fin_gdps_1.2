"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSurplus1 = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const totalPendapatan = Math.abs(totalTerima1 + totalTerima2);
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);
    const newTotal = Math.abs(totalPendapatan - totalBeban);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} />
                <SubTotalAktivitas value={toidr(totalSelisihAB)} />
            </div>
        </>

    )
}

export default NeracaDataSurplus1;
