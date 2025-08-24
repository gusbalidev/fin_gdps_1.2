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
    const { setTotalAsetAwalX, setTotalAsetAkhirX, totalSelisihABX, totalAsetAwalX, totalAsetAkhirX, } = useAktivitasContext();
    const { totalTerima1XX, totalTerima2XX, totalBebanOpXX, totalBeban2XX, totalBeban3XX, setTotalSelisihABXX, totalSelisihABXX } = useAktivitasContext();
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

    // const totalABA = Math.abs(totalBalance);
    setTotalAsetAwalX(Math.abs(totalBalance));


    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const totalABA = Math.abs(totalBalance);
    };

    const previousKPABXX = (totalTerima1XX + totalTerima2XX) - (totalBebanOpXX + totalBeban2XX + totalBeban3XX) + saldoAwal;
    const previousKPAB = (totalTerima1 + totalTerima2) - (totalBebanOp + totalBeban2 + totalBeban3);

    setTotalSelisihABXX(previousKPABXX);
    setTotalSelisihAB(previousKPAB);

    // Aset Awal & Akhir Final
    const totalAsetAwalFinal = Math.abs(totalBalance) + saldoAwal + previousKPABXX - saldoAwal;
    const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihABXX;



    // Simpan ke Variables Context
    setTotalAsetAwalX(totalAsetAwalFinal);
    setTotalAsetAkhirX(totalAsetAkhirFinal);

    if (month === 3) {
        setTotalAsetAwalX(totalAsetAwalFinal - saldoAwal);
        // setTotalAsetAkhirX(totalAsetAwalX + totalSelisihABX);
        setTotalSelisihAB(saldoAwal);
        setTotalAsetAkhirX(totalAsetAwalX + totalSelisihAB);
    } else {

        setTotalSelisihAB(previousKPAB);
        setTotalAsetAkhirX(totalAsetAwalX + totalSelisihAB);
    }


    return (
        <>
            <div className="w-full">

                {
                    (month === 3 ?
                        // <SubTotalAktivitas value={toidr(totalAsetAwal)} />
                        <JustValueTotalNoLine value={toidr(totalAsetAwalX)} />
                        :
                        // <SubTotalAktivitas value={toidr(totalAsetAwalFinal)} />
                        <JustValueTotalNoLine value={toidr(totalAsetAwalX)} />
                    )
                }

                <JustValueTotalNoLine value={toidr(totalSelisihAB)} />
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
                        // <SubTotalAktivitas value={toidr(totalAsetAkhir)} />
                        <JustValueTotalBold value={toidr(totalAsetAkhirX)} />
                        :
                        // <SubTotalAktivitas value={toidr(totalAsetAkhirFinal)} /
                        <JustValueTotalBold value={toidr(totalAsetAkhirFinal)} />
                    )
                } */}


                <br />
                CEK: <br />
                -- <br />
                tot aset awal test: <br />
                {Math.abs(totalBalance) + previousKPABXX} <br />
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
                {totalSelisihAB}



            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default