import Divider from '@/components/Divider'
import React from 'react'
import { TulisTitle, TulisTitleBold, TulisTotal } from './titles';

export default function KolomTitlePasiva() {
    return (
        <>
            <Kewajiban />
            <AsetBersih />
        </>
    )
};


function Kewajiban() {
    return (
        <>
            <div className="w-full py-[0.5rem]">
                <TulisTitleBold title="KEWAJIBAN" />
                {/* -- */}
                <TulisTitle title="HUTANG BIAYA" />
                <TulisTitle title="HUTANG LAIN-LAIN" />
                <TulisTitle title="KEWAJIBAN JANGKA PANJANG" />
                {/* sub total */}
                <TulisTotal title="Total KEWAJIBAN" />
            </div>
        </>
    )
};

//
function AsetBersih() {
    return (
        <>
            <div className="w-full py-[0.5rem]">
                <TulisTitleBold title="ASET BERSIH" />
                {/* -- */}
                <TulisTitle title="ASET BERSIH AWAL" />
                <TulisTitle title="KENAIKAN (PENURUNAN) ASET BERSIH" />
                {/* sub total */}
                <TulisTotal title="Total ASET BERSIH AKHIR" />
            </div>
        </>
    )
};

