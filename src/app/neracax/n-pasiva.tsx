import React, { Suspense } from 'react'
import { getMonth } from 'date-fns';

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import NeracaData from './neraca-data';
import NeracaDataX from './neraca-dataX';
import NeracaDataSub from './neraca-data-sub';
import NeracaDataSubX from './neraca-data-subX';
import NeracaDataAP from '../neraca-t/neraca-data-ap';
import NeracaDataAPX from './neraca-data-apX';

import { NeracaDataTotalAT, NeracaDataTotalATX } from './total-at';
import NeracaDataSubABX from './neraca-data-subX-AB';

import NeracaDataAB from './neraca-data-AB';
import NeracaDataABX from './neraca-data-ABX';

import NeracaDataSubAB from './neraca-data-sub-AB';
import GetBalance from "@/lib/get-balance";
import TotalRL from "./hitung-ab-selisih";
import GetBalanceX from "@/lib/get-balance-x";
import TotalRLX from "./hitung-ab-selisih-x";

import GetBalance1 from "@/lib/get-balance1";
import GetBalance1X from '@/lib/get-balance1-x';
// import TotalABAkhir from '@/lib/total-aset-bersih-akhir';

import TotalAllAB from './total-all-AB';
import TotalABAkhir from './total-aset-bersih-akhir-new';

import HitungAsetBersih from './hitung-Aset-Bersih-new';
import HitungAsetBersihX from './hitung-Aset-Bersih-new-x';

import HitungSelisih from './hitung-selisih';
import HitungSelisihX from './hitung-selisih-x';
import NewAB from './new-ab-all';

import useAktivitasContext from '@/context/aktivitas-context';

//
export default function Pasiva() {

  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
  const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } = useNeracaTContext();
  const { totalTerima1X } = useAktivitasContext();

  const startFirst = "2020-01-01";

  // Cek bulan
  const monthX = getMonth(new Date(endPrev))+1;
  const month = getMonth(new Date(end))+1;
  
  return (
    <>
      {/* PASIVA - KANAN */}
      {/* --------------------------------------------- */}
      <div className="basis-4/5">

        {/* HITUNG / COLLECT EARLY DATA NEEDED */}
        {/* Saldo Awal COA id 82 - Kenaikan Penurunan AB - Periode PREVIOUS*/}
        <GetBalance1X title="sa-x" titleTotal="Saldo Awal" id={82} />
        {/* Saldo Awal COA id 82 - Kenaikan Penurunan AB - Periode CURRENT*/}
        <GetBalance1 title="sa-2" titleTotal="Saldo Awal" id={82} />

        {/* HITUNG Aset Bersih Awal - kolom 1 - Previous*/}
        <NeracaDataABX title="ABA-x" titleTotal="Aset Bersih Awal" type={3} group={6} start={startFirst} end={endPrev} />
        {/* HITUNG Aset Bersih Awal - kolom 2 - Current*/}
        <NeracaDataAB title="ABA-2" titleTotal="Aset Bersih Awal" type={3} group={6} start={startFirst} end={end} />



        <div className="flex justify-between">
          <h1 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
            KEWAJIBAN & ASET BERSIH
          </h1>

          {/* Judul Periode Previous / Kolom 1 */}
          <h1 className={`${textStyles.sizes.base} text-gray-400 pt-4 pb-1`}>{titlePrevMonthYear}</h1>
        </div>

        <Divider />
        <h2 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
          KEWAJIBAN
        </h2>
        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
          <NeracaDataX title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={endPrev} />
          <NeracaDataX title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={endPrev} />
          <NeracaDataX title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={endPrev} />
          <NeracaDataSubX title="KW" titleTotal="Kewajiban" type={2} group={4} start={startFirst} end={endPrev} />
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">
          ASET BERSIH
        </h2>
        {/* <Suspense fallback={<Loading section="AB" />}> */}
        {/* <NeracaDataSubX title="AB" titleTotal="AB" type={3} group={6} start={startPrev} end={endPrev} /> */}
        {/* <ShowABX title="Kenaikan (Penurunan) Aset Bersih" /> */}
        {/* <NeracaDataABX title="KPAB" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={endPrev}/> */}

        {/* <NeracaDataSubABX title="Aset Bersih Akhir" titleTotal="Aset Bersih Akhir" /> */}
        {/* </Suspense> */}


        {/* 
        <GetBalanceX title="P-PX" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={endPrev} />
        <BalanceX title="P-LX" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-OPX" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-SKX" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-BPX" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={endPrev} /> 
        */}

        {/* Hitung Penerimaan Persembahan & Biaya*/}
        <HitungSelisihX title="Penerimaan 1x" type={4} group2={8} start={startFirst} end={endPrev} />
        <HitungSelisihX title="Penerimaan 2x" type={4} group2={9} start={startFirst} end={endPrev} />
        <HitungSelisihX title="Beban 1x" type={5} group2={10} start={startFirst} end={endPrev} />
        <HitungSelisihX title="Beban 2x" type={5} group2={11} start={startFirst} end={endPrev} />
        <HitungSelisihX title="Beban 3x" type={5} group2={12} start={startFirst} end={endPrev} />

        {/* Tampilkan RL / Kenaikan (Penurunan) Aset Bersih */}
        {/* <TotalRLX title="RL" titleTotal="Kenaikan (Penurunan) Aset Bersih" /> */}


        {/* NEW ASET BERSIH - Awal / Kenaikan (Penurunan) / Akhir - Periode PREVIOUS*/}
        <TotalAllAB isCurrent={false} titleTotal="Kenaikan (Penurunan) Aset Bersih" month={monthX} />

        {/* Tampilkan Total Aset Bersih Akhir */}
        {/* <TotalABAkhir isCurrent={false} titleTotal="Aset Bersih Akhir" month={monthX} /> */}

        {/* TEST */}
        {/* <HitungAsetBersihX title="ABx" titleTotal="Aset Bersih Awal-Akhir" type={3} group2={6} start={startFirst} end={endPrev} month={monthX} /> */}

        <div className="h-2"></div>
        {/* <NewAB isCurrent={false} titleTotal="All" start={startFirst} end={endPrev} month={monthX} /> */}

        {/* <Divider /> */}
        <div className="h-2"></div>

      </div>

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
          <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end}/>
          <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
          <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
          <NeracaDataSub title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
          ASET BERSIH
        </h2>

        {/* NEW ASET BERSIH - Awal / Kenaikan (Penurunan) / Akhir - Periode CURRENT*/}
        <TotalAllAB isCurrent={true} titleTotal="Kenaikan (Penurunan) Aset Bersih" month={month} />


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

