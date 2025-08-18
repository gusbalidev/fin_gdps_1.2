"use client"

import { useQuery } from '@tanstack/react-query';

import useAktivitasContext from "@/context/aktivitas-context";

//
const HitungSelisih = ({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3
            } = useAktivitasContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, group2],
        // queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/ns-nom?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');

                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;


    //Total & data for table
    const { accounts: data, totalBalance } = result;

    // ditambah total KP-AB periode sebelumnya
    const totalBalancePositive = Math.abs(totalBalance);
    const newTotal = Math.abs(totalBalancePositive);
    // const newTotalBalance = toidr(newTotal);

    switch (group2) {

        case 8:
            setTotalTerima1(newTotal);
            console.log('Total Terima 1:', newTotal);
            break;
        case 9:
            setTotalTerima2(newTotal);
            console.log('Total Terima 2:', newTotal);
            break;

        case 10:
            setTotalBebanOp(newTotal);
            console.log('Total Beban Operasional:', newTotal);
            break;

        case 11:
            setTotalBeban2(newTotal);
            console.log('Total Beban 2:', newTotal);
            break;

        case 12:
            setTotalBeban3(newTotal);
            console.log('Total Beban 3:', newTotal);
            break;

        default:
            // Handle default case
            break;
    }

    // console.log('Total Penerimaan:', totalTerima1 + totalTerima2);
    // console.log('Total Beban:', totalBebanOp + totalBeban2 + totalBeban3);
    // console.log('Total Selisih AB:', totalTerima1 + totalTerima2 - (totalBebanOp + totalBeban2 + totalBeban3));

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}
                {/* {title} - {newTotalBalance} */}

                {/* <TulisTotal value={newTotalBalance} title={title} /> */}
                {/* <p>{newTotalSelisihABX}</p> */}

            </div>

        </>

    )
}

export default HitungSelisih;

//export default