import MonthYearSelector2 from "./month-year-selector-2";
import YearSelector from "@/components/widget/year-selector-close-b";

import ShowNSData from "../tabel-aktivitas-arus-2/page-data";
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";

export default function BlokHeaderKolom2() {
  
  const { periodType } = useNeracaSaldoContextB();
  const DataComponent = ShowNSData;

  return (
    <div className="w-full items-center">
      {/* <Button variant="outline" className="w-full">TEST 1</Button> */}
      {/* <Button variant="outline" className="w-full">TEST 2</Button> */}
      {/* <h1 className="text-xl font-bold dark:text-blue-500">{subTitle}</h1> */}
      {periodType === 'M' ?
          <MonthYearSelector2 />
          :
          <YearSelector DataComponent={DataComponent} />
        }
    </div>
  )
}