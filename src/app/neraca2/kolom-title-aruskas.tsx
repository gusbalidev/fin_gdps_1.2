import JustTitle from '@/lib/just-title'
import React from 'react'

export default function KolomTitleAktivitas() {
    // const { subTitle } = useNeracaSaldoContext();
    return (
        <>
            <div className="w-full">
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Arus Kas</h2>
                <JustTitle title="Total Penerimaan" />
                <JustTitle title="Total Beban" />
                <JustTitle title="Surplus (Defisit)" />
                <JustTitle title="Beban Penyusutan" />
                <JustTitle title="--- Surplus (Defisit)" />
            </div>

        </>
    )
}

