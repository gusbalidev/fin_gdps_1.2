import React, { Suspense } from 'react'

import Loading from '@/components/Loading'
import NeracaDataMoM from './hitung-MoM'
import HitungPoPAruskas from './hitung-pop-aruskas'
import useAktivitasContext from '@/context/aktivitas-context'
import useNeracaTContext from '@/context/neraca-t-context'

//
const KolomAruskasPoP = (
    {titleMY}: 
    {titleMY: string}) => { 

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContext();
    const { totalAP } = useNeracaTContext();

  return (
    <>
        <div className="w-full">
            <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMY} (%)</h2>
            <Suspense fallback={<Loading section="MoM" />}>
                                {/* <NeracaDataMoM row={1} /> */}
                <HitungPoPAruskas kolValue={totalTerima1+totalTerima2} row={1} />
            </Suspense>
            <Suspense fallback={<Loading section="MoM" />}>
                                {/* <NeracaDataMoM row={1} /> */}
                <HitungPoPAruskas kolValue={totalBebanOp+totalBeban2+totalBeban3} row={2} />
            </Suspense>
            <Suspense fallback={<Loading section="MoM" />}>
                                {/* <NeracaDataMoM row={1} /> */}
                <HitungPoPAruskas kolValue={totalSelisihAB} row={3} />
            </Suspense>
            <Suspense fallback={<Loading section="MoM" />}>
                                {/* <NeracaDataMoM row={1} /> */}
                <HitungPoPAruskas kolValue={totalAP} row={4} />
            </Suspense>
            <Suspense fallback={<Loading section="MoM" />}>
                                {/* <NeracaDataMoM row={1} /> */}
                <HitungPoPAruskas kolValue={totalSelisihAB-totalAP} row={5} />
            </Suspense>


        </div>
    </>
  )
}

export default KolomAruskasPoP