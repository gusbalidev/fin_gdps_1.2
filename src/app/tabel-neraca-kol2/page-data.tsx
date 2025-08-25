"use client"

import { Suspense } from "react";
import { getMonth } from "date-fns";
import toidr from "@/lib/toidr";
import global from "@/config.js";

import Loading from "@/components/Loading";
import Divider from "@/components/Divider";

import useNeracaTContext from "@/context/neraca-t-context";
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import useAktivitasContextB from "@/context/aktivitas-contex-b";

import HitungPrevious from "./hitung-Previous";
import DataAsetBersih from "./data-aset-bersih";

import NeracaData from "../neraca2/neraca-data";
import NeracaDataSub from "../neraca2/neraca-data-sub";
import NeracaDataAP from "./neraca-data-ap-close";

import { NeracaDataTotalAT } from "../neraca2/total-at";
import { JustValueTotalBold, JustValueTotalNoLine, JustValueTotalNoLineBold2 } from "../neraca2/title-value";


//
export default function ShowNSDataB() {

  const { totalAT1, totalAT2, totalAT3, totalAT4, totalAP } = useNeracaTContext();

  const { start, end, startPrev, endPrev } = useNeracaSaldoContextB();
  const startFirst = global.app.periodStart || "2024-04-01"; // Use global config or default to 2023-04-01

  const totalAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
  const { totalSelisihAB } = useAktivitasContextB();

  return (

    <>
      <div>

        <br />
        <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA</h2>
        <Divider />
        <br />
        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
          {/* <AktivaLancar /> */}
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA LANCAR</h2>
          <NeracaData title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={end} />
          <NeracaData title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={end} />

          <NeracaDataSub title="AL" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={end} />
        </Suspense>

        <br />
        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
          {/* <AktivaTidakLancar /> */}
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA TIDAK LANCAR</h2>
          <NeracaData title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={end} />
          <NeracaData title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={end} />

          <NeracaDataSub title="ATL" titleTotal="ATL" type={1} group={3} start={startFirst} end={end} />
        </Suspense>

        <br />
        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
          {/* <AktivaTidakLancar /> */}
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA TETAP</h2>
          <NeracaData title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={end} />
          <NeracaData title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={end} />
          <NeracaData title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={end} />
          <NeracaData title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={end} />

          {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
          <NeracaDataTotalAT title="Aktiva Tetap" start={startFirst} end={end} />
        </Suspense>

        {/* Hitung Ak. Penyusutan */}
        <Suspense fallback={<Loading section="AP" />}>
          <NeracaDataAP title="AP" titleTotal="AKUMULASI PENYUSUTAN" start={startFirst} end={end} />
        </Suspense>

        <br />
        {/* Akumulasi Penyusutan */}
        <JustValueTotalNoLine value={toidr(totalAP)} />
        <JustValueTotalBold value={toidr(totalAT + totalAP)} />

        <br />
        <Divider />
        <TotalAktiva />

        <br />
        <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold opacity-0">PASIVA</h2>
        <Divider />
        <br />
        <div>
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">KEWAJIBAN</h2>
          {/* <Divider /> */}
          <Suspense fallback={<Loading section="KEWAJIBAN" />}>
            <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
            <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
            <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
            <NeracaDataSub title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
          </Suspense>
          <br />
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">ASET BERSIH</h2>
          <DataAsetBersih />
          {/* <TableArusKas /> */}
        </div>

        {/* Hitung Total Penerimaan/Beban untuk periode sebelumnya <br />
        Per. sblum: {startFirst} - {endPrev}<br /> */}
        <div>
          <HitungPrevious title="P1" type={4} group2={8} start={startFirst} end={endPrev} />
          <HitungPrevious title="P2" type={4} group2={9} start={startFirst} end={endPrev} />
          <HitungPrevious title="B1" type={5} group2={10} start={startFirst} end={endPrev} />
          <HitungPrevious title="B2" type={5} group2={11} start={startFirst} end={endPrev} />
          <HitungPrevious title="B3" type={5} group2={12} start={startFirst} end={endPrev} />
        </div>

        {/* totalSelisihAB: {totalSelisihAB} <br /> */}

        <Divider />
        <TotalPasiva />
      </div>
    </>
  )
};



//
function TotalAktiva() {
  const { totalAL, totalATL, totalAT1, totalAT2, totalAT3, totalAT4, totalAP } = useNeracaTContext();

  const totalAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
  const totalAktiva = totalAL + totalATL + totalAT + totalAP;

  return (
    <>
      <JustValueTotalNoLineBold2 value={toidr(totalAktiva)} />
    </>
  );
}

//
function TotalPasiva() {
  const { totalK } = useNeracaTContext();
  const { totalAsetAwal, totalSelisihAB } = useAktivitasContextB();

  const totalPasiva = totalK + totalAsetAwal + totalSelisihAB;


  return (
    <>
      <JustValueTotalNoLineBold2 value={toidr(totalPasiva)} />
    </>
  );
}