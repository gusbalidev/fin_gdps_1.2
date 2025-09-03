import React from 'react'


import GraphBox from './GraphBox';
import { ChartCashflow } from './chart-cashflow';

export default function GraphPage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <GraphBox graphComp={<ChartCashflow/>} />
        </div>

      </div>
    </>
  )
}
