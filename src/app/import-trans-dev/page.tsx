import { Suspense } from "react";
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import Loading from "@/components/Loading";
import { FileImport } from "./file-import";

export default async function AccountPage() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (
        <PageLayout header={header} footer={footer}>
            <Suspense fallback={<Loading section="IMPORT" />}>
                <div className="w-full space-y-4 pb-3">
                    <h1 className='text-2xl text-bold'>IMPORT File Transaksi (CSV) - dev</h1>
                    <div className="p-4 border-spacing-1 rounded-lg border border-gray-600 shadow-md">
                        <FileImport />
                    </div>
                </div>
            </Suspense>
        </PageLayout>
    );
}
