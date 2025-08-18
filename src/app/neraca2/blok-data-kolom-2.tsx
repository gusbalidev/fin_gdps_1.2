import useNeracaSaldoContextB from '@/context/neraca-saldo-context-b';
import React from 'react'
import ShowNSData from '../tabel-aktivitas-arus-2/page-data';

export default function BlokDataKolom2() {
    const { showComponent } = useNeracaSaldoContextB();
  return (
    <>
    <div>
                {/* {showComponent && <ShowNSData />} */}
                {/* Tampilkan Component */}
                {showComponent && <ShowNSData />}
    </div>
    </>
  )
}
