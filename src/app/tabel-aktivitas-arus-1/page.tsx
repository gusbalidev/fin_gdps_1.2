
"use client"

import Divider from "@/components/Divider";

import MonthYearSelector from "@/components/widget/month-year-selector-close";
import YearSelector from "@/components/widget/year-selector-close";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSData from "./page-data";


export default function Page() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { periodType, setPeriodType, subTitle } = useNeracaSaldoContext();
  const DataComponent = ShowNSData;

  // setPeriodeOn(false);

  return (

    <div className="w-full">
      <div>
        {/* <h1 className="text-xl font-bold dark:text-blue-500">Aktivitas {subTitle}</h1> */}
        {/* <br /> */}
        <h1 className="text-xl font-bold dark:text-blue-500">{subTitle}</h1>
        <Divider />
        {periodType === 'M' ?
          <MonthYearSelector DataComponent={DataComponent} />
          :
          <YearSelector DataComponent={DataComponent} />
        }
        <br />
      </div>
    </div>

  )
}

