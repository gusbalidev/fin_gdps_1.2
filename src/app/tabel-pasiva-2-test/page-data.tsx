"use client"

import global from "@/config.js";

import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";

import HitungPrevious from "./hitung-Previous";
import TableArusKas from "./table-aruskas";
import TablePasiva from "./table-pasiva";

import { Suspense } from "react";
import Loading from "@/components/Loading";

import NeracaData from "../neraca2/neraca-data";
import NeracaDataSub from "../neraca2/neraca-data-sub";
import Divider from "@/components/Divider";

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

                <br />
                <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">AKTIVA</h2>
                <Divider />
                <br />


                <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">PASIVA</h2>
                <Divider />
                <br />
                <div>
                    <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">KEWAJIBAN</h2>
                    {/* <Divider /> */}
                    <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                        <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
                        <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
                        <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
                        <NeracaDataSub title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
                    </Suspense>
                    <br />
                    <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">ASET BERSIH</h2>
                    <TablePasiva />
                    {/* <TableArusKas /> */}
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
