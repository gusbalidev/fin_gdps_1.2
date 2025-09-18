"use client"

import global from "@/config.js";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import HitungPrevious from "./hitung-Previous";
import TableArusKas from "./table-aruskas";
import TableAktivitas from "./table-aktivitas";

//
export default function ShowNSData() {
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01
    const { endPrev } = useNeracaSaldoContext();

    return (
        <>
            <div>
   
                <br />
                <div>
                    <TableAktivitas />
                    <TableArusKas />
                </div>

                <div>
                    <HitungPrevious title="Penerimaan 1" type={4} group2={8} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Penerimaan 2" type={4} group2={9} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 1" type={5} group2={10} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 2" type={5} group2={11} start={startFirst} end={endPrev} />
                    <HitungPrevious title="Beban 3" type={5} group2={12} start={startFirst} end={endPrev} />
                </div>

                <div className="h-6"></div>

            </div>
        </>
    )
}
