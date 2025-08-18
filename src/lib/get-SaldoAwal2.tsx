"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useSaldoAwalContext from '@/context/saldo-awal-context';
import { set } from 'date-fns';

const GetSaldoAwal2 = ({ title, titleTotal }: { title: string; titleTotal: string; }) => {

    const id = 80; // ID Aset Bersih Awal COA 31.00.0000
    const { saldoAwal2, setSaldoAwal2, setSaldoAwalX } = useSaldoAwalContext();

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
        setSaldoAwal2(newTotal);
        setSaldoAwalX(newTotal);
    };

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <InfoTotal value={newTotalBalance} title={titleTotal} /> */}
                {/* {saldoAwal2} */}

            </div>

        </>

    )
}

export default GetSaldoAwal2;

//export default


function InfoTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            {/* <Divider /> */}
            <div className='flex justify-between'>
                <p></p>
                {/* <p className='text-sm text-end text-gray-700 dark:text-gray-400'>{value}</p> */}
            </div>
        </>
    )
}