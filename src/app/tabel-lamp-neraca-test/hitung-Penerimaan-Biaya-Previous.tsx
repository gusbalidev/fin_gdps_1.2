"use client"

import { useQuery } from '@tanstack/react-query';

import useAktivitasContext from '@/context/aktivitas-context';

const HitungPenerimaanBiayaXX = ({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalTerima1XX, setTotalTerima2XX, setTotalBebanOpXX, setTotalBeban2XX, setTotalBeban3XX } = useAktivitasContext();

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

    //Simpan nilai Positif
    const newTotal = Math.abs(totalBalance);

    switch (group2) {

        case 8:
            setTotalTerima1XX(newTotal)
            // console.log('Total Terima 1:', newTotal);
            break;
        case 9:
            setTotalTerima2XX(newTotal)
            // console.log('Total Terima 2:', newTotal);
            break;

        case 10:
            setTotalBebanOpXX(newTotal)
            // console.log('Total Beban Operasional:', newTotal);
            break;

        case 11:
            setTotalBeban2XX(newTotal)
            // console.log('Total Beban 2:', newTotal);
            break;

        case 12:
            setTotalBeban3XX(newTotal)
            // console.log('Total Beban 3:', newTotal);
            break;

        default:
            // Handle default case
            break;
    }

    //Update Total global States
    // if (isSuccess) {
    //     const newTotal = Math.abs(totalBalance);
    // };

    return (
        <>
            {/* {totalTerima1X} <br /> */}
        </>

    )
}

export default HitungPenerimaanBiayaXX;
