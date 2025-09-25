"use client"

import Divider from "@/components/Divider";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useAktivitasContext from "@/context/aktivitas-context";
import ShowNSDataB from "./page-data";
import MonthYearSelector from "./month-year-selector-close";
import YearSelector from "./year-selector-close";


//
export default function TitleLampNeraca() {
  const { periodType, subTitle } = useNeracaSaldoContext();
  const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB, setTotalSelisihAB } = useAktivitasContext();
  const DataComponent = ShowNSDataB;

  return (
    <div className="w-full">
      <div className="text-right">
        {/* <h1 className="text-xl font-bold dark:text-blue-500">{subTitle}</h1> */}
        {/* <Divider /> */}
        {/* {periodType === 'M' ?
          <MonthYearSelector DataComponent={DataComponent} />
          :
          <YearSelector DataComponent={DataComponent} />
        } */}
        <ShowNSDataB />
        <br />
      </div>
    </div>

  )
}
