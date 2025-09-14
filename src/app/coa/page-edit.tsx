import { Suspense } from "react";

import PageLayout from "@/components/PageLayout";
import Loading from "@/components/Loading";
import global from "@/config.js";

import { ClientDataTable } from "./client-data-tables";
import { useQuery } from "@tanstack/react-query";


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


async function getData() {
    try {
        const baseUrl = process.env.APP_URL || 'http://localhost:3000';
        const url = new URL('/api/abl', baseUrl).toString();
        console.log('Fetching from:', url); // Debug URL

        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            },
        })

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        console.log('Fetched data COA:', data)
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        return [] // Return empty array as fallback
    }
}



export default function Coa() {

    const pageTitle = global.pageTitle.coa;
    // const data = await getAccount() || []; // Ensure data is always an array
    // const data = await getData() || []; // Ensure data is always an array

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['accounts'],
        // queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/abl`, { cache: 'no-store' })

            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });


    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    console.log('Data to be rendered in COA page:', result);

    return (

        <PageLayout header={header} footer={footer}>
            <Suspense fallback={<Loading section="COA" />}>
                <div className="w-full">

                    <h1 className='text-2xl text-bold'>{pageTitle}</h1>

                    <ClientDataTable initialData={result} />


                </div>
            </Suspense>
        </PageLayout>
    )
}

