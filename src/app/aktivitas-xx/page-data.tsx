"use client"

import global from "@/config.js";
import { Suspense } from "react";
import { getMonth } from "date-fns";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Divider from "@/components/Divider";
import Loading from "@/components/Loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data";
import NeracaDataAP from "./neraca-data-ap";
import NeracaDataNew from "./neraca-data-new";
import HitungKPAB from "./hitung-KPAB";
import NeracaDataSurplus1 from "./hitung-surplus1";
import HitungAsetBersih from "./hitung-Aset-Bersih";
import HitungKPABPrevious from "./hitung-KPAB-previous";
import HitungPrevious from "./hitung-Previous";

export default function ShowNSData() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear, titleMY } = useNeracaSaldoContext();

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
            <div>
                <Divider />
                <h1 className="text-2xl font-bold dark:text-blue-500">Data Aktivitas</h1>
                <div className="flex flex-wrap">
                    <div className="w-1/3">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Kelompok Akun</h2>
                        <JustTitle title="Penerimaan Persembahan" />
                        <JustTitle title="Penerimaan Lain-lain/Khusus" />
                        <JustTitle title="Beban Operasional Gereja" />
                        <JustTitle title="Beban Sekretariat" />
                        <JustTitle title="Beban Bidang & Bapel" />
                        <JustTitle title="Surplus (Defisit)" />
                        <JustTitle title="Beban Penyusutan" />
                        <JustTitle title="Kenaikan (Penurunan) Aset Bersih" />
                        <JustTitle title="Aset Bersih Awal" />
                        <JustTitle title="Aset Bersih Akhir" />
                    </div>

                    <div className="w-1/4">
                        {/* <Divider /> */}
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo {titleMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            {/* <NeracaData title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} /> */}
                            <NeracaDataNew title="PEN-PER" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                            <NeracaData title="PEN-LAI" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                        </Suspense>
                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaData title="BEB-OPE" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                            <NeracaData title="BEB-SEK" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                            <NeracaData title="BEB-BID" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="SURPLUS (Def)" />}>
                            <NeracaDataSurplus1 title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="AP" />}>
                            <NeracaDataAP title="BP" titleTotal="Beban Penyusutan" start={start} end={end} />
                            {/* <NeracaDataBefore title="BPX" titleTotal="Beban Penyusutan" type={1} group2={14} start={startPrev} end={endPrev} /> */}
                        </Suspense>

                        <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
                            <HitungKPAB titleTotal="Kenaikan (Penurunan) Aset Bersih" month={prevMonth + 1} />
                        </Suspense>

                        <Suspense fallback={<Loading section="ASET BERSIH AWAL - AKHIR" />}>
                            <HitungAsetBersih title="AB" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={0} />
                        </Suspense>

                        {/* <HitungPrevious title="KPABX" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={8} start={startFirst} end={endPrev} /> */}
                        <br />
                        <h2>Cek</h2>
                        <Divider />
                        <HitungPrevious title="Terima1" titleTotal="t1x" type={4} group2={8} start={startFirst} end={endPrev} />
                        <HitungPrevious title="Terima2" titleTotal="t2x" type={4} group2={9} start={startFirst} end={endPrev} />
                        <HitungPrevious title="Beban1" titleTotal="t2x" type={5} group2={10} start={startFirst} end={endPrev} />
                        <HitungPrevious title="Beban2" titleTotal="t2x" type={5} group2={11} start={startFirst} end={endPrev} />
                        <HitungPrevious title="Beban3" titleTotal="t2x" type={5} group2={12} start={startFirst} end={endPrev} />



                    </div>
                </div>

                <div className="h-6"></div>

            </div>
        </>
    )
}
