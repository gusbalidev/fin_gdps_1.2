"use client"

import global from "@/config.js";
import React, { Suspense, use } from 'react'

import PageLayout from '@/components/PageLayout'
import Divider from "@/components/Divider";

import KolomTitleNeraca from "./kolom-title-neraca";

import BlokPeriode from "./blok-periode";
import TabelNeracaKol1 from "../tabel-neraca-kol1/page";
import TabelNeraca from "../tabel-neraca-kol2/page";


//
export default function page() {

  // const { periodType } = useNeracaSaldoContext();
  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  const pageTitle = global.pageTitle.neraca;
  const pageTitle2 = 'Laporan Komparatif';


  return (
    <PageLayout header={header} footer={footer}>

      {/* TEST Component merapikan struktur - NEW */}
      {/* <BlokTop /> */}

      <h1 className="text-3xl font-bold dark:text-blue-500">{pageTitle.toUpperCase()}</h1>
      <h1 className="text-xl font-bold dark:text-blue-500">{pageTitle2.toUpperCase()}</h1>
      <Divider />
      <br />

      <div className='flex justify-between'>
        <div className='w-1/2'>

          <h1 className="text-xl font-bold dark:text-blue-500">Periode:</h1>
          <Divider />
          <BlokPeriode />

          <KolomTitleNeraca />

          {/* <KolomTitleAktivitas /> */}
          <br />
          {/* <KolomTitleAruskas /> */}
        </div>

        <div className="w-1/2">
          <div className='flex justify-between'>

            {/* Tabel1 */}
            <div className='w-1/2'>

              <TabelNeracaKol1 />

            </div>

            {/* Tabel 2 */}
            <div className='w-1/2'>

              {/* <TabelNeraca /> */}

            </div>

            {/* Tabel PoP */}
            {/* <div className='w-1/5'>
              <PoP />
            </div> */}

          </div>
        </div>
      </div>

    </PageLayout>
  )
}


