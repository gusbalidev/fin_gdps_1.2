"use client"

import global from "@/config.js";
import { useQuery } from '@tanstack/react-query';
import useSaldoAwalContextB from "@/context/saldo-awal-context-b";

// Fungsi untuk mendapatkan saldo awal dari COA tertentu, dan Set ke variabel context 
const GetSaldoAwalB = ({ title, coaId }: { title: string; coaId: number; }) => {
    const { setSaldoAwal } = useSaldoAwalContextB();

    // Fetch data
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [title, coaId],
        queryFn: () => fetch(`/api/accountbl1?id=${coaId}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>{global.msgText.wait}</div>;
    if (error) return <div>{global.msgText.error}: {error.message}</div>;
    if (!result) return <div>{global.msgText.noData}</div>;

    // Add null check for result data
    // if (!result.balance1) {
    //     return <div>Data balance tidak ditemukan</div>;
    // }

    //Total & data for table
    // const { accounts: data} = result;
    const newTotal = Math.abs(result.balance1);
    setSaldoAwal(newTotal);

    //Update Total global States
    if (isSuccess) {
        const newTotal = Math.abs(result.balance1);
        setSaldoAwal(newTotal);
    };

    return (
        <>
            {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
            {/* <DataTable columns={columns} data={data} /> */}
            {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
            {/* <InfoTotal value={newTotalBalance} title={titleTotal} /> */}
            {/* {saldoAwal2} */}

        </>

    )
}

export default GetSaldoAwalB;

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