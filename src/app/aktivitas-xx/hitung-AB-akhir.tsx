"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import SubTotalAktivitas from './total-aktivitas';

const HitungABAkhir = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContext();
    const newTotalBalance = toidr(totalSelisihAB + totalAsetAwal);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />
                {totalAsetAkhir}
            </div>
        </>

    )
}

export default HitungABAkhir;
