'use client'

import global from "@/config.js";

import JustTitle from '@/lib/just-title'
import React, { Suspense } from 'react'
import SubTotalAktivitas from './total-aktivitas'
import toidr from '@/lib/toidr'
import NeracaDataAPSurplus from './neraca-data-ap-surplus'
import useNeracaSaldoContext from '@/context/neraca-saldo-context'
import useAktivitasContext from '@/context/aktivitas-context'
import useSaldoAwalContext from '@/context/saldo-awal-context'
import { getMonth } from "date-fns";
import Loading from "@/components/Loading";
import NeracaDataNew from "./neraca-data-new";
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";
import KolomTitle from "../aktivitas/kolom-title-aktivitas";

export default function TableAktivitas() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear, titleMY } = useNeracaSaldoContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB,
        totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();
    const { saldoAwal } = useSaldoAwalContext();


    console.log('SHOW-NS-DATA:')
    console.log('Start:', start)
    console.log('End:', end)
    console.log('StartPrev:', startPrev)
    console.log('EndPrev:', endPrev)

    // TANGGAL AWAL
    // const startFirst = "2020-01-01"
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01

    const prevMonth = getMonth(new Date(end)); // Get previous month from start date
    return (
        <>

            <div className="flex flex-wrap">



                <div className="w-full">

                    {/* <Divider /> */}
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2>
                    <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                        {/* <NeracaData title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} /> */}
                        <NeracaDataNew title="PEN-PER" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                        {/* <NeracaData title="PEN-LAI" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} /> */}
                        <NeracaDataNew title="PEN-LAI" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                        <NeracaDataNew title="BEB-OPE" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                        <NeracaDataNew title="BEB-SEK" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                        <NeracaDataNew title="BEB-BID" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} />
                    </Suspense>

                    {/* <Suspense fallback={<Loading section="SURPLUS (Def)" />}>
                            <NeracaDataSurplus1 title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="AP" />}>
                            <NeracaDataAP title="BP" titleTotal="Beban Penyusutan" start={start} end={end} />
                        </Suspense> */}

                    <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
                        <HitungKPAB titleTotal="Kenaikan (Penurunan) Aset Bersih" month={prevMonth + 1} />
                    </Suspense>

                    <Suspense fallback={<Loading section="ASET BERSIH AWAL - AKHIR" />}>
                        <HitungAsetBersih title="AB1" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} />
                    </Suspense>

                    {/* <HitungPrevious title="KPABX" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={8} start={startFirst} end={endPrev} /> */}
                    <br />

                </div>
            </div>

        </>
    )
}