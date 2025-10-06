"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
// import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import Divider from '@/components/Divider';


//Hitung Akumulasi Penyusutan
const NeracaDataAP = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    //const { setTotalAL, setTotalATL, setTotalAT, setTotalAP, setTotalK, setTotalKL, setTotalAB, setTotalAB2 } = useNeracaStore();
    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X } = useNeracaTContext();
    const { setTotalAP } = useNeracaTContext();
    const type = 1;
    const group = 14;

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsnow', type, group],
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
        setTotalAP(totalBalance);
    }

    const totalATBersih = toidr(totalAT1X + totalAT2X + totalAT3X + totalAT4X - Math.abs(totalBalance));

    return (
        <>
            <div>
                {/* <TulisRekapRp value={'('+newTotalBalance+')'} title={titleTotal} /> */}
                <TulisRp value={newTotalBalance} />
                <Divider />
                {/* <p className='text-[1em] font-bold text-blue-600 dark:text-orange-500'>{totalAT-totalAP}</p> */}
                <TulisRekapRp value={totalATBersih} title={titleTotal} />
                {/* <br /> */}
            </div>

        </>

    )
}

export default NeracaDataAP;

//export default

function TulisRp({ value }: { value: string }) {
    return (
        <>
            <div className='flex justify-between pr-2'>
                <p></p>
                <p className='text-[1em]'>{value}</p>
            </div>
        </>
    )
}

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5 pr-2'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className='text-[1em] font-bold text-blue-600 dark:text-orange-500'>{value}</p>
                {/* <p className='text-m'>{value}</p> */}
            </div>
        </>
    )
}