import { Suspense } from "react";

import { DataTable } from "./data-tables";
import { columns } from "./columns";
import Loading from "./loading";

import global from "@/config.js";
import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import prisma from "@/lib/dbprisma";

// async function getData(accountId: string) {
//     // const res = await fetch(`${global.baseUrl}/api/transbyid?accountId=${accountId}`, {
//     //     cache: 'no-store'
//     // })
//     const res = await fetch(`${process.env.APP_URL}/api/transbyid?accountId=${accountId}`, {
//         cache: 'no-store'
//     })
//     const data = await res.json()
//     //console.log(data)
//     return data
// }


// NEW getData with error handling and logging
async function getData(accountId: string) {
    try {
        const baseUrl = process.env.APP_URL || 'http://localhost:3000';
        const url = new URL(`/api/transbyid`, baseUrl);
        url.searchParams.append('accountId', accountId);

        console.log('Fetching data from:', url.toString());

        const res = await fetch(url.toString(), {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            // Log the raw response for debugging
            const textResponse = await res.text();
            // console.error('Error response:', textResponse);
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON but got ${contentType}`);
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];

    } catch (error) {
        // console.error('Error fetching transactions:', error);
        return []; // Return empty array as fallback
    }
}

export default async function Page({ params }: { params: { accountId: string, code: string, name: string } }) {
    const accountId = params.accountId as string

    const account = await prisma.account.findUnique({ where: { id: parseInt(accountId) } })
    const data = await getData(accountId)

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">
                <h2 className="text-lg font-bold">Daftar Transaksi Akun: {account?.code} - {account?.name}</h2>

                <Divider />
            <Suspense fallback={<Loading />}>
                <DataTable columns={columns} data={data} />
            </Suspense>        

            </div>
        </PageLayout>
    )
}
