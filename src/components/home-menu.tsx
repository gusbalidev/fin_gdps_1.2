import React from 'react'

import MenuBox1 from "@/components/MenuBox1";
import MenuBox2 from "@/components/MenuBox2";
import MenuBox3 from "@/components/MenuBox3";

function HomeMenu() {
  return (
    <>
    <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            <MenuBox1 title="AKUN" desc="Daftar Akun" menulink='/coa' />
            <MenuBox1 title="JURNAL" desc="Entri Jurnal Umum" menulink='/jurnal' />
            <MenuBox1 title="KAS KERK" desc="Entri KAS KERK" menulink='/receive-keb' />
            <MenuBox1 title="BANK" desc="Entri Penerimaan BANK" menulink='/receive-other' />
            <MenuBox1 title="PENGELUARAN" desc="Entri Pengeluaran" menulink='/expense' />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <MenuBox2 title="SEMUA TRANSAKSI" desc="Semua Transaksi Per-Periode/Akun" menulink='/transaction-all' />
            <MenuBox2 title="AKTIVITAS & ARUS KAS" desc="Laporan Aktivitas & Arus Kas Bulanan" menulink='/aktivitas' />
            {/* <MenuBox2 title="ARUS KAS" desc="Laporan Arus Kas Bulanan" menulink='/cashflow-recap' /> */}
            <MenuBox2 title="BUKU BESAR RIIL" desc="Lap. Buku Besar Akun Riil" menulink='/ledger-riil' />
            <MenuBox2 title="BUKU BESAR NOMINAL" desc="Lap. Buku Besar Akun Nominal" menulink='/ledger-nom' />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <MenuBox3 title="BUKU BESAR UMUM" desc="Laporan Buku Besar Umum" menulink='/ledger' />
            <MenuBox3 title="PENERIMAAN/PENGELUARAN" desc="Laporan Penerimaan/Pengeluaran Bulanan" menulink='/cashflow' />
            <MenuBox3 title="NERACA" desc="Laporan Neraca Bulanan" menulink='/neraca-t' />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {/* <MenuBox2 title="BUKU BESAR UMUM" desc="Laporan Buku Besar Umum" menulink='/ledger' /> */}
            <MenuBox3 title="NERACA SALDO NOMINAL" desc="Laporan Neraca Bulanan Akun Nominal" menulink='/neraca-saldo-nom' />
            <MenuBox3 title="NERACA SALDO ASET BERSIH" desc="Laporan Neraca Bulanan Aset Bersih" menulink='/neraca-saldo-ab' />
          </div>
        </div>
    </>
  )
}

export default HomeMenu