import React from 'react'


import GraphBox from './GraphBox';
import { ChartCashflow } from './chart-cashflow';
import { ChartBiaya } from './chart-Biaya';
import { ChartBiaya2 } from './chart-Biaya-2';

export default function GraphPage() {
  return (
    <>
      {/* <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
        <div className="flex gap-4 flex-wrap">
          <GraphBox graphComp={<ChartCashflow/>} />
          <GraphBox graphComp={<ChartBiaya2 />} />
        </div>
      </div> */}

      {/* <div className="flex flex-row m:flex-col gap-4"> */}
      <div className="flex flex-1 flex-row gap-4 pt-4 pb-5">

          <div className="w-1/2"><GraphBox graphComp={<ChartCashflow/>} /></div>
          <div className="w-1/2"><GraphBox graphComp={<ChartBiaya2 />} /></div>
          {/* <div className="w-1/3"><GraphBox graphComp={<ChartBiaya />} /></div> */}

      </div>
    </>
  )
}
