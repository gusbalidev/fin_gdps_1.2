'use client'

import React, { Suspense } from 'react'

import Loading from '@/components/Loading'
import NeracaDataMoM from './hitung-MoM'
import HitungPoP from './hitung-pop'
import useAktivitasContext from '@/context/aktivitas-context'

//
const KolomAktivitasPoP = (
    { titleMY }:
        { titleMY: string }) => {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContext();


    return (
        <>
            <div className="w-full">
                <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMY} (%)</h2>
                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={1} /> */}
                    <HitungPoP kol1Value={totalTerima1} row={1} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={2} /> */}
                    <HitungPoP kol1Value={totalTerima2} row={2} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={3} /> */}
                    <HitungPoP kol1Value={totalBebanOp} row={3} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={4} /> */}
                    <HitungPoP kol1Value={totalBeban2} row={4} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={5} /> */}
                    <HitungPoP kol1Value={totalBeban3} row={5} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={6} /> */}
                    <HitungPoP kol1Value={totalSelisihAB} row={6} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={7} /> */}
                    <HitungPoP kol1Value={totalAsetAwal} row={7} />
                </Suspense>

                <Suspense fallback={<Loading section="MoM" />}>
                    {/* <NeracaDataMoM row={8} /> */}
                    <HitungPoP kol1Value={totalAsetAkhir} row={8} />
                </Suspense>

            </div>
        </>
    )
}

export default KolomAktivitasPoP