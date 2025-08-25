"use client"

import { Suspense } from "react";
import { getMonth } from "date-fns";
import toidr from "@/lib/toidr";
import global from "@/config.js";

import Loading from "@/components/Loading";
import Divider from "@/components/Divider";

import { JustValueTotalBold, JustValueTotalNoLine, JustValueTotalNoLineBold2 } from "../neraca2/title-value";
import NeracaDataX from "../n2new/neraca-dataX";
import NeracaDataSubX from "../n2new/neraca-data-subX";
import NeracaDataAP from "./neraca-data-ap-close";

import useNeracaTContext from "@/context/neraca-t-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useAktivitasContext from "@/context/aktivitas-context";

import HitungPenerimaanBiayaXX from "./hitung-Penerimaan-Biaya-Previous";
import HitungPenerimaanBiaya from "./hitung-Penerimaan-Biaya";
import HitungKPAB from "./hitung-KPAB";
import HitungAsetBersih from "./hitung-Aset-Bersih";
// import { NeracaDataTotalATX } from "../n2new/total-at";


//
export default function ShowNSDataB() {

  const { totalATX, totalAPX } = useNeracaTContext();
  const { start, end, startPrev, endPrev } = useNeracaSaldoContext();
  
  const startFirst = global.app.periodStart || "2024-04-01"; // Use global config or default to 2023-04-01
  const prevMonth = getMonth(new Date(end));
  
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
          <NeracaDataX title="ALX" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={end} />
          <NeracaDataX title="ALX" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={end} />

          <NeracaDataSubX title="ALX" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={end} />
        </Suspense>

        <br />
        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
          {/* <AktivaTidakLancar /> */}
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA TIDAK LANCAR</h2>
          <NeracaDataX title="ATLX" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={end} />
          <NeracaDataX title="ATLX" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={end} />

          <NeracaDataSubX title="ATLX" titleTotal="ATL" type={1} group={3} start={startFirst} end={end} />
        </Suspense>

        <br />
        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
          {/* <AktivaTidakLancar /> */}
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">AKTIVA TETAP</h2>
          <NeracaDataX title="ATX" titleTotal="TANAH" type={1} group={10} start={startFirst} end={end} />
          <NeracaDataX title="ATX" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={end} />
          <NeracaDataX title="ATX" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={end} />
          <NeracaDataX title="ATX" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={end} />

          {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
          {/* <NeracaDataTotalATX title="ATX" start={startFirst} end={end} /> */}
          <JustValueTotalBold value={toidr(totalATX)} />
        </Suspense>

        {/* Hitung Ak. Penyusutan */}
        <Suspense fallback={<Loading section="AP" />}>
          <NeracaDataAP title="APX" titleTotal="AKUMULASI PENYUSUTAN" start={startFirst} end={end} />
        </Suspense>

        <br />
        {/* Akumulasi Penyusutan */}
        <JustValueTotalNoLine value={toidr(totalAPX)} />
        {/* Total Aktiva Tetap Bersih */}
        <JustValueTotalBold value={toidr(totalATX + totalAPX)} />

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
            <NeracaDataX title="KWX" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
            <NeracaDataX title="KWX" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
            <NeracaDataX title="KWX" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
            <NeracaDataSubX title="KWX" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
          </Suspense>
          <br />
          <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold opacity-0">PENERIMAAN / BIAYA - ASET BERSIH</h2>
          <HitungPenerimaanBiaya />
          
          {/* <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
              <HitungKPAB titleTotal="Kenaikan (Penurunan) Aset Bersih" month={prevMonth + 1} />
          </Suspense> */}

          {/* Tampilkan Data */}
          <Suspense fallback={<Loading section="ASET BERSIH AWAL - AKHIR" />}>
              <HitungAsetBersih title="ABX" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} />
          </Suspense>

          {/* <TableArusKas /> */}
        </div>

        {/* Hitung Total Penerimaan/Beban untuk periode sebelumnya <br />
        Per. sblum: {startFirst} - {endPrev}<br /> */}
        <div>
          <HitungPenerimaanBiayaXX title="P1X" type={4} group2={8} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="P2X" type={4} group2={9} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B1X" type={5} group2={10} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B2X" type={5} group2={11} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B3X" type={5} group2={12} start={startFirst} end={endPrev} />
        </div>

        <Divider />
        <TotalPasiva />
      </div>
    </>
  )
};



//
function TotalAktiva() {
  const { totalALX, totalATLX, totalAT1X, totalAT2X, totalAT3X, totalAT4X, totalAPX } = useNeracaTContext();

  const totalAT = totalAT1X + totalAT2X + totalAT3X + totalAT4X;
  const totalAktiva = totalALX + totalATLX + totalAT + totalAPX;

  return (
    <>
      <JustValueTotalNoLineBold2 value={toidr(totalAktiva)} />
    </>
  );
}

//
function TotalPasiva() {
  const { totalKX } = useNeracaTContext();
  const { totalAsetAwalX, totalAsetAkhirX } = useAktivitasContext();

  const totalPasiva = totalKX + totalAsetAkhirX;


  return (
    <>
      <JustValueTotalNoLineBold2 value={toidr(totalPasiva)} />
    </>
  );
}