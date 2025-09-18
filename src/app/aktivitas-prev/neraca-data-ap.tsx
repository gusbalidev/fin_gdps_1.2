"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import SubTotalAktivitas from './total-aktivitas';
import Divider from '@/components/Divider';


//Hitung Akumulasi Penyusutan
const NeracaDataAP = ({ title, titleTotal, start, end }: { title: string; titleTotal: string; start: string, end: string }) => {

    const { setTotalAP } = useNeracaTContext();
    const type = 5;
    const group = 22;

    // Fetch data
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [{title}, type, group],
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

    return (
        <>
            <Divider />
            <div className="flex justify-between">
                <p></p>
                <SubTotalAktivitas value={'('+newTotalBalance+')'} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataAP;

//export default