"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";

import SubtitlePeriode2 from "./subtitle-periode-2";

import KolomTitleAktiva from "./kolom-title-aktiva";
import KolomTitlePasiva from "./kolom-title-pasiva";
import BlokPeriode from "./blok-periode";
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import { TulisTitleBold, TulisTitleBoldHide } from "./titles";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import DataAktiva1 from "./data-aktiva-kolom1";
import DataAktiva2 from "./data-aktiva-kolom2";

interface PageProps {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({
    params,
    searchParams
}: PageProps) {

    const pageTitle = global.pageTitle.neraca;
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { setPeriodeOn } = useNeracaSaldoContextB();

    setPeriodeOn(false)

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">TEST {pageTitle.toUpperCase()}</h1>
                <SubtitlePeriode2 />
                <Divider />

                <BlokPeriode />

                <div className='flex justify-between mb-2 gap-1'>
                    <div className='flex justify-between w-1/2 bg-gray-100 dark:bg-gray-900 p-2'>
                        <div className='w-1/2'>
                            {/* <h2 className="text-start">Aktiva</h2> */}
                            <KolomTitleAktiva />
                        </div>

                        {/* Kolom 1 Aktiva */}
                        <div className='w-1/3'>
                            {/* <h2 className="text-end">Aktiva 1</h2> */}
                            <ShowAktivaData1 />
                        </div>

                        {/* Kolom 2 Aktiva CURRENT */}
                        <div className='w-1/3'>
                            {/* <h2 className="text-end">Aktiva 2</h2> */}
                            {/* Current Data AKTIVA */}
                            <ShowAktivaData2 />
                        </div>
                    </div>

                    <div className='flex justify-between w-1/2 bg-gray-100 dark:bg-gray-900 p-2'>
                        <div className='w-1/3'>
                            {/* <KolomTitlePasiva /> */}
                            {/* <h2 className="text-start">Pasiva</h2> */}
                            <KolomTitlePasiva />
                        </div>

                        {/* Kolom 1 Pasiva */}
                        <div className='w-1/3'>
                            {/* <h2 className="text-end">Kol 1 Pasiva</h2> */}
                        </div>

                        {/* Kolom 2 Pasiva CURRENT */}
                        <div className='w-1/3'>
                            {/* <h2 className="text-end">Kol 2 Pasiva</h2> */}
                        </div>

                    </div>

                </div>


                {/* Period Selector Component */}
                {/* {periodType === 'M' ? 
                    <MonthYearSelector DataComponent={DataComponent} /> : 
                    <YearSelector DataComponent={DataComponent} 
                />} */}


            </div>
        </PageLayout >


    )
}



//Kolom 1 Aktiva
function ShowAktivaData1() {
    const { periodType, subTitle, subTitle2, showComponent } = useNeracaSaldoContextB();
    const { titlePrevMonthYear } = useNeracaSaldoContext();
    const DataComponent = DataAktiva1;

    return (
        <>
            {/* Kalau tipe Periode 'M' tampilkan MonthYearSelector1, tampilkan YearSelector1 untuk tipe 'Y'*/}
            {/* {periodType === 'M' ?
                <MonthYearSelector2 /> : <YearSelector2 DataComponent={DataComponent} />} */}

            {/* Tampilkan Data, kalau status showComponent true */}

            <div className='text-end'>
                <p className='font-bold text-blue-600 dark:text-orange-500'>Saldo {titlePrevMonthYear}</p>
            </div>
            {showComponent ? <DataComponent /> : null}
        </>
    );
}

//Kolom 2 Aktiva
function ShowAktivaData2() {
    const { periodType, subTitle, showComponent } = useNeracaSaldoContext();
    const { titleMonthYear } = useNeracaSaldoContext();
    const DataComponent = DataAktiva2;

    return (
        <>
            {/* Kalau tipe Periode 'M' tampilkan MonthYearSelector1, tampilkan YearSelector1 untuk tipe 'Y'*/}
            {/* {periodType === 'M' ?
                <MonthYearSelector2 /> : <YearSelector2 DataComponent={DataComponent} />} */}

            {/* Tampilkan Data, kalau status showComponent true */}

            <div className='text-end'>
                <p className='font-bold text-blue-600 dark:text-orange-500'>Saldo {titleMonthYear}</p>
            </div>
            {showComponent ? <DataComponent /> : null}
        </>
    );
}