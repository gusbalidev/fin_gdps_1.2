"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";
import SubTotalAktivitasBefore from './total-aktivitas-before';
import useSaldoAwalContext from "@/context/saldo-awal-context";
import HitungKPABPrevious from "./hitung-KPAB-previous";

const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    const { setTotalAsetAwal, setTotalAsetAkhir, totalAsetAwal, totalAsetAkhir } = useAktivitasContext();
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

    const totalABA = Math.abs(totalBalance);
    setTotalAsetAwal(totalABA);
    // setTotalAsetAkhir(totalABA + saldoAwal);
    if (month === 3) {
        setTotalAsetAkhir(totalABA);
    }

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const totalABA = Math.abs(totalBalance);
    };

    return (
        <>
            <div className="w-full">

                {/* Aset Bersih Awal */}
                <SubTotalAktivitasBefore value={toidr(totalAsetAwal)} title={titleTotal} />

                {/* Aset Bersih Akhir */}
                <SubTotalAktivitasBefore value={toidr(totalAsetAkhir)} title={titleTotal} />



            </div>
        </>
    )
}

export default HitungAsetBersih;

//export default