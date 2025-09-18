'use client'

import React, { Suspense } from 'react'
import { getMonth } from "date-fns";
import global from "@/config.js";
import Loading from "@/components/Loading";
import useNeracaSaldoContext from '@/context/neraca-saldo-context'
import NeracaDataNew from "./neraca-data-new";
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";


//
export default function TableAktivitas() {
    const { start, end, titleMonthYear } = useNeracaSaldoContext();
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01
    const prevMonth = getMonth(new Date(end)); // Get previous month from start date

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2>
                    <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                        <NeracaDataNew title="PEN-PER" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
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

                    <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
                        <HitungKPAB titleTotal="Kenaikan (Penurunan) Aset Bersih" month={prevMonth + 1} />
                    </Suspense>

                    <Suspense fallback={<Loading section="ASET BERSIH AWAL - AKHIR" />}>
                        <HitungAsetBersih title="AB1" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} />
                    </Suspense>
                    <br />
                </div>
            </div>

        </>
    )
}