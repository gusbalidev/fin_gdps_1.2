"use client"

import React from 'react'

import { useCfStore } from './cf-store'
import toidr from '@/lib/toidr'
import useNeracaSaldoContext from '@/context/neraca-saldo-context'
import Divider from '@/components/Divider'

function WidgetInfoTotal() {

  const cfStore = useCfStore()
  const { periodType, subTitle } = useNeracaSaldoContext();

  return (
    <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800">
      {/* Rangkuman Neraca */}
      <h1 className="text-xl font-bold pt-4 pb-2">{subTitle}</h1>
      {/* {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>} */}

      {/* <Button onClick={() => cfStore.setTotalCf(cfStore.totalCf+100)}>SET TOTAL TEST</Button> */}

      {/* <TulisTotalRp value={toidr(cfStore.totalCf)} title="Total CF" /> */}

      <TulisTotalRp value={toidr(cfStore.totalTerima1 + cfStore.totalTerima2)} title="Penerimaan" />
      <TulisTotalRp value={toidr(cfStore.totalKeluar1 + cfStore.totalKeluar2 + cfStore.totalKeluar3)} title="Pengeluaran" />
      <TulisTotalRp value={toidr((cfStore.totalTerima1 + cfStore.totalTerima2) - (cfStore.totalKeluar1 + cfStore.totalKeluar2 + cfStore.totalKeluar3))} title="Surplus/Defisit" />

      {/* <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" /> */}
    </div>
  )
}

export default WidgetInfoTotal


function TulisTotalRp({ value, title }: { value: string, title: string }) {
  return (
    <>
      <Divider />
      <div className='flex justify-end py-2'>
        {/* <p className='text-md font-bold'>{title}:</p> */}
        <p className='text- font-bold'>{value}</p>
      </div>
    </>
  )
}