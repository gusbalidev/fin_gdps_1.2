"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
import { useNeracaStore } from './neraca-store';
import useNeracaTContext from '@/context/neraca-t-context';
import Divider from '@/components/Divider';
import useSaldoAwalContext from '@/context/saldo-awal-context';


const NeracaDataSubABX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalABX } = useNeracaTContext();
    const { saldoAwalX, setSaldoAwalX } = useSaldoAwalContext();

    const newTotal = Math.abs(totalABX + saldoAwalX);
    const newTotalFinal = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                <TulisTotalRp value={newTotalFinal} title={titleTotal} />                
            </div>
        </>

    )
}

export default NeracaDataSubABX;

//export default