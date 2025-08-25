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
import GetSaldoAwal from "@/lib/get-SaldoAwal";

const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    const { totalAsetAwalX, totalAsetAkhirX, setTotalAsetAwalX, setTotalAsetAkhirX } = useAktivitasContext();
    const { totalTerima1XX, totalTerima2XX, totalBebanOpXX, totalBeban2XX, totalBeban3XX, totalSelisihABXX, setTotalSelisihABXX } = useAktivitasContext();
    const { totalSelisihABX, setTotalSelisihABX } = useAktivitasContext();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContext();

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

    // setTotalAsetAwalX(Math.abs(totalBalance));

    // Hitung Kenaikan/Penurunan AB
    const previousKPABXX = (totalTerima1XX + totalTerima2XX) - (totalBebanOpXX + totalBeban2XX + totalBeban3XX) ;
    const currentKPABX = (totalTerima1 + totalTerima2) - (totalBebanOp + totalBeban2 + totalBeban3);

    // Set KPAB to Context
    setTotalSelisihABXX(previousKPABXX);
    setTotalSelisihABX(currentKPABX);

    // Aset Awal & Akhir Final
    // const totalAsetAwalFinal = Math.abs(totalBalance) + saldoAwal + previousKPABXX - saldoAwal;
    // const totalAsetAwalFinal = Math.abs(totalBalance) + totalSelisihABXX + saldoAwal;
    // const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihABXX;

    // Simpan ke Variables Context
    setTotalAsetAwalX(Math.abs(totalBalance)+totalSelisihABXX+saldoAwal);
    setTotalAsetAkhirX(totalAsetAwalX + totalSelisihABX);

    
    //TEST Aset Awal, KPAB, Aset Akhir
    const x1 = Math.abs(totalBalance)+totalSelisihABXX+saldoAwal;
    const x2 = totalSelisihABX;
    const x3 = x1 + x2;
    
    setTotalAsetAkhirX(x3);
    if (month === 3) {
        setTotalAsetAwalX(Math.abs(totalBalance));
        setTotalSelisihABX(saldoAwal);
        setTotalAsetAkhirX(Math.abs(totalBalance)+saldoAwal);
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
                
                {/* CEK: <br />
                -- <br />
                {totalSelisihABX} */}


            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default