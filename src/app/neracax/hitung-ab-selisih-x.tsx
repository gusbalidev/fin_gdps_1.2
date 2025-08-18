"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import Divider from "@/components/Divider";
import TulisRekapRp from "@/components/TulisRekapRpNeracaX";
import useSaldoAwalContext from "@/context/saldo-awal-context";

const TotalRLX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwalX, setTotalAsetAkhirX } = useAktivitasContext();
    const { saldoAwalX } = useSaldoAwalContext();

    // Plus Saldo Awal
    const newTotalFinal = toidr(saldoAwalX);
    
    //set Aset Bersih Akhir
    setTotalAsetAkhirX(totalAsetAwalX+saldoAwalX)

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <TulisRekapRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <InfoTotal value={newTotalBalance} title={titleTotal} /> */}
                <InfoTotal value={newTotalFinal} title={titleTotal} />

            </div>

        </>

    )
}

export default TotalRLX;


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            {/* <Divider /> */}
            <div className='flex justify-between p-0.5'>
                <p className='text-[0.8em] font-medium text-blue-600 dark:text-orange-500'>{title}</p>
                <p className='text-[0.8em] font-medium text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}
//export default