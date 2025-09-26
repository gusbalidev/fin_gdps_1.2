// "use client"

import { Suspense } from "react";
import { getMonth } from "date-fns";

import toidr from "@/lib/toidr";
import global from "@/config.js";
import Loading from "@/components/Loading";
import Divider from "@/components/Divider";

import { JustValueTotalNoLineBold2 } from "../neraca/title-value";

import NeracaDataAP from "./neraca-data-ap";

import useNeracaTContext from "@/context/neraca-t-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaCol1Context from "@/context/neraca-col1-context";

import HitungPenerimaanBiayaXX from "./hitung-Penerimaan-Biaya-Previous";
import HitungPenerimaanBiaya from "./hitung-Penerimaan-Biaya";
import HitungAsetBersih from "./hitung-Aset-Bersih";
import NeracaDataSub from "./neraca-data-sub";
import NeracaDataTotalAT from "./neraca-data-total-at";
import NeracaDataTitle from "../lamp-n2/neraca-data-title";
import NeracaDataDetailTitle from "../lamp-n2/neraca-data-detailX-title";


//
export default function ShowNSDataB() {
  const { start, end, startPrev, endPrev } = useNeracaSaldoContext();
  const startFirst = global.app.periodStart || "2024-04-01"; // Use global config or default to 2023-04-01
  const prevMonth = getMonth(new Date(end));

  return (
    <>
      <div>
        {/* <br /> */}
        <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">AKTIVA</h2>
        <Divider />
        {/* <br /> */}

        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 text-start">AKTIVA LANCAR</h2>
        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
          {/* <AktivaLancar /> */}
          <NeracaDataTitle title="KAS" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="BANK" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="DEPOSITO" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="DEPO" type={1} group={3} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="BON-SBID" type={1} group={4} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="BON-SBAP" type={1} group={5} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AKTIVA LANCAR" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="PIU-K" type={1} group={6} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AKTIVA LANCAR" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="PIU-J" type={1} group={7} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AKTIVA LANCAR" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="PIU-R" type={1} group={8} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AL" titleTotal="BIY-BDM" type={1} group={9} start={startFirst} end={end} />

          <NeracaDataSub title="AKTIVA LANCAR" titleTotal="AKTIVA LANCAR" type={1} group={1} start={startFirst} end={end} />
        </Suspense>


        <div className="h-2"></div>

        <Divider />
        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA-T-L</h2>
        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR - CURRENT" />}>
          {/* <AktivaTidakLancar /> */}
          <NeracaDataTitle title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="ATL" titleTotal="TDP" type={1} group={15} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="ATL" titleTotal="GDP" type={1} group={16} start={startFirst} end={end} />

          <NeracaDataSub title="ATL" titleTotal="AKTIVA TIDAK LANCAR" type={1} group={3} start={startFirst} end={end} />
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA TETAP</h2>
        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
          {/* <AktivaLancar /> */}
          <NeracaDataTitle title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AT" titleTotal="TN" type={1} group={10} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AT" titleTotal="BG" type={1} group={11} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AT" titleTotal="KN" type={1} group={12} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="AT" titleTotal="IN" type={1} group={13} start={startFirst} end={end} />

          {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
          <NeracaDataTotalAT title="AKTIVA TETAP" start={startFirst} end={end} />
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">PENYUSUTAN</h2>
        <Suspense fallback={<Loading section="AP" />}>
          {/* <AkumPenyusutan /> */}
          {/* <NeracaData title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={end} /> */}
          <NeracaDataAP title="AP" titleTotal="AKUMULASI PENYUSUTAN - CURRENT" start={startFirst} end={end} />
          <Divider />
          {/* <NeracaDataSub title="AP" titleTotal="AP" type={1} group={14} start={startFirst} end={end} /> */}
        </Suspense>

        {/* <Divider /> */}
        {/* <h2 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">KEWAJIBAN & ASET BERSIH</h2> */}

        <Divider />

        <br />
        <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">KEWAJIBAN & ASET BERSIH</h2>
        <Divider />

        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 text-start">KEWAJIBAN</h2>
        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
          <NeracaDataTitle title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="KW" titleTotal="HUT-B" type={2} group={16} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="KW" titleTotal="HUT-LL" type={2} group={17} start={startFirst} end={end} />
          <div className="h-2" />
          <NeracaDataTitle title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
          <NeracaDataDetailTitle title="KW" titleTotal="HUT-JP" type={2} group={18} start={startFirst} end={end} />

          <NeracaDataSub title="KW" titleTotal="KEWAJIBAN" type={2} group={4} start={startFirst} end={end} />
          {/* <NeracaDataDetailX title="KW" titleTotal="HUT-B" type={2} group={4} start={startFirst} end={endPrev} /> */}
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-lg text-start font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">ASET BERSIH</h2>
        {/* <HitungPenerimaanBiaya /> */}
        {/* <HitungAsetBersih title="ABX" titleTotal="AB Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={prevMonth + 1} /> */}
        <p className="text-[1em] text-start">Aset Bersih</p>
        <p className="text-[1em] text-start">Kenaikan (Penurunan) Aset Bersih</p>
        <Divider />
        <p className="text-[1em] text-start font-bold text-blue-600 dark:text-orange-500">Total ASET BERSIH AKHIR:</p>
        <br />

        <Divider />
        <div className="bg-gray-300 dark:bg-slate-800 pl-2">
        <h2 className="text-xl text-start font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">Total AKTIVA</h2>
        </div>
        <Divider />
        <br />
        <Divider />
        <div className="bg-gray-300 dark:bg-slate-800 pl-2">
        <h2 className="text-xl text-start font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">Total PASIVA</h2>
        </div>
        <Divider />

        {/* Hitung Total Penerimaan/Beban untuk periode sebelumnya <br />
        Per. sblum: {startFirst} - {endPrev}<br /> */}
        <div>
          <HitungPenerimaanBiayaXX title="P1X" type={4} group2={8} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="P2X" type={4} group2={9} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B1X" type={5} group2={10} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B2X" type={5} group2={11} start={startFirst} end={endPrev} />
          <HitungPenerimaanBiayaXX title="B3X" type={5} group2={12} start={startFirst} end={endPrev} />
        </div>

        {/* <br /> */}
        {/* <TotalPasiva /> */}
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
  const { totalAsetAwalX, totalSelisihABX } = useNeracaCol1Context();
  const totalPasiva = totalKX + totalAsetAwalX + totalSelisihABX;

  return (
    <>
      <JustValueTotalNoLineBold2 value={toidr(totalPasiva)} />
    </>
  );
}