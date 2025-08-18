"use client"

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeraca";
import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from '@/context/aktivitas-context';


const NeracaDataSubAB = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAB } = useNeracaTContext();
    const { totalSelisihAB } = useAktivitasContext();

    // Total AB Akhir = Aset Bersih Awal + Selisih-A-B (Rugi-Laba)
    const newTotal = Math.abs(totalAB+totalSelisihAB);
    const newTotalFinal = toidr(newTotal);

    return (
        <>
            <div className="w-full text-blue-600 dark:text-orange-500">
                <TulisTotalRp value={newTotalFinal} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataSubAB;

