import React, { useMemo, useRef } from 'react'
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

export { ShowValue1, ShowValue2 };

