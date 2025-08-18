import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import global from "@/config.js";

import DataAktiva2 from './data-aktiva-kolom2';
import MonthYearSelector1 from './month-year-selector-1';
import YearSelector1 from './year-selector-close-1';
import MonthYearSelector2 from './month-year-selector-2';
import YearSelector2 from './year-selector-close-2';
import useNeracaSaldoContextB from '@/context/neraca-saldo-context-b';
import DataAktiva1 from './data-aktiva-kolom1';


// Pilih Periode Aktif dan Komparasi
function BlokPeriode() {

  const mText = global.pageInfo.mText;
  const yText = global.pageInfo.yText;
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');

  const { periodType, setPeriodType } = useNeracaSaldoContextB();
  const DataComponent = DataAktiva2;
  const DataComponent1 = DataAktiva1;

  return (
    <>
      {/* Period Type Selection Buttons */}
      <div className="flex gap-4 mb-4 py-2 items-center">

        <div className='flex gap-2'>

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

        <div className="flex items-center gap-2">

          <h2>Periode - Aktif: </h2>
          {periodType === 'M' ? <MonthYearSelector2 /> : <YearSelector2 DataComponent={DataComponent} />}

          <h2>Komparasi: </h2>
          {periodType === 'M' ? <MonthYearSelector1 /> : <YearSelector1 DataComponent={DataComponent} />}


        </div>

      </div>
    </>
  )
}

export default BlokPeriode