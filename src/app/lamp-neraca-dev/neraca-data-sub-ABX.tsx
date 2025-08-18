"use client"

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from "@/context/aktivitas-context";

const NeracaDataSubABX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalABX } = useNeracaTContext();
    const { totalAsetAkhirX } = useAktivitasContext();
    
    const newTotalFinal = toidr(totalABX + totalAsetAkhirX);

    return (
        <>
            <div className="w-full">
                <TulisTotalRp value={newTotalFinal} title={titleTotal} />                
            </div>
        </>

    )
}

export default NeracaDataSubABX;
