import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

import AccountData from './account-data';
import Divider from "@/components/Divider";




//
export default function Page() {

    const data = []; // Ensure data is always an array

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;
    const pageTitle = global.pageTitle.coa;
    const pageTitle2 = 'Lihat & Modifikasi Akun';

    return (

        <PageLayout header={header} footer={footer}>
            <h1 className="text-3xl font-bold dark:text-blue-500">{pageTitle.toUpperCase()}</h1>
            <h1 className="text-xl font-bold dark:text-blue-500">{pageTitle2.toUpperCase()}</h1>
            <Divider />
            <br />
            <div className="w-full">
                <AccountData />
            </div>
        </PageLayout>
    )
}
