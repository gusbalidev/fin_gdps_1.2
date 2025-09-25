"use client"

import React from 'react'

import useNeracaTContext from "@/context/neraca-t-context";
import useAktivitasContextB from '@/context/aktivitas-contex-b';
import useAktivitasContext from '@/context/aktivitas-context';
import TulisTotal from './tulis-total';
import useNeracaTContextB from '@/context/neraca-t-context-b';

export default function HitungPoPAruskas({ kolValue, row }: { kolValue: number, row: number }) {

    // const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalAsetAwalX, totalSelisihABX, totalAsetAkhirX } = useAktivitasContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContextB();

    // const { totalTerima1B, totalTerima2B, totalBebanOpB, totalBeban2B, totalBeban3B } = useAktivitasContextB();
    const { totalAP } = useNeracaTContextB();

    // const calculatedValue = (kol1Value - totalTerima1) / totalTerima1;
    let calculatedValue = 0;

    const totalTerima = totalTerima1 + totalTerima2;
    const totalBeban = totalBebanOp + totalBeban2 + totalBeban3;

    const totalSurplus = totalTerima - totalBeban;

    const total5 = totalSurplus- totalAP;

    // let kol = 0;

    switch (row) {
        case 1:
            calculatedValue = (totalTerima - kolValue) / (kolValue);
            break;
        case 2:
            calculatedValue = (totalBeban - kolValue) / kolValue;
            break;
        case 3:
            calculatedValue = (totalSelisihAB - kolValue) / kolValue;
            break;
        case 4:
            calculatedValue = (totalAP - kolValue) / kolValue;
            break;
        case 5:
            calculatedValue = (total5 - kolValue) / kolValue;
            break;

        default:
            calculatedValue = 0;
    }

    const formattedValue = (calculatedValue * 100).toFixed(2) + '%';
    console.log(`Row ${row} - Kolom Value: ${totalSelisihAB}`);

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

