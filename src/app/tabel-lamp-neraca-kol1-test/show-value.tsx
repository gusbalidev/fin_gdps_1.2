import React, { useMemo, useRef, useState } from 'react'
import { JustValueTotalBold, JustValueTotalNoLine } from '../n2new/title-value'
import toidr from '@/lib/toidr'
import useNeracaCol1Context from '@/context/neraca-col1-context';
import useSaldoAwalContext from '@/context/saldo-awal-context';

function ShowValue1() {
    const { totalSelisihABX } = useNeracaCol1Context();

        const x = useMemo(() => {
            return totalSelisihABX;
            }, []); // empty deps = run once

  return <JustValueTotalNoLine value={toidr(x)} />
}

function ShowValue2({value, value2}: {value: number, value2: number}) {
    // const { totalSelisihABX } = useNeracaCol1Context();
    // const { setTotalAsetAkhirX } = useNeracaCol1Context();
    // const { saldoAwal } = useSaldoAwalContext();
    const newValue = value;

    const x = useMemo(() => {
            return newValue;
            }, []); // empty deps = run once
    
    // setTotalAsetAkhirX(newValue)

  return (
      <>
        <JustValueTotalNoLine value={toidr(x)} />
        <JustValueTotalBold value={toidr(value2)} />
    </>
    )
}

function ShowABValue({value, value2}: {value: number, value2: number}) {
    const xRef = useRef<number | null>(null);
    // const xRef = useRef(9);
    // const { totalSelisihABX } = useNeracaCol1Context();

    // Store only the first generated value, never update again
    if (xRef.current === null) {
        xRef.current = value;
    }
    // xRef.current = value;

  return (
    <>
      <JustValueTotalNoLine value={toidr(xRef.current)} />
      <JustValueTotalBold value={toidr(value2)} />
    </>
      )
}


function ShowABValue2({value}: {value: number}) {
// export default function StaticComponent() {
  // const { totalSelisihABX } = useNeracaCol1Context();
  const staticValue = useRef(value);

  return <div className='text-right'>{staticValue.current}</div>;
}

function ShowX({value, value2}: {value: number, value2: number}) {
  const [x] = useState(value);

  return (
    <>
      <JustValueTotalNoLine value={toidr(x)} />
      <JustValueTotalBold value={toidr(value2)} />
    </>
      )

}

export { ShowValue1, ShowValue2, ShowABValue, ShowABValue2, ShowX };
