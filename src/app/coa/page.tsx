import { Suspense } from "react";

import PageLayout from "@/components/PageLayout";
import Loading from "@/components/Loading";
import global from "@/config.js";

import { ClientDataTable } from "./client-data-tables";


async function getAccount() {
    try {
        // const url = `${process.env.APP_URL}/api/abl`;
        // console.log('Fetching from:', url);
        const baseUrl = process.env.APP_URL || 'http://localhost:3000';
        const url = new URL('/api/abl', baseUrl).toString();
        console.log('Fetching from:', url)
        
        // const res = await fetch(url, {
        //     cache: 'no-store'
        // });
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            },
            // Follow redirects automatically
            redirect: 'follow',
        });

        if (!res.ok) {
            console.log('Response status:', res.status);
            console.log('Response headers:', Object.fromEntries(res.headers));
            console.log('Response type:', res.headers.get('content-type'));
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON but got ${contentType}`);
        }

        const data = await res.json();
        // Ensure we return an array, even if empty
        return Array.isArray(data) ? data : [];

    } catch (error) {
        console.error('Error fetching accounts:', error);
        // console.error('Error details:', error.message);
        return [];
    }
}

export default async function AccountPage() {

    const pageTitle = global.pageTitle.coa;
    const data = await getAccount() || []; // Ensure data is always an array
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <Suspense fallback={<Loading section="COA" />}>
                <div className="w-full">

                    <h1 className='text-2xl text-bold'>{pageTitle}</h1>

                    <ClientDataTable initialData={data} />


                </div>
            </Suspense>
        </PageLayout>
    )
}
