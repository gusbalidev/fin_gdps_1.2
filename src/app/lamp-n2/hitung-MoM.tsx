"use client"

import useAktivitasContext from "@/context/aktivitas-context";
import useNeracaTContext from "@/context/neraca-t-context";
import useAktivitasContextB from "@/context/aktivitas-contex-b";

import TulisTotal from './tulis-total';


const NeracaDataMoM = ({ row }: { row: number }) => {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalAsetAwalX, totalSelisihABX, totalAsetAkhirX } = useAktivitasContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasContext();

    // const { totalTerima1, totalTerima2B, totalBebanOpB, totalBeban2B, totalBeban3B } = useAktivitasContextB();
    const { totalAP, totalAPX } = useNeracaTContext();

    let calculatedValue = 0;
    switch (row) {
        case 1:
            calculatedValue = (totalTerima1 - totalTerima1X) / totalTerima1X;
            break;
        case 2:
            calculatedValue = (totalBebanOp - totalBebanOpX) / totalBebanOpX;
            break;
        case 3:
            calculatedValue = (totalBeban2 - totalBeban2X) / totalBeban2X;
            break;
        case 4:
            calculatedValue = (totalBeban3 - totalBeban3X) / totalBeban3X;
            break;
        case 5:
            calculatedValue = (totalTerima2 - totalTerima2X) / totalTerima2X;
            break;
        case 6:
            calculatedValue = (totalSelisihAB - totalSelisihABX) / totalSelisihABX;
            break;
        case 7:
            calculatedValue = (totalAsetAwal - totalAsetAwalX) / totalAsetAwalX;
            break;
        case 8:
            calculatedValue = (totalAsetAkhir - totalAsetAkhirX) / totalAsetAkhirX;
            break;
        case 9:
            calculatedValue = (totalAP - totalAPX) / totalAPX;
            break;
        default:
            calculatedValue = 0;
    }

    const formattedValue = (calculatedValue * 100).toFixed(2) + '%';

    return (
        <>
            <div className="w-full">
                <TulisTotal value={formattedValue} title={''} />
                {totalTerima1}
            </div>

        </>

    )
}

export default NeracaDataMoM;
