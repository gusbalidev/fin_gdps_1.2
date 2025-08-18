"use client"

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button';

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import MonthYearSelector from "./widget-monthly";
import YearSelector from "./widget-yearly";
import NeracaDataTotalDK from './neraca-data-total-dk';
import Loading from './loading';


export default function Page() {
    const [periodType, setPeriodType] = useState<'monthly' | 'yearly'>('monthly');    

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const type = searchParams.get('type');
    const group = searchParams.get('group');

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { subTitle, start, end, setPeriodeOn, setStartContext } = useNeracaSaldoContext();
    setStartContext('2020-01-01');

    setPeriodeOn(false);

    return (
        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">NERACA SALDO</h1>

                <WidgetSubtitlePeriode />

                <Divider />

                {/* <MonthYearSelector title={title || ''} type={type ? parseInt(type) : 0} group={group ? parseInt(group) : 0} /> */}
                <div className="flex gap-2 mb-4 py-2">
                    <Button 
                        variant={periodType === 'monthly' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('monthly')}
                    >
                        Bulanan
                    </Button>
                    <Button 
                        variant={periodType === 'yearly' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('yearly')}
                    >
                        Tahunan
                    </Button>
                </div>

                {/* Period Selector Component */}
                {periodType === 'monthly' ? 
                    <MonthYearSelector title={title || ''} type={type ? parseInt(type) : 0} group={group ? parseInt(group) : 0} />
                : 
                    <YearSelector />}

                <Suspense fallback={<Loading section="total" />}>
                    <NeracaDataTotalDK start={start} end={end} />
                </Suspense>


            </div>
        </PageLayout >
    )
}
