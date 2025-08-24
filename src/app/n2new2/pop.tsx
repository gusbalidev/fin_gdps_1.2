'use client'

import React from 'react'
import Divider from '@/components/Divider'
import KolomAktivitasPop from './kolom-aktivitas-pop'
import KolomAruskasPoP from './kolom-aruskas-pop'

export default function PoP() {
    // const { subTitle } = useNeracaSaldoContext();
    return (
        <>
            <div>
                <h1 className="text-xl text-end font-bold dark:text-blue-500">Perubahan</h1>
                <Divider />
                <h1 className="my-[1.07em] opacity-[0]">X</h1>
                <br />
                {/* <Divider /> */}
                <KolomAktivitasPop titleMY="PoP" />
                <br />
                <KolomAruskasPoP titleMY="PoP" />
            </div>

        </>
    )
}

