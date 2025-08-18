"use client"

import global from "@/config.js";
import { Suspense } from "react";
import { getMonth } from "date-fns";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";
import TulisTotal from "./tulis-total";
import toidr from "@/lib/toidr";

import SubTotalAktivitas from "./total-aktivitas";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useAktivitasContext from "@/context/aktivitas-context";
import useSaldoAwalContext from "@/context/saldo-awal-context";

// import JustTitle from "../aktivitas-xx/just-title";
import JustTitle from "@/lib/just-title";
// import NeracaDataNew from "../aktivitas-xx/neraca-data-new";
import NeracaDataNew from "./neraca-data-new"
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";
import HitungPrevious from "./hitung-Previous";
import NeracaDataAPSurplus from "./neraca-data-ap-surplus";

export default function ShowNSData() {

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
                        {/* <JustTitle title="Surplus (Defisit)" />
                        <JustTitle title="Beban Penyusutan" /> */}
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
                            <HitungAsetBersih title="AB" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} />
                        </Suspense>

                        {/* <HitungPrevious title="KPABX" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={8} start={startFirst} end={endPrev} /> */}
                        <br />

                    </div>
                </div>


                <h1 className="text-2xl font-bold dark:text-blue-500">Data Arus Kas</h1>
                <div className="flex flex-wrap">
                    <div className="w-1/3">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Kelompok Akun</h2>
                        <JustTitle title="Total Penerimaan" />
                        <JustTitle title="Total Beban" />
                        <JustTitle title="Surplus (Defisit)" />
                        <JustTitle title="Beban Penyusutan" />
                        <JustTitle title="--- Surplus (Defisit)" />
                    </div>

                    <div className="w-1/4">
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


                {/* <br />
                <br />
                <Divider /> */}
                {/* TEST
                <TulisTotal value={toidr(totalBebanOp)} title="B1" />
                <TulisTotal value={toidr(totalBeban2)} title="B2" />
                <TulisTotal value={toidr(totalBeban3)} title="B3" /> */}
                {/* <h2 className="text-md font-bold dark:text-blue-500">Data Penerimaan & Beban s/d akhir {titlePrevMonthYear}</h2> */}

                <div>
                    <HitungPrevious title="Penerimaan 1" type={4} group2={8} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Penerimaan 2" type={4} group2={9} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 1" type={5} group2={10} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 2" type={5} group2={11} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 3" type={5} group2={12} start={startFirst} end={endPrev} />
                </div>

                {/* <br /> */}
                {/* <h2 className="text-md font-bold dark:text-blue-500">Perhitungan s/d akhir {titlePrevMonthYear}</h2> */}
                {/* <div>
                    <TulisTotal value={toidr(totalTerima1X + totalTerima2X)} title="Total Penerimaan" />
                    <TulisTotal value={toidr(totalBebanOpX + totalBeban2X + totalBeban3X)} title="Total Beban" />
                    <TulisTotal value={toidr(totalTerima1X + totalTerima2X - (totalBebanOpX + totalBeban2X + totalBeban3X))} title={`Total Selisih AB s/d ${titlePrevMonthYear}`} />
                    <TulisTotal value={toidr(saldoAwal)} title="Saldo Awal Akun KPAB" />
                </div> */}

                <div className="h-6"></div>

            </div>
        </>
    )
}
