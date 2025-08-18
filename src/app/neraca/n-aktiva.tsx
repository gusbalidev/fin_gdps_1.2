import React, { Suspense } from 'react'

import toidr from "@/lib/toidr";
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

import { textStyles } from "@/lib/text-styles";
import { NeracaDataTotalAT, NeracaDataTotalATX } from './total-at';

//
function Aktiva() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
        useNeracaSaldoContext();
    const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } =
        useNeracaTContext();
    const startFirst = "2020-01-01";

  return (
    <>
        {/* AKTIVA - KIRI */}
        {/* --------------------------------------------- */}
        <div className="basis-4/5">
            <div className="flex justify-between">
              <h1 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
                AKTIVA
              </h1>
              <h1 className={`${textStyles.sizes.base} text-gray-400 pt-4 pb-1`}>
                {titlePrevMonthYear}
              </h1>
            </div>

            <Divider />
            <h2 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
              AKTIVA LANCAR
            </h2>
            <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
              {/* <AktivaLancar /> */}
              <NeracaDataX
                title="AL"
                titleTotal="KAS"
                type={1}
                group={1}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="BANK"
                type={1}
                group={2}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="DEPOSITO"
                type={1}
                group={3}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="BON SEMENTARA BIDANG"
                type={1}
                group={4}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="BON SEMENTARA BAPEL"
                type={1}
                group={5}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="PIUTANG KARYAWAN"
                type={1}
                group={6}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="PIUTANG JEMAAT"
                type={1}
                group={7}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="PIUTANG RELOKASI"
                type={1}
                group={8}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AL"
                titleTotal="BIAYA DIBAYAR DIMUKA"
                type={1}
                group={9}
                start={startFirst}
                end={endPrev}
              />

              <NeracaDataSubX
                title="AL"
                titleTotal="Aktiva Lancar"
                type={1}
                group={1}
                start={startFirst}
                end={endPrev}
              />
            </Suspense>

            <div className="h-2"></div>

            <Divider />
            {/* <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA TIDAK LANCAR</h2> */}
            <h2 className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500`}>
              AKTIVA TIDAK LANCAR
            </h2>

            <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
              {/* <AktivaLancar /> */}
              <NeracaDataX
                title="ATL"
                titleTotal="TANAH DALAM PENYELESAIAN"
                type={1}
                group={15}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="ATL"
                titleTotal="GEDUNG DALAM PENYELESAIAN"
                type={1}
                group={16}
                start={startFirst}
                end={endPrev}
              />

              <NeracaDataSubX
                title="ATL"
                titleTotal="Aktiva Tidak Lancar"
                type={1}
                group={3}
                start={startFirst}
                end={endPrev}
              />
            </Suspense>

            <div className="h-2"></div>

            <Divider />
            {/* <h2 className="text-[1em] font-bold pt-2 pb-1 text-blue-600 dark:text-orange-500"> */}
            <h2 className={`${textStyles.sizes.base} font-bold pt-2 pb-1 text-blue-600 dark:text-orange-500`}>
              AKTIVA TETAP
            </h2>
            <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
              {/* <AktivaLancar /> */}
              <NeracaDataX
                title="AT"
                titleTotal="TANAH"
                type={1}
                group={10}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AT"
                titleTotal="BANGUNAN"
                type={1}
                group={11}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AT"
                titleTotal="KENDARAAN"
                type={1}
                group={12}
                start={startFirst}
                end={endPrev}
              />
              <NeracaDataX
                title="AT"
                titleTotal="INVENTARIS"
                type={1}
                group={13}
                start={startFirst}
                end={endPrev}
              />

              {/* <NeracaDataSubX title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={endPrev} /> */}
              <NeracaDataTotalATX
                title="Aktiva Tetap"
                start={startFirst}
                end={end}
              />
            </Suspense>

            <div className="h-2"></div>

            {/* <Divider /> */}
            {/* <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">PENYUSUTAN</h2> */}
            <Suspense fallback={<Loading section="AP" />}>
              {/* <AkumPenyusutan /> */}
              {/* <NeracaDataX title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={endPrev} />
                            <NeracaDataSubX title="AP" titleTotal="Aktiva P" type={1} group={14} start={startFirst} end={endPrev} /> */}
              <NeracaDataAPX
                title="Akumulasi Penyusutan"
                titleTotal="AKUMULASI PENYUSUTAN"
                start={startFirst}
                end={endPrev}
              />
              <Divider />
            </Suspense>

            {/* TOTAL AKTIVA TETAP BERSIH X*/}
            <div className="flex justify-between p-0.5">
              {/* <p className='text-sm font-medium'>{title}</p> */}
              {/* <p className="text-lm font-bold text-blue-600 dark:text-orange-500"> */}
              <p className={`${textStyles.sizes.base} font-bold text-blue-600 dark:text-orange-500`}>
                Total Aktiva Tetap Bersih
              </p>
              <p className="text-m font-bold">{toidr(totalATX + totalAPX)}</p>
              {/* <p className='text-m'>{value}</p> */}
            </div>
          </div>

          <div className="basis-2/5">
            <h1 className="text-right text-[1em] pt-4 pb-1 text-blue-600 dark:text-orange-500">
              {titleMonthYear}
            </h1>
            <Divider />
            {/* <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA LANCAR</h2> */}
            <h2
              className={`${textStyles.sizes.base} font-bold pt-4 pb-1 text-blue-600 dark:text-orange-500 opacity-0`}
            >
              AKTIVA LANCAR
            </h2>

            <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
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
            </Suspense>

            <div className="h-2"></div>

            <Divider />
            <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
              AKTIVA-T-L
            </h2>
            <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
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
            </Suspense>

            <div className="h-2"></div>

            <Divider />
            <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">
              AKTIVA TETAP
            </h2>
            <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
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
            </Suspense>

            <div className="h-2"></div>

            {/* <Divider /> */}
            {/* <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">PENYUSUTAN</h2> */}
            <Suspense fallback={<Loading section="AP" />}>
              {/* <AkumPenyusutan /> */}
              {/* <NeracaData title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={end} /> */}
              <NeracaDataAP
                title="AP"
                titleTotal="AKUMULASI PENYUSUTAN"
                start={startFirst}
                end={end}
              />
              <Divider />
              {/* <NeracaDataSub title="AP" titleTotal="AP" type={1} group={14} start={startFirst} end={end} /> */}
            </Suspense>

            <div className="flex justify-between">
              <p></p>

              {/* TOTAL AKTIVA TETAP BERSIH */}
              <div className="flex justify-between p-0.5">
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className="text-m font-bold text-blue-600 dark:text-orange-500">
                  {toidr(totalAT + totalAP)}
                </p>
                {/* <p className='text-m'>{value}</p> */}
              </div>
            </div>

            <div className="h-3"></div>
          </div>
    </>
  )
}

export default Aktiva