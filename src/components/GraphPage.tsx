import React from 'react'


import GraphBox from './GraphBox';
import { ChartCashflow } from './chart-cashflow';
import { ChartBiaya } from './chart-Biaya';

export default function GraphPage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <GraphBox graphComp={<ChartCashflow/>} />
          <GraphBox graphComp={<ChartBiaya />} />
        </div>


      </div>
    </>
  )
}
