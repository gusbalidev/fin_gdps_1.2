import MonthYearSelector1 from "./month-year-selector-1";
import YearSelector from "@/components/widget/year-selector-close";

import ShowNSData from "../tabel-aktivitas-arus-1/page-data";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

export default function BlokHeaderKolom1() {
  
  const { periodType } = useNeracaSaldoContext();
  const DataComponent = ShowNSData;

  return (
    <div className="w-full items-center">
      {/* <Button variant="outline" className="w-full">TEST 1</Button> */}
      {/* <Button variant="outline" className="w-full">TEST 2</Button> */}
      {/* <h1 className="text-xl font-bold dark:text-blue-500">{subTitle}</h1> */}
      {periodType === 'M' ?
          <MonthYearSelector1 />
          :
          <YearSelector DataComponent={DataComponent} />
        }
    </div>
  )
}