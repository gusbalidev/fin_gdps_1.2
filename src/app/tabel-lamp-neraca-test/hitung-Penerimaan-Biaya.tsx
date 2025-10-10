'use client'

import React, { Suspense } from 'react'

import Loading from "@/components/Loading";
// import NeracaDataNew from "./neraca-data-new";
// import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import SetPenerimaanBiaya from './set-penerimaan-biaya';
import useNeracaSaldoContextB from '@/context/neraca-saldo-context-b';

//
export default function HitungPenerimaanBiaya() {

    // const { start, end } = useNeracaSaldoContext();
    const { start, end } = useNeracaSaldoContextB();

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">

                    <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                        {/* <NeracaDataNew title="PEN-PERB" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} /> */}
                        <SetPenerimaanBiaya title="P2-1" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                        
                    </Suspense>

                    <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                        {/* <NeracaDataNew title="P2-2" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} /> */}
                        <SetPenerimaanBiaya title="P2-2" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                        {/* <NeracaDataNew title="BEB-OPEB" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} /> */}
                        <SetPenerimaanBiaya title="B2-1" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                        {/* <NeracaDataNew title="BEB-SEKB" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} /> */}
                        <SetPenerimaanBiaya title="B2-2" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} />
                    </Suspense>

                    <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                        {/* <NeracaDataNew title="BEB-BIDB" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} /> */}
                        <SetPenerimaanBiaya title="B2-3" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} />
                    </Suspense>

                </div>
            </div>
        </>
    )
}