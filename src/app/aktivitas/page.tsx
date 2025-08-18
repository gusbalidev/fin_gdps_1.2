
import global from "@/config.js";
import React from 'react'

import PageLayout from '@/components/PageLayout'
import Divider from "@/components/Divider";

import KolomTitleAktivitas from "./kolom-title-aktivitas";
import KolomTitleAruskas from "./kolom-title-aruskas";

import AktivitasArus1 from '../tabel-aktivitas-arus-1/page'
import AktivitasArus2 from "../tabel-aktivitas-arus-2/page";
import PoP from "./pop";
import BlokTop from "./blok-top";

//
export default function page() {

  // const { periodType } = useNeracaSaldoContext();
  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  const pageTitle = global.pageTitle.activity;
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
        <div className='w-1/3'>
          <p className="my-[1.54em]" />

          <KolomTitleAktivitas />
          <br />
          <KolomTitleAruskas />
        </div>

        <div className="w-2/3">
          <div className='flex justify-between'>

            {/* Tabel1 */}
            <div className='w-2/5'>
              <AktivitasArus1 />
            </div>

            {/* Tabel 2 */}
            <div className='w-2/5'>
              <AktivitasArus2 />
            </div>

            {/* Tabel 2 */}
            <div className='w-1/5'>
              {/* <AktivitasArus2 /> */}
              <PoP />
            </div>

          </div>
        </div>
      </div>

    </PageLayout>
  )
}

