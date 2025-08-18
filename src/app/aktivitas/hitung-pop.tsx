"use client"

import React from 'react'

import useNeracaTContext from "@/context/neraca-t-context";
import useAktivitasContextB from '@/context/aktivitas-contex-b';
import useAktivitasContext from '@/context/aktivitas-context';
import TulisTotal from './tulis-total';

export default function HitungPoP({ kol1Value, row }: { kol1Value: number, row: number }) {

    // const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalAsetAwalX, totalSelisihABX, totalAsetAkhirX } = useAktivitasContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContextB();

    // const { totalTerima1B, totalTerima2B, totalBebanOpB, totalBeban2B, totalBeban3B } = useAktivitasContextB();
    const { totalAP } = useNeracaTContext();

    // const calculatedValue = (kol1Value - totalTerima1) / totalTerima1;
    let calculatedValue = 0;

    // let kol = 0;

    switch (row) {
        case 1:
            calculatedValue = (totalTerima1 - kol1Value) / kol1Value;
            break;
        case 2:
            calculatedValue = (totalTerima2 - kol1Value) / kol1Value;
            break;
        case 3:
            calculatedValue = (totalBebanOp - kol1Value) / kol1Value;
            break;
        case 4:
            calculatedValue = (totalBeban2 - kol1Value) / kol1Value;
            break;
        case 5:
            calculatedValue = (totalBeban3 - kol1Value) / kol1Value;
            break;
        case 6:
            calculatedValue = (totalSelisihAB - kol1Value) / kol1Value;
            break;
        case 7:
            calculatedValue = (totalAsetAwal - kol1Value) / kol1Value;
            break;
        case 8:
            calculatedValue = (totalAsetAkhir - kol1Value) / kol1Value;
            break;
        case 9:
            calculatedValue = (totalAP - kol1Value) / kol1Value;
            break;
        default:
            calculatedValue = 0;
    }

    const formattedValue = (calculatedValue * 100).toFixed(2) + '%';
    // console.log(`Row ${row} - Kolom1 Value: ${kol1Value}, x: ${(kol1Value - totalBeban3) / totalBeban3}`);

    return (
        <>
            <div className="w-full">
                <TulisTotal value={formattedValue} title={''} />
                {/* {`Row ${row} - Kolom Value: ${kol1Value}, Calculated Value: ${formattedValue}`} */}
                {/* <TulisTotal value={totalSelisihAB.toString()} title={''} /> */}
                {/* {row.toString() + ' ' + formattedValue} */}
                {/* {kol1Value} */}
            </div>

        </>
    )
}

