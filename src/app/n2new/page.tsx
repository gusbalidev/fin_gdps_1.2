"use client"

import React from 'react'

import global from "@/config.js";
import PageLayout from '@/components/PageLayout'
import Divider from "@/components/Divider";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import KolomTitleNeraca from "./kolom-title-neraca";
import BlokPeriode from "./blok-periode";
import TabelNeracaKol1 from "../tabel-neraca-kol1/page";
import TabelNeraca from "../tabel-neraca-kol2/page";


//
export default function Page() {
  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  const pageTitle = global.pageTitle.neraca;
  const pageTitle2 = 'Laporan Komparatif';

  const { isColumn1Ready } = useNeracaSaldoContext();

  return (
    <PageLayout header={header} footer={footer}>
      <h1 className="text-3xl font-bold dark:text-blue-500">{pageTitle.toUpperCase()}</h1>
      <h1 className="text-xl font-bold dark:text-blue-500">{pageTitle2.toUpperCase()}</h1>
      <Divider />
      <br />
      <div className='flex justify-between'>
        <div className='w-1/3'>
          <h1 className="text-xl font-bold dark:text-blue-500">Periode:</h1>
          <Divider />
          <BlokPeriode />
          <KolomTitleNeraca />
          <br />        
        </div>

        <div className="w-2/3">
          <div className='flex justify-between'>
            {/* Tabel1 */}
            <div className='w-1/2'>
              <TabelNeracaKol1 />
            </div>

            {/* Tabel 2 */}
            <div className='w-1/2'>
              {isColumn1Ready === true ?
                <TabelNeraca />
                :
                null
              }
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


