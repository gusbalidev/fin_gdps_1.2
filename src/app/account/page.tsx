"use client"

import { Suspense as Suspend, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import global from "@/config.js";
import PageLayout from '@/components/PageLayout';
import Divider from '@/components/Divider';

import { DataTable } from './data-tables';
import { columns } from './columns';
import Loading from '@/components/Loading';


//
const AccountPage = () => {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const pageTitle = global.pageTitle.coa;
    const pageTitle2 = 'Semua Akun';

    // Fetch data using TanStack Query
    const { data, isLoading, error } = useQuery({
        queryKey: ['account'],
        queryFn: () => fetch(`/api/abl`, { cache: 'no-store' })

            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!data) return <div>Tidak ada data (null)</div>;


    return (
        <PageLayout header={header} footer={footer}>

            <h1 className="text-3xl font-bold dark:text-blue-500">{pageTitle.toUpperCase()}</h1>
            <h1 className="text-xl font-bold dark:text-blue-500">{pageTitle2}</h1>

            <Divider />
            <Suspend fallback={<Loading section="COA" />}>
                <DataTable columns={columns} data={data} />
            </Suspend>

        </PageLayout>
    )
}

export default AccountPage;

//export default