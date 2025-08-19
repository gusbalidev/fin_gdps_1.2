"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import TulisTotalRp from "@/components/TulisTotalRpNeraca"
import Divider from '@/components/Divider';
import { set } from "date-fns";
import { JustValueTotalBold } from "./title-value";

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalAT = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1, totalAT2, totalAT3, totalAT4, totalAP, setTotalAT } = useNeracaTContext();

    const subAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
    setTotalAT(subAT);
    const newTotalBalance = toidr(subAT);


    return (
        <>
            {/* <Divider /> */}
            {/* <TulisTotalRp value={newTotalBalance} title={title} /> */}
            <JustValueTotalBold value={newTotalBalance} />

        </>

    )
}

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalATX = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X, setTotalATX } = useNeracaTContext();

    const subAT = totalAT1X + totalAT2X + totalAT3X + totalAT4X;
    setTotalATX(subAT);
    const newTotalBalance = toidr(subAT);

    return (
        <>
            {/* <Divider /> */}
            {/* <TulisTotalRp value={newTotalBalance} title={title} /> */}
            <JustValueTotalBold value={newTotalBalance} />

        </>

    )
}

export { NeracaDataTotalAT, NeracaDataTotalATX };