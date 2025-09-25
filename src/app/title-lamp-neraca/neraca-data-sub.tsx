"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import Divider from '@/components/Divider';

//
const NeracaDataSub = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    const { setTotalAL, setTotalATL, setTotalAT, setTotalAP, setTotalK, setTotalAB, setTotalAB2 } = useNeracaTContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ns-sub', type, group],
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
                setTotalAL(newTotal)
                break;
            case 3:
                setTotalATL(newTotal)
                break;
            case 2:
                setTotalAT(newTotal)
                break;
            case 4:
                setTotalK(newTotal)
                break;
            case 14:
                setTotalAP(newTotal)
                break;
            case 6:
                setTotalAB(newTotal)
                break;
            case 7:
                setTotalAB2(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full pr-2">
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataSub;


function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className='text-[0.8em] font-bold text-blue-600 dark:text-orange-500'>Total {title}:</p>
                {/* <p> </p> */}
                {/* <p className='text-[0.8em] font-bold text-blue-600 dark:text-orange-500'>{value}</p> */}
            </div>
        </>
    )
}