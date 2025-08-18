import React, { Suspense } from 'react'

import toidr from "@/lib/toidr";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import NeracaData from './neraca-data-close';
import NeracaDataSub from './neraca-data-sub-close';
import NeracaDataAP from './neraca-data-ap-close';

// import { NeracaDataTotalAT } from '../neraca-t-dev/total-at';

//
function Aktiva() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
        useNeracaSaldoContext();
    const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } =
        useNeracaTContext();
    const startFirst = "2020-01-01";

  return (
    <>
              {/* <AktivaLancar /> */}
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="KAS"
                type={1}
                group={1}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="BANK"
                type={1}
                group={2}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="DEPOSITO"
                type={1}
                group={3}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="BON SEMENTARA BIDANG"
                type={1}
                group={4}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="BON SEMENTARA BAPEL"
                type={1}
                group={5}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="PIUTANG KARYAWAN"
                type={1}
                group={6}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="PIUTANG JEMAAT"
                type={1}
                group={7}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AKTIVA LANCAR"
                titleTotal="PIUTANG RELOKASI"
                type={1}
                group={8}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AL"
                titleTotal="BIAYA DIBAYAR DIMUKA"
                type={1}
                group={9}
                start={startFirst}
                end={end}
              />

              <NeracaDataSub
                title="AKTIVA LANCAR"
                titleTotal="Aktiva Lancar"
                type={1}
                group={1}
                start={startFirst}
                end={end}
              />

              {/* <AktivaTidakLancar /> */}
              <NeracaData
                title="ATL"
                titleTotal="TANAH DALAM PENYELESAIAN"
                type={1}
                group={15}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="ATL"
                titleTotal="GEDUNG DALAM PENYELESAIAN"
                type={1}
                group={16}
                start={startFirst}
                end={end}
              />

              <NeracaDataSub
                title="ATL"
                titleTotal="ATL"
                type={1}
                group={3}
                start={startFirst}
                end={end}
              />

              {/* <AktivaLancar /> */}
              <NeracaData
                title="AT"
                titleTotal="TANAH"
                type={1}
                group={10}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AT"
                titleTotal="BANGUNAN"
                type={1}
                group={11}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AT"
                titleTotal="KENDARAAN"
                type={1}
                group={12}
                start={startFirst}
                end={end}
              />
              <NeracaData
                title="AT"
                titleTotal="INVENTARIS"
                type={1}
                group={13}
                start={startFirst}
                end={end}
              />

              {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
              <NeracaDataTotalAT
                title="Aktiva Tetap"
                start={startFirst}
                end={end}
              />

              <NeracaDataAP
                title="AP"
                titleTotal="AKUMULASI PENYUSUTAN"
                start={startFirst}
                end={end}
              />
          
    </>
  )
}

export default Aktiva



const NeracaDataTotalAT = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1, totalAT2, totalAT3, totalAT4, totalAP, setTotalAT } = useNeracaTContext();
   
    const subAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
    setTotalAT(subAT);
    const newTotalBalance = toidr(subAT);


    return (
        <>
            {/* <Divider /> */}
            {/* <TulisTotalRp value={newTotalBalance} title={title} /> */}

        </>

    )
}


function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                {/* <p className='text-lg font-bold'>Total {title}:</p> */}
                <p> </p>
                <p className='text-[0.8em] font-bold text-blue-600 dark:text-orange-500'>{value}</p>
            </div>
        </>
    )
}