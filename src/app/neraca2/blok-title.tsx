import React from 'react'

import global from "@/config.js";
import Divider from '@/components/Divider';

export default function Page() {
    const pageTitle = global.pageTitle.activity;
    const pageTitle2 = 'Laporan Komparatif';
    return (
    <>
        <h1 className="text-3xl font-bold dark:text-blue-500">{pageTitle.toUpperCase()}</h1>
        <h1 className="text-xl font-bold dark:text-blue-500">{pageTitle2.toUpperCase()}</h1>
        <Divider />
    </>
  )
}



