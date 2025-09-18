"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import { TulisRekapRp } from './sub-total';


//
const NeracaData = ({ title, titleTotal, type, group, start, end }: 
    { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {
    const { setTotalAL, setTotalATL, setTotalAT, setTotalK, setTotalAB, setTotalAB2, setTotalAT1, setTotalAT2, setTotalAT3, setTotalAT4 } = useNeracaTContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsnow', type, group],
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
        const newTotal = Math.abs(totalBalance);
        switch (group) {
            //Aktiva
            case 1:
                setTotalAL(newTotal)
                break;
            case 3:
                setTotalATL(newTotal)
                break;
            case 2:
                setTotalAT(newTotal)
                break;
            
            //Kewajiban - Aset Bersih
            case 4:
                setTotalK(newTotal)
                break;
            case 6:
                setTotalAB(newTotal)
                break;
            case 7:
                setTotalAB2(newTotal)
                break;

            //Aset - Tanah, Gedung, Kendaraan, Inventaris
            case 10:
                setTotalAT1(newTotal)
                break;
            case 11:
                setTotalAT2(newTotal)
                break;
            case 12:
                setTotalAT3(newTotal)
                break;
            case 13:
                setTotalAT4(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                <TulisRekapRp value={newTotalBalance} title={titleTotal} />
            </div>
        </>
    )
}

export default NeracaData;
