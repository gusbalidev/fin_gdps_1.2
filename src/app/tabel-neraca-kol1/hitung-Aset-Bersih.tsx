"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import { JustValueTotal, JustValueTotalBold, JustValueTotalNoLine } from "../neraca2/title-value";
import useAktivitasContext from "@/context/aktivitas-context";
import useSaldoAwalContext from "@/context/saldo-awal-context";
import GetSaldoAwal from "@/lib/get-SaldoAwal";
import useAktivitasContextB from "@/context/aktivitas-contex-b";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaCol1Context from "@/context/neraca-col1-context";
import { ShowValue1, ShowValue2, ShowValueTest } from "./show-value";

//
const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    // const {selisihAB1, setSelisihAB1} = useNeracaSaldoContext();
    
    const { totalAsetAwalX, totalAsetAkhirX, setTotalAsetAwalX, setTotalAsetAkhirX } = useAktivitasContext();
    const { totalTerima1XX, totalTerima2XX, totalBebanOpXX, totalBeban2XX, totalBeban3XX, totalSelisihABXX, setTotalSelisihABXX } = useAktivitasContext();
    // const { totalSelisihABX } = useAktivitasContext();
    // const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContext();
    // const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContextB();

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, setTotalSelisihABX } = useNeracaCol1Context();
    
    
    GetSaldoAwal({ title: "Saldo Awal", coaId: 82 });
    
    const { saldoAwal } = useSaldoAwalContext();
    
    // Fetch data 
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group2],
        queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        // queryFn: () => fetch(`/api/ns-nom?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }),
    });
    
    if (isLoading) return <div>{global.msgText.wait}</div>;
    if (error) return <div>{global.msgText.error}: {error.message}</div>;
    if (!result) return <div>{global.msgText.noData}</div>;

    //Total & data for table
    const { accounts: data, totalBalance } = result;

    // Hitung Kenaikan/Penurunan AB
    const previousKPABXX = (totalTerima1XX + totalTerima2XX) - (totalBebanOpXX + totalBeban2XX + totalBeban3XX) ;
    // const currentKPABX = (totalTerima1 + totalTerima2) - (totalBebanOp + totalBeban2 + totalBeban3);
    const currentKPABXnew = (totalTerima1X + totalTerima2X) - (totalBebanOpX + totalBeban2X + totalBeban3X);
    
    // Aset Awal & Akhir Final
    // const totalAsetAwalFinal = Math.abs(totalBalance) + saldoAwal + previousKPABXX - saldoAwal;
    // const totalAsetAwalFinal = Math.abs(totalBalance) + totalSelisihABXX + saldoAwal;
    // const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihABXX;
       
    // Aset Awal, KPAB, Aset Akhir
    const x1 = Math.abs(totalBalance)+totalSelisihABXX+saldoAwal;
    // const x2 = currentKPABX;
    const x2 = currentKPABXnew;
    const x3 = x1 + x2;
    const x4 = previousKPABXX;

    const valuesAB = {
        awal: x1,
        selisih: x2,
        akhir: x3
    };

    Object.freeze(valuesAB);
    
    // Simpan ke Variables Context
    setTotalAsetAwalX(valuesAB.awal);
    setTotalSelisihABX(valuesAB.selisih);
    setTotalAsetAkhirX(valuesAB.akhir);
    setTotalSelisihABXX(x4);
    
    if (month === 3) {
        setTotalAsetAwalX(Math.abs(totalBalance));
        setTotalSelisihABX(saldoAwal);
        setTotalAsetAkhirX(Math.abs(totalBalance)+saldoAwal);
    } 

    // let fixTemp = totalSelisihABX;
    
    return (
        <>
            <div className="w-full">

                {/* totalTerima1: {totalTerima1} <br />
                totalTerima1X: {totalTerima1X} <br />
                x2: {x2} <br /> */}

                <JustValueTotalNoLine value={toidr(totalAsetAwalX)} />
                {/* <JustValueTotalNoLine value={toidr(totalSelisihABX)} /> */}

                {/* {totalSelisihABX} */}
                {
                    month === 3 ?
                    <JustValueTotalNoLine value={toidr(saldoAwal)} />
                    :
                    // <ShowValue1 />
                    <ShowValue2 value={valuesAB.selisih} value2={totalAsetAkhirX} />

                }

                {
                    month === 3 ?
                    <JustValueTotalBold value={toidr(totalAsetAkhirX)} />
                    :
                    null
                }

                <br />
                {/* --- <br /> */}
                {/* {totalSelisihABX} */}
                {/* <ShowValueTest value={valuesAB.selisih} /> */}

                {/*                 
                <br />
                {valuesAB.awal} <br />
                {valuesAB.selisih} <br />
                {valuesAB.akhir} <br />
                ---- <br />
                {x1} <br />
                {x2} <br />
                {x3} <br />
                ---- <br />
                {previousKPABXX} <br />
                bulan: {month}
                 */}

            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default


