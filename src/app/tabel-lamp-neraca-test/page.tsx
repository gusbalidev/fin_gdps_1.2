"use client"

import Divider from "@/components/Divider";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSDataB from "./page-data";
import MonthYearSelectorB from "./month-year-selector-close-b";
import YearSelectorB from "./year-selector-close-b";


//
export default function TabelLampNeracaKol2Test() {
  const { periodType, subTitle } = useNeracaSaldoContext();
  const DataComponent = ShowNSDataB;

  return (
    <div className="w-full">
      <div className="text-right">
        <h1 className="text-xl font-bold dark:text-blue-500">{subTitle}</h1>
        <Divider />
        {periodType === 'M' ?
          <MonthYearSelectorB DataComponent={DataComponent} />
          :
          <YearSelectorB DataComponent={DataComponent} />
        }
        <br />
      </div>
    </div>

  )
}
