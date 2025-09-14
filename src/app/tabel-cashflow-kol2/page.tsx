"use client"

import Divider from "@/components/Divider";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSDataB from "./page-data";

import useAktivitasContext from "@/context/aktivitas-context";
import useNeracaSaldoContextB from "@/context/neraca-saldo-context-b";

import MonthYearSelectorB from "./month-year-selector-close-b";
import YearSelectorB from "./year-selector-close-b";


//
export default function TableCF2() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { periodType, subTitle } = useNeracaSaldoContext();
  const { periodType2, subTitle2 } = useNeracaSaldoContextB();
  const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB, setTotalSelisihAB } = useAktivitasContext();
  // const { periodType2, subTitle2 } = useNeracaSaldoContextB();
  const DataComponent = ShowNSDataB;

  // setPeriodeOn(false);

  return (

    <div className="w-full">
      <div className="text-right">

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

