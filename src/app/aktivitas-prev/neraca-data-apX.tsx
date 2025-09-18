"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaX';
import SubTotalAktivitas from './total-aktivitas';
import Divider from '@/components/Divider';


//Hitung Akumulasi Penyusutan
const NeracaDataAPX = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    //const { setTotalAL, setTotalATL, setTotalAT, setTotalAP, setTotalK, setTotalKL, setTotalAB, setTotalAB2 } = useNeracaStore();
    const { setTotalAPX } = useNeracaTContext();
    const type = 5;
    const group = 22;

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsapx', type, group],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        //queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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

    if (isSuccess) {
        setTotalAPX(totalBalance);
    }

    //Update Total global States
    // if (isSuccess) {
    //     //UpdateTotalCF(group2, totalBalance);
    //     const newTotal = Math.abs(totalBalance);

    //     switch (group) {

    //         case 1:
    //             setTotalAL(newTotal)
    //             break;
    //         case 3:
    //             setTotalATL(newTotal)
    //             break;
    //         case 2:
    //             setTotalAT(newTotal)
    //             break;
    //         case 4:
    //             setTotalK(newTotal)
    //             break;
    //         // case 5:
    //         //     setTotalKL(newTotal)
    //         //     break;
    //         case 6:
    //             setTotalAB(newTotal)
    //             break;
    //         case 7:
    //             setTotalAB2(newTotal)
    //             break;

    //         default:
    //             // Handle default case
    //             break;
    //     }
    // };

    return (
        <>
            <Divider />
            <div className="flex justify-between">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <p className='text-sm text-blue-600 dark:text-orange-500'>{title}</p> */}
                <SubTotalAktivitas value={'('+newTotalBalance+')'} title={titleTotal} />
                
            </div>

        </>

    )
}

export default NeracaDataAPX;

//export default