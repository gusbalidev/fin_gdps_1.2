"use client"

import useNeracaTContext from '@/context/neraca-t-context';
import useAktivitasContext from "@/context/aktivitas-context";
import Divider from "@/components/Divider";

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";

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
const TotalABAkhir = ({ isCurrent, titleTotal }: { isCurrent: boolean; titleTotal: string }) => {

    const { totalAB, totalABX } = useNeracaTContext();
    const { totalAsetAkhir, totalAsetAkhirX } = useAktivitasContext();
    
    // Total AB Akhir Current
    const newTotalFinal = toidr(totalAB + totalAsetAkhir);

    // Total AB Akhir Previous
    const newTotalFinalX = toidr(totalABX + totalAsetAkhirX);

    return (
        <>
            <div className="w-full">
                {isCurrent ? 

                    
                    <TulisTotalRp value={newTotalFinal} /> 
                    
                    : 

                    <TulisTotalRpX value={newTotalFinalX} title={titleTotal} />
                }
            </div>
        </>

    )
}

export default TotalABAkhir;
