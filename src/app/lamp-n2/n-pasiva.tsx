import React, { Suspense } from 'react'
import { getMonth } from 'date-fns';

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import NeracaData from '../neraca/neraca-data';
import NeracaDataX from '../neraca/neraca-dataX';
import NeracaDataSub from '../neraca/neraca-data-sub';
import NeracaDataSubX from '../neraca/neraca-data-subX';
import NeracaDataAP from '../neraca-t/neraca-data-ap';
import NeracaDataAPX from '../neraca/neraca-data-apX';

import { NeracaDataTotalAT, NeracaDataTotalATX } from '../neraca/total-at';
import NeracaDataSubABX from '../neraca/neraca-data-subX-AB';

import NeracaDataAB from '../neraca/neraca-data-AB';
import NeracaDataABX from '../neraca/neraca-data-ABX';

import NeracaDataSubAB from '../neraca/neraca-data-sub-AB';
import GetBalance from "@/lib/get-balance";
import TotalRL from "../neraca/hitung-ab-selisih";
import GetBalanceX from "@/lib/get-balance-x";
import TotalRLX from "../neraca/hitung-ab-selisih-x";

import GetBalance1 from "@/lib/get-balance1";
import GetBalance1X from '@/lib/get-balance1-x';
// import TotalABAkhir from '@/lib/total-aset-bersih-akhir';

import TotalAllAB from '../neraca/total-all-AB';
import TotalABAkhir from '../neraca/total-aset-bersih-akhir-new';

import HitungAsetBersih from '../neraca/hitung-Aset-Bersih-new';
import HitungAsetBersihX from '../neraca/hitung-Aset-Bersih-new-x';

import HitungSelisih from '../neraca/hitung-selisih';
import HitungSelisihX from '../neraca/hitung-selisih-x';
import NewAB from '../neraca/new-ab-all';

import useAktivitasContext from '@/context/aktivitas-context';

//
export default function Pasiva() {

  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
  const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } = useNeracaTContext();
  const { totalTerima1X } = useAktivitasContext();

  const startFirst = "2020-01-01";

  // Cek bulan
  const monthX = getMonth(new Date(endPrev)) + 1;
  const month = getMonth(new Date(end)) + 1;

  return (
    <>
      {/* PASIVA - KANAN */}
      {/* --------------------------------------------- */}


      <div className="basis-1/3">
        <div className="flex justify-between">
          {/* Space */}
          <h1 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500 opacity-0`}> X </h1>

          {/* Judul Periode Current / Kolom 2 */}
          <h1 className="text-[1em] pt-4 pb-1  text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
        </div>

        <Divider />
        <h1 className="text-[1em] font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500 opacity-0">
          KEWAJIBAN
        </h1>

        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
          <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
          <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
          <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
          <NeracaDataSub title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
        </Suspense>

        <div className="h-2"></div>

        {/* <Divider />
        <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
          ASET BERSIH
        </h2> */}

        {/* NEW ASET BERSIH - Awal / Kenaikan (Penurunan) / Akhir - Periode CURRENT*/}
        {/* <TotalAllAB isCurrent={true} titleTotal="Kenaikan (Penurunan) Aset Bersih" month={month} /> */}


        {/* 
        <GetBalance title="P-P" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={end} />
        <GetBalance title="P-L" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={end} />
        <GetBalance title="B-OP" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={end} />
        <GetBalance title="B-SK" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={end} />
        <GetBalance title="B-BP" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={end} /> 
        */}

        {/* Hitung Penerimaan Persembahan & Beban*/}
        <HitungSelisih title="Penerimaan 1" type={4} group2={8} start={start} end={end} />
        <HitungSelisih title="Penerimaan 2" type={4} group2={9} start={start} end={end} />
        <HitungSelisih title="Beban 1" type={5} group2={10} start={start} end={end} />
        <HitungSelisih title="Beban 2" type={5} group2={11} start={start} end={end} />
        <HitungSelisih title="Beban 3" type={5} group2={12} start={start} end={end} />

        {/* <NeracaDataSubAB title="AB" titleTotal="Aset Bersih Akhir" /> */}
        {/* <TotalABAkhir isCurrent={true} titleTotal="Aset Bersih Akhir" month={month} /> */}

        {/* TEST AB periode Aktif */}
        {/* <HitungAsetBersih title="ABcurrent" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={end} month={month} /> */}

        <div className="h-2"></div>

        {/* BARU */}
        {/* <NewAB isCurrent={true} titleTotal="All" start={start} end={end} month={month} /> */}

        {/* <Divider /> */}
        <div className="h-2"></div>
        <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
          K&AB
        </h2>
        {/* <Suspense fallback={<Loading section="AB2" />}> */}
        {/* <NeracaDataAB title="AB2" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={end} /> */}
        <div className="h-2"></div>
      </div>

    </>
  )
};

