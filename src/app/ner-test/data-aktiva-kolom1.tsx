import React, { Suspense } from 'react'
import Divider from '@/components/Divider';
import toidr from '@/lib/toidr';
import Loading from './loading';

import { NeracaDataTotalAT } from './total-at';
import NeracaData1 from './neraca-data-kolom1'
import NeracaDataAP from './neraca-data-ap';
import NeracaDataSub from './neraca-data-sub';

import useNeracaSaldoContextB from '@/context/neraca-saldo-context-b';
import useNeracaTContextB from '@/context/neraca-t-context-b';

// Display Data Aktiva Kolom 1 / Previous Period
export default function DataAktiva1() {
    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContextB();
    const { totalAT, totalAP } = useNeracaTContextB();
    const idAL = "AL1"
    const idATL = "ATL1"
    const idAT = "AT1"
    const idAP = "AP1"

    return (
        <>
            <Suspense fallback={<Loading section={idAL} />}>
                {/* <AktivaLancar /> */}
                <NeracaData1 title={idAL} titleTotal="KAS" type={1} group={1} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="BANK" type={1} group={2} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="DEPOSITO" type={1} group={3} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAL} titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startPrev} end={endPrev} />
                <NeracaDataSub title={idAL} titleTotal="Aktiva Lancar" type={1} group={1} start={startPrev} end={endPrev} />
            </Suspense>

            {/* <div className="h-[1em]"></div> */}
            <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA-T-L</h2>
            <Suspense fallback={<Loading section={idATL} />}>
                {/* <AktivaTidakLancar /> */}
                <NeracaData1 title={idATL} titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startPrev} end={endPrev} />
                <NeracaData1 title={idATL} titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startPrev} end={endPrev} />
                <NeracaDataSub title={idATL} titleTotal="ATL" type={1} group={3} start={startPrev} end={endPrev} />
            </Suspense>

            {/* <div className="h-2"></div> */}
            {/* <Divider /> */}
            <h2 className="text-[1em] font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA TETAP</h2>
            <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                {/* <AktivaLancar /> */}
                <NeracaData1 title={idAT} titleTotal="TANAH" type={1} group={10} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAT} titleTotal="BANGUNAN" type={1} group={11} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAT} titleTotal="KENDARAAN" type={1} group={12} start={startPrev} end={endPrev} />
                <NeracaData1 title={idAT} titleTotal="INVENTARIS" type={1} group={13} start={startPrev} end={endPrev} />
                {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
                <NeracaDataTotalAT title="Aktiva Tetap" start={startPrev} end={endPrev} />
            </Suspense>

            {/* <div className="h-2"></div> */}
            {/* <Divider /> */}
            {/* <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">PENYUSUTAN</h2> */}
            <Suspense fallback={<Loading section="AP" />}>
                {/* <AkumPenyusutan /> */}
                {/* <NeracaData title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={end} /> */}
                <NeracaDataAP title={idAP} titleTotal="AKUMULASI PENYUSUTAN" start={startPrev} end={endPrev} />
                <Divider />
                {/* <NeracaDataSub title="AP" titleTotal="AP" type={1} group={14} start={startFirst} end={end} /> */}
            </Suspense>

            <div className="flex justify-between">
                <p></p>
                {/* TOTAL AKTIVA TETAP BERSIH */}
                <div className="flex justify-between p-0.5">
                    {/* <p className='text-sm font-medium'>{title}</p> */}
                    <p></p>
                    <p className="text-m font-bold text-blue-600 dark:text-orange-500"> {toidr(totalAT + totalAP)}</p>
                    {/* <p className='text-m'>{value}</p> */}
                </div>
            </div>

        </>
    )
};