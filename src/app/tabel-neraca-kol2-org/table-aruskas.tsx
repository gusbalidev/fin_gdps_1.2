'use client'

import global from "@/config.js";
import { getMonth } from "date-fns";
import React, { Suspense } from 'react'

import toidr from '@/lib/toidr'
import Loading from "@/components/Loading";
import SubTotalAktivitas from './total-aktivitas'
import NeracaDataAPSurplus from './neraca-data-ap-surplus'
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import useAktivitasContextB from "@/context/aktivitas-contex-b";

function TableArusKas() {

    const { start, end, startPrev, endPrev, titleMonthYear } = useNeracaSaldoContextB();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContextB();

    // console.log('SHOW-NS-DATA:')
    // console.log('Start:', start)
    // console.log('End:', end)
    // console.log('StartPrev:', startPrev)
    // console.log('EndPrev:', endPrev)

    // TANGGAL AWAL
    // const startFirst = "2020-01-01"
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01

    const prevMonth = getMonth(new Date(end)); // Get previous month from start date
    return (
        <>
            <div className="flex flex-wrap">
                {/*                 
                <div className="w-1/3">
                    <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Kelompok Akun</h2>
                    <JustTitle title="Total Penerimaan" />
                    <JustTitle title="Total Beban" />
                    <JustTitle title="Surplus (Defisit)" />
                    <JustTitle title="Beban Penyusutan" />
                    <JustTitle title="--- Surplus (Defisit)" />
                </div> 
                */}

                <div className="w-full">
                    {/* <Divider /> */}
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2>

                    <SubTotalAktivitas value={toidr(totalTerima1 + totalTerima2)} />

                    <SubTotalAktivitas value={toidr(totalBebanOp + totalBeban2 + totalBeban3)} />

                    <Suspense fallback={<Loading section="AP" />}>
                        <NeracaDataAPSurplus title="BP" titleTotal="Beban Penyusutan" start={start} end={end} />
                        {/* <NeracaDataBefore title="BPX" titleTotal="Beban Penyusutan" type={1} group2={14} start={startPrev} end={endPrev} /> */}
                    </Suspense>

                    {/* <Suspense fallback={<Loading section="SURPLUS (Def)" />}>
                            <NeracaDataSurplus1 title="" titleTotal="" />
                        </Suspense> */}

                </div>

            </div>

        </>
    )
}

export default TableArusKas;