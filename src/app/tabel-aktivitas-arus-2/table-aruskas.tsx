'use client'

import React, { Suspense } from 'react'

import toidr from '@/lib/toidr'
import Loading from "@/components/Loading";
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import useAktivitasContextB from "@/context/aktivitas-contex-b";

import SubTotalAktivitas from './total-aktivitas'
import NeracaDataAPSurplus from './neraca-data-ap-surplus'

//
function TableArusKas() {
    const { start, end, titleMonthYear } = useNeracaSaldoContextB();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContextB();

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2>

                    <SubTotalAktivitas value={toidr(totalTerima1 + totalTerima2)} />
                    <SubTotalAktivitas value={toidr(totalBebanOp + totalBeban2 + totalBeban3)} />

                    <Suspense fallback={<Loading section="AP" />}>
                        <NeracaDataAPSurplus title="BP" titleTotal="Beban Penyusutan" start={start} end={end} />
                    </Suspense>

                </div>
            </div>
        </>
    )
}

export default TableArusKas;