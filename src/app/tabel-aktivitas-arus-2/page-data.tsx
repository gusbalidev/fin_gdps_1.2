"use client"

import global from "@/config.js";

import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";

import HitungPrevious from "./hitung-Previous";
import TableArusKas from "./table-aruskas";
import TableAktivitas from "./table-aktivitas";

//
export default function ShowNSDataB() {
    const startFirst = global.app.periodStart || "2023-04-01"; // Use global config or default to 2023-04-01
    const { endPrev } = useNeracaSaldoContextB();

    return (
        <>
            <div>
                <br />
                <div>
                    <TableAktivitas />
                    <TableArusKas />
                </div>
  
                <div>
                    <HitungPrevious title="P1 B" type={4} group2={8} start={startFirst} end={endPrev} />
                    <HitungPrevious title="P2 B" type={4} group2={9} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B1 B" type={5} group2={10} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B2 B" type={5} group2={11} start={startFirst} end={endPrev} />
                    <HitungPrevious title="B3 B" type={5} group2={12} start={startFirst} end={endPrev} />
                </div>
  
                <div className="h-6"></div>

            </div>
        </>
    )
}
