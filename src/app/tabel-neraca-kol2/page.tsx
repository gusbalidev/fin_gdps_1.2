
"use client"

import Divider from "@/components/Divider";

import MonthYearSelectorB from "./month-year-selector-close-b";
import YearSelectorB from "./year-selector-close-b";

import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSDataB from "./page-data";


//
export default function TabelNeraca() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { periodType, subTitle } = useNeracaSaldoContext();
  const { periodType2, subTitle2 } = useNeracaSaldoContextB();
  const DataComponent = ShowNSDataB;

  // setPeriodeOn(false);

  return (

    <div className="w-full">
      <div>

        {/* <br /> */}
        <h1 className="text-xl font-bold dark:text-blue-500">{subTitle2}</h1>
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

