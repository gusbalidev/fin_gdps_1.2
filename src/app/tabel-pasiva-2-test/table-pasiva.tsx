'use client'

import global from "@/config.js";
import { getMonth } from "date-fns";
import React, { Suspense } from 'react'

import Loading from "@/components/Loading";

import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import NeracaDataNew from "./neraca-data-new";
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";

export default function TabelPasiva() {

    const { start, end, startPrev, endPrev, titleMonthYear } = useNeracaSaldoContextB();

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
                <div className="w-full">

                    {/* <Divider /> */}
                    {/* <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2> */}
                    <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                        {/* <NeracaData title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} /> */}
                        <NeracaDataNew title="PEN-PERB" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                        {/* <NeracaData title="PEN-LAI" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} /> */}
                        <NeracaDataNew title="PEN-LAIB" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                        <NeracaDataNew title="BEB-OPEB" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                        <NeracaDataNew title="BEB-SEKB" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                        <NeracaDataNew title="BEB-BIDB" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} />
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
                        <HitungAsetBersih title="AB2" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} />
                    </Suspense>

                    {/* <HitungPrevious title="KPABX" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={8} start={startFirst} end={endPrev} /> */}
                    <br />

                </div>
            </div>
        </>
    )
}