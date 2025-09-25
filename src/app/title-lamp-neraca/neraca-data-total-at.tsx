"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import Divider from '@/components/Divider';

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalAT = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1, totalAT2, totalAT3, totalAT4, totalAP, setTotalAT } = useNeracaTContext();
   
    const subAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
    const newTotalBalance = toidr(subAT);


    return (
        <>
            <Divider />
            <TulisRekapRp value={newTotalBalance} title={title} />

        </>

    )
}

export default NeracaDataTotalAT;

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p className='text-[0.8em] text-blue-600 dark:text-orange-500'>Total {title}:</p>
                {/* <p></p> */}
                <p className='text-[0.8em] text-blue-600 dark:text-orange-500'>{value}</p>
                {/* <p className='text-m'>{value}</p> */}
            </div>
        </>
    )
}