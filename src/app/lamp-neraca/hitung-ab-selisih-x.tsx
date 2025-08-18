"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import Divider from "@/components/Divider";
import TulisRekapRp from "@/components/TulisRekapRpNeracaX";

const TotalRLX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAkhirX } = useAktivitasContext();

    const totalBeban = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1X - totalBeban + totalTerima2X);
    //const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalBeban2 + totalBeban3 + totalTerima2);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihABX(newTotal);

    //set Aset Bersih Akhir
    setTotalAsetAkhirX(totalSelisihABX + totalAsetAwalX)

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <TulisRekapRp value={newTotalBalance} title={titleTotal} /> */}
                <InfoTotal value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default TotalRLX;


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between p-0.5'>
                <p className='text-m font-medium text-blue-600 dark:text-orange-500'>{title}</p>
                <p className='text-m font-medium text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}
//export default