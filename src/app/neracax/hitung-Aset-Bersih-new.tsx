"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";
import useSaldoAwalContext from "@/context/saldo-awal-context";
import Divider from "@/components/Divider";


//
const HitungAsetBersih = ({ title, titleTotal, type, group2, start, end, month }:
    { title: string; titleTotal: string; type: number; group2: number; start: string, end: string, month: number }) => {

    const { setTotalAsetAwal, setTotalAsetAkhir, setTotalSelisihAB, totalSelisihAB, totalAsetAwal, totalAsetAkhir,
            totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3,
            totalAsetAwalX, setTotalAsetAwalX
            } = useAktivitasContext();

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX, setTotalSelisihABX } = useAktivitasContext();

    const { saldoAwal, saldoAwal2 } = useSaldoAwalContext();

    
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

    // Total KPAB
    setTotalSelisihAB((totalTerima1 + totalTerima2) - (totalBebanOp + totalBeban2 + totalBeban3));
    setTotalSelisihABX((totalTerima1X + totalTerima2X) - (totalBebanOpX + totalBeban2X + totalBeban3X));

    // Aset Awal & Akhir Final
    const totalAsetAwalFinal = Math.abs(totalBalance);
    const totalAsetAkhirFinal = totalAsetAwalFinal + totalSelisihAB;

    setTotalAsetAwal(totalAsetAwalFinal);
    setTotalAsetAwalX(totalAsetAwalFinal);

    // Kalau bulan Maret, ubah totalAsetAwal, totalAsetAkhir
    if (month === 3) {
        // setTotalAsetAwal(totalAsetAwalFinal);
        setTotalAsetAkhir(totalAsetAwalFinal + saldoAwal);
        setTotalSelisihAB(saldoAwal);
    } else
    {
        // setTotalAsetAwal(totalAsetAwalFinal);
        setTotalAsetAkhir(totalAsetAkhirFinal);
        
    }


    return (
        <>
            <div className="w-full">

                {/* {month} */}
                {/* <br /> */}

                {/* Kenaikan Penurunan AB */}
                {/* {
                    (month === 3 ?
                        toidr(saldoAwal)
                        :
                        toidr(previousKPAB)
                        
                    )
                } */}

                {/* ({totalTerima1}) <br />
                ({totalTerima2}) <br />
                ({totalBebanOp}) <br />
                ({totalBeban2}) <br />
                ({totalBeban3}) <br /> */}

                <SubTotalAktivitas value={toidr(totalSelisihAB)} />

                {/* Aset Bersih Awal */}
                {
                    // (month === 3 ?
                    //     <SubTotalAktivitas value={toidr(totalAsetAwal-saldoAwal)} />
                    //     :
                    //     <SubTotalAktivitas value={toidr(totalAsetAwalFinal)} />
                    // )
                }

                {/* {totalAsetAwal}  <br /> */}
                <SubTotalAktivitas value={toidr(totalAsetAwal)} />

                {/* Aset Bersih Akhir */}
                {/* {
                    (month === 3 ?
                        <SubTotalAktivitas value={toidr(totalAsetAkhir)} />
                        :
                        <SubTotalAktivitas value={toidr(totalAsetAkhirFinal)} />
                    )
                } */}
                <SubTotalAktivitas value={toidr(totalAsetAkhir)} />



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
};


function SubTotalAktivitas({ value }: { value: string }) {
    return (
        <>
            <Divider />
            <div>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}