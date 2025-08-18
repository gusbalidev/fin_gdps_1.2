"use client"

import useAktivitasContext from "@/context/aktivitas-context";
import Divider from "@/components/Divider";

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";
import useSaldoAwalContext from "@/context/saldo-awal-context";
import { title } from "process";

// Display CURRENT Total
function TulisTotalRp({ value }: { value: string}) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p />
                <p className={`${textStyles.sizes.small} font-medium text-blue-600 dark:text-orange-500`}>{value}</p>
            </div>
        </>
    )
}

// Display PREVIOUS Total
function TulisTotalRpX({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className={`${textStyles.sizes.small} font-medium text-blue-600 dark:text-orange-500`}>{title}</p>
                <p className={`${textStyles.sizes.small} font-medium`}>{value}</p>
            </div>
        </>
    )
}

// Calculate and display the total Aset Bersih Akhir based on the current and previous Periods
const TotalKPAB = ({ isCurrent, titleTotal, month }: { isCurrent: boolean; titleTotal: string, month: number }) => {

    const { saldoAwal, saldoAwalX } = useSaldoAwalContext();

    // Plus Saldo Awal
    //const newTotalFinal = toidr(saldoAwalX);
    
    //For Current values
    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB, setTotalAsetAkhir } = useAktivitasContext();

    // For Previous values
    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAkhirX } = useAktivitasContext();

    // Hitung Total Beban Current    
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    // Hitung Total Beban Previous
    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

    //Hitung Kenaikan/Penurunan Aset Bersih Current
    const newTotal = Math.abs(totalTerima1 + totalTerima2 - (totalBeban) );   

    //Hitung Kenaikan/Penurunan Aset Bersih Previous
    const newTotalX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));

    //set Kenaikan/Penurunan Aset Bersih Current
    setTotalSelisihAB(newTotal);

    //set Kenaikan/Penurunan Aset Bersih Previous
    setTotalSelisihABX(newTotalX );
    
    //set Aset Bersih Akhir Current
    setTotalAsetAkhir( totalAsetAwal + totalSelisihAB )

    //set Aset Bersih Akhir Previous
    setTotalAsetAkhirX( totalAsetAwalX + totalSelisihABX ) ;
    
    // Total AB Akhir Current
    const newTotalFinal = toidr(newTotal);

    // Total AB Akhir Previous
    const newTotalFinalX = toidr(newTotalX );
    
    return (
        <>
            <div className="w-full">
                
                {isCurrent ? 
                    
                    (month === 3 ?
                       <TulisTotalRp value={toidr(saldoAwal)} /> 
                       :
                       <TulisTotalRp value={newTotalFinal} /> 
                    )
                    
                    :

                    (month === 3 ?
                    //    <TulisTotalRpX value=toidr(saldoAwal) title={titleTotal} /> 
                       <TulisTotalRpX value={toidr(saldoAwal)} title={titleTotal} />
                       :
                       <TulisTotalRpX value={newTotalFinalX} title={titleTotal} />
                    )
                    
                }
            </div>
        </>

    )
}

export default TotalKPAB;
