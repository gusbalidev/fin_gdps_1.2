"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import Divider from "@/components/Divider";

const TotalRL = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB, setTotalAsetAkhir } = useAktivitasContext();

    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1 - totalBeban + totalTerima2);
    //const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalBeban2 + totalBeban3 + totalTerima2);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihAB(newTotal);

    //set Aset Bersih Akhir
    setTotalAsetAkhir(totalSelisihAB + totalAsetAwal)

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                <InfoTotal value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default TotalRL;


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                {/* <p className='text-end font-bold'>{value}</p> */}
                <p className='text-end font-medium text-blue-600 dark:text-orange-500'>{value}</p>
            </div>
        </>
    )
}
//export default