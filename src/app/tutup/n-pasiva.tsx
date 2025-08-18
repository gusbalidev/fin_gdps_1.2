import React, { Suspense } from 'react'

import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import NeracaData from './neraca-data-close';
import NeracaDataSub from './neraca-data-sub-close';

import { textStyles } from "@/lib/text-styles";
import NeracaDataAB from './neraca-data-AB-close';

import GetBalance from "@/lib/get-balance";
import GetBalanceX from "@/lib/get-balance-x";
import GetBalance1 from "@/lib/get-balance1";
import GetBalance1X from '@/lib/get-balance1-x';

//
function Pasiva() {

  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
          useNeracaSaldoContext();
  const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } =
          useNeracaTContext();
  const startFirst = "2020-01-01";

  return (
    <>
      {/* PASIVA - KANAN */}
        {/* --------------------------------------------- */}
        
            {/* Hitung Saldo Awal */}
            <GetBalance1X title="sa-x" titleTotal="Saldo Awal" id={82} />

            {/* Hitung Penerimaan Persembahan & Biaya*/}
            <GetBalanceX title="P-PX" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={endPrev} />
            <GetBalanceX title="P-LX" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={endPrev} />
            <GetBalanceX title="B-OPX" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={endPrev} />
            <GetBalanceX title="B-SKX" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={endPrev} />
            <GetBalanceX title="B-BPX" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={endPrev} />

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
        
            <NeracaDataAB title="AB" titleTotal="Aset Bersih" type={3} group={6} start={startFirst} end={end}/>

            {/* Saldo Awal */}
            <GetBalance1 title="sa" titleTotal="Saldo Awal" id={82} />

            {/* Hitung Penerimaan Persembahan */}
            <GetBalance title="P-P" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startFirst} end={end} />
            <GetBalance title="P-L" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startFirst} end={end} />
            <GetBalance title="B-OP" titleTotal="Beban Operasional" type={5} group2={10} start={startFirst} end={end} />
            <GetBalance title="B-SK" titleTotal="Beban Sekretariat" type={5} group2={11} start={startFirst} end={end} />
            <GetBalance title="B-BP" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startFirst} end={end} />

    
    </>
  )
}

export default Pasiva