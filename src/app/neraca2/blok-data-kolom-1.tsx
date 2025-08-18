import useNeracaSaldoContext from '@/context/neraca-saldo-context';
import React from 'react'
import ShowNSData from '../tabel-aktivitas-arus-1/page-data';

export default function BlokDataKolom1() {
    const { showComponent } = useNeracaSaldoContext();
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
