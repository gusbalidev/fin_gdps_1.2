import React, { Suspense } from 'react'

import toidr from "@/lib/toidr";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import NeracaData from './neraca-data-kolom2';
import NeracaDataX from './neraca-dataX';
import NeracaDataSub from './neraca-data-sub';
import NeracaDataSubX from './neraca-data-subX';
import NeracaDataAP from '../neraca-t/neraca-data-ap';
import NeracaDataAPX from './neraca-data-apX';

import { textStyles } from "@/lib/text-styles";
import { NeracaDataTotalAT, NeracaDataTotalATX } from './total-at';
import NeracaDataABX from './neraca-data-ABX';
import NeracaDataSubABX from './neraca-data-subX-AB';
import NeracaDataAB from './neraca-data-AB';
import NeracaDataSubAB from './neraca-data-sub-AB';

import GetBalance from "@/lib/get-balance";
import TotalRL from "./hitung-ab-selisih";
import GetBalanceX from "@/lib/get-balance-x";
import TotalRLX from "./hitung-ab-selisih-x";
import GetBalance1 from "@/lib/get-balance1";
import GetBalance1X from '@/lib/get-balance1-x';
import TotalABAkhir from '@/lib/total-aset-bersih-akhir';
import TotalKPAB from '@/lib/total-kp-aset-bersih';
import { getMonth } from 'date-fns';

//
function Pasiva() {

  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
    useNeracaSaldoContext();
  const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } =
    useNeracaTContext();
  const startFirst = "2020-01-01";

  // Cek bulan
  const monthX = getMonth(new Date(endPrev))+1;
  const month = getMonth(new Date(end))+1;

  return (
    <>
      {/* PASIVA - KANAN */}
      {/* --------------------------------------------- */}
      <div className="basis-4/5">
        <div className="flex justify-between">
          <h1 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
            KEWAJIBAN & ASET BERSIH
          </h1>
          <h1 className={`${textStyles.sizes.base} text-gray-400 pt-4 pb-1`}>
            {titlePrevMonthYear}
          </h1>
        </div>

        <Divider />
        <h2 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
          KEWAJIBAN
        </h2>
        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
          <NeracaDataX
            title="KW" titleTotal="HUTANG BIAYA"
            type={2} group={16}
            start={startFirst} end={endPrev}
          />
          <NeracaDataX
            title="KW" titleTotal="HUTANG LAIN-LAIN"
            type={2} group={17}
            start={startFirst} end={endPrev}
          />
          <NeracaDataX
            title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG"
            type={2} group={18}
            start={startFirst} end={endPrev}
          />

          <NeracaDataSubX
            title="KW" titleTotal="Kewajiban"
            type={2} group={4}
            start={startFirst} end={endPrev}
          />
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

        {/* Aset Bersih Awal */}
        <NeracaDataABX title="ABA" titleTotal="Aset Bersih Awal" type={3} group={6} start={startFirst} end={endPrev} />

        {/* Hitung Saldo Awal */}
        <GetBalance1X title="sa-x" titleTotal="Saldo Awal" id={82} />

        {/* Hitung Penerimaan Persembahan & Biaya*/}
        <GetBalanceX title="P-PX" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={endPrev} />
        <GetBalanceX title="P-LX" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-OPX" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-SKX" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={endPrev} />
        <GetBalanceX title="B-BPX" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={endPrev} />

        {/* Tampilkan RL / Kenaikan (Penurunan) Aset Bersih */}
        {/* <TotalRLX title="RL" titleTotal="Kenaikan (Penurunan) Aset Bersih" /> */}
        <TotalKPAB isCurrent={false} titleTotal="Kenaikan (Penurunan) Aset Bersih" month={monthX} />

        {/* Tampilkan Total Aset Bersih Akhir */}
        {/* <NeracaDataSubABX title="Aset Bersih Akhir" titleTotal="Aset Bersih Akhir" /> */}
        <TotalABAkhir isCurrent={false} titleTotal="Aset Bersih Akhir" />


        <div className="h-2"></div>


        <Divider />

        <div className="h-2"></div>
      </div>

      <div className="basis-1/3">
        <div className="flex justify-between">
          <h1 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500 opacity-0`}>
            X
          </h1>
          <h1 className="text-[1em] pt-4 pb-1  text-blue-600 dark:text-orange-500">
            {titleMonthYear}
          </h1>


        </div>

        <Divider />
        <h1 className="text-[1em] font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500 opacity-0">
          KEWAJIBAN
        </h1>
        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
          <NeracaData
            title="KW"
            titleTotal="HUTANG BIAYA"
            type={2}
            group={16}
            start={startFirst}
            end={end}
          />
          <NeracaData
            title="KW"
            titleTotal="HUTANG LAIN-LAIN"
            type={2}
            group={17}
            start={startFirst}
            end={end}
          />
          <NeracaData
            title="KW"
            titleTotal="KEWAJIBAN JANGKA PANJANG"
            type={2}
            group={18}
            start={startFirst}
            end={end}
          />

          <NeracaDataSub
            title="KW"
            titleTotal="KW"
            type={2}
            group={4}
            start={startFirst}
            end={end}
          />
        </Suspense>

        <div className="h-2"></div>

        <Divider />
        <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
          ASET BERSIH
        </h2>
        {/* <Suspense fallback={<Loading section="AB" />}> */}
        {/* <ShowAB title="Kenaikan (Penurunan) Aset Bersih" /> */}
        {/* <NeracaDataAB title="KPAB" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={end} /> */}

        {/* <NeracaDataSub title="AB" titleTotal="AB" type={2} group={14} start={start} end={end} /> */}
        {/* <NeracaDataSubAB title="AB" titleTotal="Aset Bersih Akhir" /> */}
        {/* </Suspense> */}
        <NeracaDataAB title="AB" titleTotal="Aset Bersih" type={3} group={6} start={startFirst} end={end} />

        {/* Tampilkan RL / Kenaikan (Penurunan) Aset Bersih */}
        {/* <TotalRL title="RL" titleTotal="Kenaikan (Penurunan) Aset Bersih" /> */}
        <TotalKPAB isCurrent={true} titleTotal="Kenaikan (Penurunan) Aset Bersih" month={month} />

        {/* Saldo Awal */}
        <GetBalance1 title="sa" titleTotal="Saldo Awal" id={82} />

        {/* Hitung Penerimaan Persembahan */}
        <GetBalance title="P-P" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={end} />
        <GetBalance title="P-L" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={end} />
        <GetBalance title="B-OP" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={end} />
        <GetBalance title="B-SK" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={end} />
        <GetBalance title="B-BP" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={end} />

        {/* <NeracaDataSubAB title="AB" titleTotal="Aset Bersih Akhir" /> */}
        <TotalABAkhir isCurrent={true} titleTotal="Aset Bersih Akhir" />

        <div className="h-2"></div>

        <Divider />
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
}

export default Pasiva