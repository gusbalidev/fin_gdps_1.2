"use client"

import Divider from "@/components/Divider";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSDataB from "./page-data";
import MonthYearSelector from "./month-year-selector-close";
import YearSelector from "./year-selector-close";
import useAktivitasContext from "@/context/aktivitas-context";


//
export default function TabelNeracaKol1() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { periodType, subTitle } = useNeracaSaldoContext();
  const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB, setTotalSelisihAB } = useAktivitasContext();
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

