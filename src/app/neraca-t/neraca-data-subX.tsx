"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
import useNeracaTContext from '@/context/neraca-t-context';

const NeracaDataSubX = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    const { setTotalALX, setTotalATLX, setTotalATX, setTotalAPX, setTotalKX, setTotalABX, setTotalAB2X } = useNeracaTContext();

    // Fetch data
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ns-subx', type, group],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            //queryFn: () => fetch(`/api/neraca-group1?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
            case 14:
                setTotalAPX(newTotal)
                break;
            case 6:
                setTotalABX(newTotal)
                break;
            case 7:
                setTotalAB2X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataSubX;

//export default