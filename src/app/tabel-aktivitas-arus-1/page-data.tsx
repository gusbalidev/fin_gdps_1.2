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

import JustTitle from "../aktivitas-xx/just-title";
import NeracaDataNew from "../aktivitas-xx/neraca-data-new";
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";
import HitungPrevious from "./hitung-Previous";
import NeracaDataAPSurplus from "./neraca-data-ap-surplus";
import KolomTitle from "../aktivitas/kolom-title-aktivitas";
import TableArusKas from "./table-aruskas";
import TableAktivitas from "./table-aktivitas";

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
                {/* <Divider /> */}
                {/* <h1 className="text-2xl font-bold dark:text-blue-500">Data Aktivitas</h1> */}
                <br />
                <div>
                    <TableAktivitas />
                    <TableArusKas />
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
