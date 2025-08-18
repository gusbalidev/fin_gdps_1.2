"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";
import useSaldoAwalContext from "@/context/saldo-awal-context";

import SubTotalAktivitas from "./total-aktivitas";

const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    const { setTotalAsetAwal, setTotalAsetAkhir, totalSelisihAB, totalAsetAwal, totalAsetAkhir } = useAktivitasContext();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, setTotalSelisihABX } = useAktivitasContext();
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
                        <SubTotalAktivitas value={toidr(totalAsetAwal)} />
                        :
                        <SubTotalAktivitas value={toidr(totalAsetAwalFinal)} />
                    )
                }

                {
                    (month === 3 ?
                        <SubTotalAktivitas value={toidr(totalAsetAkhir)} />
                        :
                        <SubTotalAktivitas value={toidr(totalAsetAkhirFinal)} />
                    )
                }



            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default

function TotalAB1() {
    const { totalAsetAwal } = useAktivitasContext();

    return (
        <>
            <SubTotalAktivitas value={toidr(totalAsetAwal)} />

        </>

    );
}   