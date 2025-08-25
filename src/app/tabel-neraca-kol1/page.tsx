"use client"

import Divider from "@/components/Divider";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSDataB from "./page-data";
import MonthYearSelector from "./month-year-selector-close";
import YearSelector from "./year-selector-close";


//
export default function TabelNeracaKol1() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { periodType, subTitle } = useNeracaSaldoContext();
  // const { periodType2, subTitle2 } = useNeracaSaldoContextB();
  const DataComponent = ShowNSDataB;

  // setPeriodeOn(false);

  return (

    <div className="w-full">
      <div>

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

