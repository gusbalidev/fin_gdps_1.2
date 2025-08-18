"use client"

import { useQuery } from '@tanstack/react-query';
import global from "@/config.js";

import toidr from "@/lib/toidr";
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import useNeracaTContext from '@/context/neraca-t-context';

// Component to fetch and display CURRENT balance sheet data for accounts based on type and group2
const HitungSaldo = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Import context to set total values
    const { setTotalAL, setTotalATL, setTotalAT, setTotalK, setTotalAB, setTotalAB2, setTotalAT1, setTotalAT2, setTotalAT3, setTotalAT4 } = useNeracaTContext();
    const { setTotalALX, setTotalATLX, setTotalATX, setTotalKX, setTotalABX, setTotalAB2X, setTotalAT1X, setTotalAT2X, setTotalAT3X, setTotalAT4X } = useNeracaTContext();   

    // Fetch data using react-query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, type, group],
        queryFn: () => fetch(`/api/saldo?accountTypeId=${type}&accountGroup2Id=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error(global.msgText.netErr);
                return response.json();
            }),
    });

    // Handle loading, error, and empty states
    if (isLoading) return <div>{global.msgText.wait}</div>; 
    if (error) return <div>{global.msgText.error}: {error.message}</div>; 
    if (!result) return <div>{global.msgText.noData}</div>;

    // Destructure the result to get accounts and total balance
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);
    
    //Update Total global States
    if (isSuccess) {
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
            // case 5:
            //     setTotalKL(newTotal)
            //     break;
            case 6:
                setTotalAB(newTotal)
                break;
            case 7:
                setTotalAB2(newTotal)
                break;

            //Tanah, Gedung, Kendaraan, Inventaris
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

export default HitungSaldo;

//export default