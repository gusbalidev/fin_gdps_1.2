"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";
import Divider from '@/components/Divider';
import useSaldoAwalContext from '@/context/saldo-awal-context';

// import SubTotalAktivitasBefore from './total-aktivitas-before';

const GetBalance1X = ({ title, titleTotal, id }: { title: string; titleTotal: string; id: number }) => {

    const { setSaldoAwalX } = useSaldoAwalContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, id],
        queryFn: () => fetch(`/api/accountbl1?id=${id}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    // Add null check for result data
    if (!result.balance1) {
        return <div>Data balance tidak ditemukan</div>;
    }

    //Total & data for table
    // const { accounts: data} = result;
    const newTotal = Math.abs(result.balance1);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(result.balance1);
        setSaldoAwalX(newTotal);
    };

    return (
        <>
            <div className="w-full">
                <InfoTotal value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default GetBalance1X;

//export default


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            {/* <Divider /> */}
            <div className='flex justify-between'>
                {/* <p className='text-sm pl-1 text-gray-700 dark:text-gray-400'>{title}</p> */}
                {/* <p className='text-sm text-end text-gray-700 dark:text-gray-400'>{value}</p> */}
            </div>
        </>
    )
}