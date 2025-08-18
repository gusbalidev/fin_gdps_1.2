"use client"

import global from "@/config.js";

import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";

import HitungPrevious from "./hitung-Previous";
import TableArusKas from "./table-aruskas";
import TableAktivitas from "./table-aktivitas";

export default function ShowNSDataB() {

    const { start, end, startPrev, endPrev } = useNeracaSaldoContextB();

    // console.log('SHOW-NS-DATA:')
    // console.log('Start:', start)
    // console.log('End:', end)
    // console.log('StartPrev:', startPrev)
    // console.log('EndPrev:', endPrev)

    // TANGGAL AWAL
    // const startFirst = "2020-01-01"
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01

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
                    <HitungPrevious title="P1 B" type={4} group2={8} start={startFirst} end={endPrev} />
                    <HitungPrevious title="P2 B" type={4} group2={9} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B1 B" type={5} group2={10} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B2 B" type={5} group2={11} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B3 B" type={5} group2={12} start={startFirst} end={endPrev} />
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
