"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';

import { JustValueTotalNoLine } from './title-value';

const NeracaDataX = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X } = useNeracaTContext();
    const { setTotalALX, setTotalATLX, setTotalATX, setTotalKX, setTotalABX, setTotalAB2X, setTotalAT1X, setTotalAT2X, setTotalAT3X, setTotalAT4X } = useNeracaTContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsx', type, group],
        queryFn: () => fetch(`/api/neraca-group1?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })

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
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        switch (group) {

            case 1:
                setTotalALX(newTotal)
                break;
            case 3:
                setTotalATLX(newTotal)
                break;
            case 2:
                setTotalATX(newTotal)
                break;
            case 4:
                setTotalKX(newTotal)
                break;
            // case 5:
            //     setTotalKLX(newTotal)
            //     break;
            case 6:
                setTotalABX(newTotal)
                break;
            case 7:
                setTotalAB2X(newTotal)
                break;


            //Tanah, Gedung, Kendaraan, Inventaris
            case 10:
                setTotalAT1X(newTotal)
                break;
            case 11:
                setTotalAT2X(newTotal)
                break;
            case 12:
                setTotalAT3X(newTotal)
                break;
            case 13:
                setTotalAT4X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };
    setTotalATX(totalAT1X + totalAT2X + totalAT3X + totalAT4X);

    return (
        <>
            <div className="w-full">
                <JustValueTotalNoLine value={newTotalBalance} />
            </div>

        </>

    )
}

export default NeracaDataX;

//export default