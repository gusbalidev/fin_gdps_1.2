"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import SubTotalAktivitas from "./total-aktivitas";
import useAktivitasContextB from "@/context/aktivitas-contex-b";
import useSaldoAwalContextB from "@/context/saldo-awal-context-b";
import { TulisRekap, TulisRekapBold } from "../neraca/TulisRekap";
import { JustValueTotal, JustValueTotalBold, JustValueTotalNoLine } from "../neraca2/title-value";
import useAktivitasContext from "@/context/aktivitas-context";
import useSaldoAwalContext from "@/context/saldo-awal-context";

const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    // const { setTotalAsetAwal, setTotalAsetAkhir, totalSelisihAB, totalAsetAwal, totalAsetAkhir } = useAktivitasContextB();
    const { setTotalAsetAwalX, setTotalAsetAkhirX, totalAsetAwalX, totalAsetAkhirX, } = useAktivitasContext();
    const { totalTerima1XX, totalTerima2XX, totalBebanOpXX, totalBeban2XX, totalBeban3XX, setTotalSelisihABXX, totalSelisihABXX } = useAktivitasContext();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, setTotalSelisihABX } = useAktivitasContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB, setTotalSelisihAB } = useAktivitasContext();
    const { saldoAwal } = useSaldoAwalContextB();

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

    // setTotalAsetAwalX(Math.abs(totalBalance));

    // Hitung Kenaikan/Penurunan AB
    const previousKPABXX = (totalTerima1XX + totalTerima2XX) - (totalBebanOpXX + totalBeban2XX + totalBeban3XX) ;
    const previousKPABX = (totalTerima1X + totalTerima2X) - (totalBebanOpX + totalBeban2X + totalBeban3X);

    // Set KPAB to Context
    setTotalSelisihABXX(previousKPABXX);
    setTotalSelisihABX(previousKPABX);

    // Aset Awal & Akhir Final
    // const totalAsetAwalFinal = Math.abs(totalBalance) + saldoAwal + previousKPABXX - saldoAwal;
    // const totalAsetAwalFinal = Math.abs(totalBalance) + totalSelisihABXX + saldoAwal;
    // const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihABXX;

    // Simpan ke Variables Context
    setTotalAsetAwalX(Math.abs(totalBalance)+totalSelisihABXX+saldoAwal);
    setTotalAsetAkhirX(totalAsetAwalX + totalSelisihAB);

    
    //TEST Aset Awal, KPAB, Aset Akhir
    const x1 = Math.abs(totalBalance)+totalSelisihABXX+saldoAwal;
    const x2 = totalSelisihABX;
    const x3 = x1 + x2;
    
    setTotalAsetAkhirX(x3);
    if (month === 3) {
        setTotalSelisihABX(saldoAwal);
        setTotalAsetAwalX(Math.abs(totalBalance));
        setTotalAsetAkhirX(Math.abs(totalBalance)+x2);
    } 



    return (
        <>
            <div className="w-full">

                <JustValueTotalNoLine value={toidr(totalAsetAwalX)} />
                {/* {
                    (month === 3 ?
                        <JustValueTotalNoLine value={toidr(Math.abs(totalBalance))} />
                        :
                        <JustValueTotalNoLine value={toidr(x1)} />
                    )
                } */}

                <JustValueTotalNoLine value={toidr(totalSelisihABX)} />
                {/* {
                    (month === 3 ?
                        <JustValueTotalNoLine value={toidr(saldoAwal)} />
                        :
                        <JustValueTotalNoLine value={toidr(totalSelisihAB)} />
                    )
                } */}


                <JustValueTotalBold value={toidr(totalAsetAkhirX)} />
                {/* {
                    (month === 3 ?
                        <JustValueTotalBold value={toidr(Math.abs(totalBalance)+x2)} />
                        :
                        <JustValueTotalBold value={toidr(x3)} />
                    )
                } */}

                
                <br />
                {/* 
                CEK: <br />
                -- <br />
                SaldoAwal: {saldoAwal} <br />
                tot aset awal: {Math.abs(totalBalance)} <br />
                -- <br />
                terima XX <br />
                {totalTerima1XX + totalTerima2XX} <br />
                beban XX<br />
                {totalBebanOpXX + totalBeban2XX + totalBeban3XX} <br />
                -- <br />
                selisih AB prev <br />
                {totalSelisihABXX} <br />
                -- <br />
                selisih AB curr: <br />
                {totalSelisihABX}

                <br />
                Total Terima: 
                {totalTerima1X+totalTerima2X} */}



            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default