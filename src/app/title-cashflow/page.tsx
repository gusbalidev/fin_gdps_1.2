"use client"

import React, { Suspense } from 'react'
// import ShowCFData from './page-data'

import Divider from '@/components/Divider'
import useNeracaSaldoContext from '@/context/neraca-saldo-context';

// import WidgetInfoTotal from '../cf2/widget-info-total';
import Loading from '../cf2/loading'
import CashFlowDataTitle from './cashflow-data'
import CashFlowData2Title from './cashflow-data2';
import WidgetInfoTotal from './widget-info-total';

export default function Page() {
    // const { subTitle } = useNeracaSaldoContext();
    const { start, end, periodeOn } = useNeracaSaldoContext();

    return (
        <>
            {/* <div className="w-full">
                <ShowCFData />
            </div> */}

            {/* PENERIMAAN */}
            <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENERIMAAN</h1>
            <Divider />

            <Suspense fallback={<Loading section="Penerimaan Persembahan" />}>
                {/* <RugiLabaData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} /> */}
                <CashFlowDataTitle title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
            </Suspense>

            <Suspense fallback={<Loading section="Penerimaan Lain-lain" />}>
                <CashFlowData2Title title="Penerimaan Lain-lain" titleTotal="Penerimaan Lain-lain" type={4} group2={9} start={start} end={end} />
            </Suspense>


            {/* BEBAN / BIAYA2 */}
            <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENGELUARAN</h1>
            <Divider />

            <Suspense fallback={<Loading section="Biaya Operasional Gereja" />}>
                <CashFlowDataTitle title="Biaya Operasional Gereja" titleTotal="Biaya Operasional Gereja" type={5} group2={10} start={start} end={end} />
            </Suspense>

            <Suspense fallback={<Loading section="Biaya Sekretariat" />}>
                <CashFlowDataTitle title="Biaya Sekretariat" titleTotal="Biaya Sekretariat" type={5} group2={11} start={start} end={end} />
            </Suspense>

            <Suspense fallback={<Loading section="Biaya Bidang/Bapel" />}>
                <CashFlowData2Title title="Biaya Bidang/Bapel" titleTotal="Biaya Bidang/Bapel" type={5} group2={12} start={start} end={end} />
            </Suspense>

            <br />
            <WidgetInfoTotal />
        </>
    )
}

