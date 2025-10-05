"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
// import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import Divider from '@/components/Divider';
import useNeracaTContextB from "@/context/neraca-t-context-b";

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalATX = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X } = useNeracaTContextB();
   
    const subAT = totalAT1X + totalAT2X + totalAT3X + totalAT4X;
    const newTotalBalance = toidr(subAT);


    return (
        <>
            <Divider />
            <TulisRekapRp value={newTotalBalance} title={title} />

        </>

    )
}

export default NeracaDataTotalATX;

//export default

//
function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5 pr-2'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className='text-[1em] font-bold text-blue-600 dark:text-orange-500'>{value}</p>
                {/* <p className='text-m'>{value}</p> */}
            </div>
        </>
    )
}