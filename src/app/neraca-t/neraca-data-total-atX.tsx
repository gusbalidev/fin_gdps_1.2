"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
import Divider from '@/components/Divider';

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalATX = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X, setTotalATX } = useNeracaTContext();
   
    const subAT = totalAT1X + totalAT2X + totalAT3X + totalAT4X;
    setTotalATX(subAT);
    const newTotalBalance = toidr(subAT);

    return (
        <>
            {/* <Divider /> */}
            <TulisTotalRp value={newTotalBalance} title={title} />

        </>

    )
}

export default NeracaDataTotalATX;

//export default