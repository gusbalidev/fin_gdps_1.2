
import JustTitle from '@/lib/just-title'
import React from 'react'
import BlokPeriode from './blok-periode';

export default function KolomTitleAktivitas() {
    // const { subTitle } = useNeracaSaldoContext();
    return (
        <>
            <div className="w-full">
                <div>
                    <BlokPeriode />
                </div>
                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Aktivitas</h2>
                <JustTitle title="Penerimaan Persembahan" />
                <JustTitle title="Penerimaan Lain-lain/Khusus" />
                <JustTitle title="Beban Operasional Gereja" />
                <JustTitle title="Beban Sekretariat" />
                <JustTitle title="Beban Bidang & Bapel" />
                <JustTitle title="Kenaikan (Penurunan) Aset Bersih" />
                <JustTitle title="Aset Bersih Awal" />
                <JustTitle title="Aset Bersih Akhir" />
            </div>
        </>
    )
}

