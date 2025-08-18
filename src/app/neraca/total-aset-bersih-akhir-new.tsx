"use client"

import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from "@/context/aktivitas-context";
import Divider from "@/components/Divider";

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";
import useSaldoAwalContext from '@/context/saldo-awal-context';

// Display CURRENT Total
function TulisTotalRp({ value }: { value: string}) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p />
                <p className={`${textStyles.sizes.small} font-bold text-blue-600 dark:text-orange-500`}>{value}</p>
            </div>
        </>
    )
}

// Display PREVIOUS Total
function TulisTotalRpX({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className={`${textStyles.sizes.small} font-medium text-blue-600 dark:text-orange-500`}>Total {title}:</p>
                <p className={`${textStyles.sizes.small} font-bold`}>{value}</p>
            </div>
        </>
    )
}

// Calculate and display the total Aset Bersih Akhir based on the current and previous Periods
const TotalABAkhir = ({ isCurrent, titleTotal, month }: { isCurrent: boolean; titleTotal: string; month: number }) => {

    const { totalAP, totalAPX, totalAB, totalABX } = useNeracaTContext();

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX } = useAktivitasContext();

    const { totalAsetAwal, totalAsetAwalX, totalAsetAkhir, totalAsetAkhirX, totalSelisihAB, totalSelisihABX } = useAktivitasContext();
    const { saldoAwal, saldoAwal2 } = useSaldoAwalContext()
    
    // Total AB Akhir Current
    const newTotalFinal = totalAsetAwal +saldoAwal;

    // Total AB Akhir Previous
    const newTotalFinalX = totalAsetAwalX+totalSelisihABX;

    // Kenaikan/Penurunan Aset Bersih Previous
    setTotalSelisihABX((totalTerima1X + totalTerima2X) - (totalBebanOpX + totalBeban2X + totalBeban3X));

    return (
        <>
            <div className="w-full">
                
                {/* {totalAsetAwal} <br />
                {totalAsetAwalX} */}

                {isCurrent ? 
                    
                    // Untuk kolom periode Aktif
                    (month === 3 ? 
                        <TulisTotalRp value={toidr(newTotalFinal+saldoAwal)} /> 
                        :
                        <TulisTotalRp value={toidr(newTotalFinal+totalSelisihAB)} /> 
                    )                    
                    
                    : 

                    // Untuk kolom periode seblumnya
                    (month === 3 ? 
                        <TulisTotalRp value={toidr(newTotalFinalX+saldoAwal)} /> 
                        :
                        <TulisTotalRpX value={toidr(newTotalFinalX+totalSelisihABX)} title={titleTotal} />
                    )                   
                    
                }
      
            </div>
        </>

    )
}

export default TotalABAkhir;
