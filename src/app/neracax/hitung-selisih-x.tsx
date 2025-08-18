"use client"

import { useQuery } from '@tanstack/react-query';

import useAktivitasContext from "@/context/aktivitas-context";

//
const HitungSelisihX = ({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X
            } = useAktivitasContext();
    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();

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
            setTotalTerima1X(newTotal);
            console.log('Total Terima 1:', newTotal);
            break;
        case 9:
            setTotalTerima2X(newTotal);
            console.log('Total Terima 2:', newTotal);
            break;

        case 10:
            setTotalBebanOpX(newTotal);
            console.log('Total Beban Operasional:', newTotal);
            break;

        case 11:
            setTotalBeban2X(newTotal);
            console.log('Total Beban 2:', newTotal);
            break;

        case 12:
            setTotalBeban3X(newTotal);
            console.log('Total Beban 3:', newTotal);
            break;

        default:
            // Handle default case
            break;
    }

    console.log('Total Penerimaan:', totalTerima1X + totalTerima2X);
    console.log('Total Beban:', totalBebanOpX + totalBeban2X + totalBeban3X);
    console.log('Total Selisih AB:', totalTerima1X + totalTerima2X - (totalBebanOpX + totalBeban2X + totalBeban3X));


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

export default HitungSelisihX;

//export default