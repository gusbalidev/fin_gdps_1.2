"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import SubTotalAktivitas from "./total-aktivitas";
import useAktivitasContextB from "@/context/aktivitas-contex-b";
import useSaldoAwalContextB from "@/context/saldo-awal-context-b";
import { TulisRekap, TulisRekapBold } from "../neraca/TulisRekap";
import { JustValueTotal, JustValueTotalBold, JustValueTotalNoLine } from "../neraca2/title-value";

const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    const { setTotalAsetAwal, setTotalAsetAkhir, totalSelisihAB, totalAsetAwal, totalAsetAkhir } = useAktivitasContextB();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, setTotalSelisihABX } = useAktivitasContextB();
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
    setTotalAsetAwal(Math.abs(totalBalance));


    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const totalABA = Math.abs(totalBalance);
    };

    const previousKPAB = (totalTerima1X + totalTerima2X) - (totalBebanOpX + totalBeban2X + totalBeban3X) + saldoAwal;

    setTotalSelisihABX(previousKPAB);

    // Aset Awal & Akhir Final
    const totalAsetAwalFinal = Math.abs(totalBalance) + saldoAwal + previousKPAB - saldoAwal;
    const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihAB;

    // Simpan ke Variables Context
    setTotalAsetAwal(totalAsetAwalFinal);
    setTotalAsetAkhir(totalAsetAkhirFinal);

    if (month === 3) {
        setTotalAsetAwal(totalAsetAwalFinal - saldoAwal);
        setTotalAsetAkhir(totalAsetAwal + totalSelisihAB);
    } else {

        setTotalAsetAkhir(totalAsetAwal + previousKPAB + saldoAwal);
    }


    return (
        <>
            <div className="w-full">

                {
                    (month === 3 ?
                        // <SubTotalAktivitas value={toidr(totalAsetAwal)} />
                        <JustValueTotalNoLine value={toidr(totalAsetAwal)} />
                        :
                        // <SubTotalAktivitas value={toidr(totalAsetAwalFinal)} />
                        <JustValueTotalNoLine value={toidr(totalAsetAwalFinal)} />
                    )
                }

                <JustValueTotalNoLine value={toidr(totalSelisihAB)} />

                {
                    (month === 3 ?
                        // <SubTotalAktivitas value={toidr(totalAsetAkhir)} />
                        <JustValueTotalBold value={toidr(totalAsetAkhir)} />
                        :
                        // <SubTotalAktivitas value={toidr(totalAsetAkhirFinal)} /
                        <JustValueTotalBold value={toidr(totalAsetAkhirFinal)} />
                    )
                }

                <br />
                CEK: <br />
                -- <br />
                tot aset awal test: <br />
                {Math.abs(totalBalance) + previousKPAB} <br />
                -- <br />
                terima XX <br />
                {totalTerima1X + totalTerima2X} <br />
                beban XX<br />
                {totalBebanOpX + totalBeban2X + totalBeban3X} <br />
                -- <br />
                selisih AB prev <br />
                {totalSelisihABX} <br />
                -- <br />
                selisih AB curr: <br />
                {totalSelisihAB}

            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default