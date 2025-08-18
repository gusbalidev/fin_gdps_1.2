"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";

import SubtitlePeriode from "@/components/widget/subtitle-periode";
import MonthYearSelector from "@/components/widget/month-year-selector";
import YearSelector from "@/components/widget/year-selector";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSData from "./page-data";

interface PageProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ 
    params,
    searchParams
}: PageProps) {

    const pageTitle = global.pageTitle.neraca;
    const DataComponent = ShowNSData;
    const mText = global.pageInfo.mText;
    const yText = global.pageInfo.yText;

    const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { setPeriodeOn } = useNeracaSaldoContext();

    setPeriodeOn(false)

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">TEST {pageTitle.toUpperCase()} NEW</h1>
                {/* <Divider /> */}
                <SubtitlePeriode />
                <Divider />

                {/* Period Type Selection Buttons */}
                <div className="flex gap-2 mb-4 py-2">
                    <Button 
                        variant={periodType === 'M' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('M')}
                    >
                        {mText}
                    </Button>
                    <Button 
                        variant={periodType === 'Y' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('Y')}
                    >
                        {yText}
                    </Button>
                </div>

                {/* Period Selector Component */}
                {periodType === 'M' ? 
                    <MonthYearSelector DataComponent={DataComponent} /> : 
                    <YearSelector DataComponent={DataComponent} 
                />}


            </div>
        </PageLayout >


    )
}

