"use client"

import React from 'react'

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';


//
export default function LedgerPage() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    //
    // 1: Aktiva Lancar
    // 2: Aktiva Tetap
    // 3: Aktiva Lainnya
    // 4: Kewajiban Lancar
    // 5: Kewajiban Jangka Panjang
    // 6: Aset Bersih Awal
    // 7: Kenaikan (Penurunan) Aset Bersih
    // 8: Penerimaan Persembahan
    // 9: Penerimaan Lain-lain
    // 10: Biaya Operasional Gereja
    // 11: Biaya Sekretariat
    // 12: BIaya Bidang & Bapel

    const start = "2020-01-01"
    const today = new Date().toISOString().split('T')[0];
    // const data = await getData(start, today)

    const { data, isLoading, error } = useQuery({
        queryKey: ['ledger'],
        queryFn: () => fetch(`/api/transaction-act?startDate=${start}&endDate=${today}`, { cache: 'no-store' })
        
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }),
    });
    
    console.log('Led Data:', data)

    if (isLoading) return <Spinner className='justify-center items-center' size="small" />;
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!data) return <div>Tidak ada data (null)</div>;

    return (
        <>
            <PageLayout header={header} footer={footer}>

                <DataTable columns={columns} data={data} />

            </PageLayout>
        </>
    )
}

