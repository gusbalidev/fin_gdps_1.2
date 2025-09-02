import React from 'react'

import MenuBox1 from "@/components/MenuBox1";
import MenuBox2 from "@/components/MenuBox2";
import MenuBox3 from "@/components/MenuBox3";

import global from "@/config.js";
import GraphBox from './GraphBox';

function HomeMenu() {
  return (
    <>
      {/* <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <GraphBox title="AKUN" desc="Daftar Akun" menulink='/coa' />
          <GraphBox title="JURNAL" desc="Entri Jurnal Umum" menulink='/jurnal' />
        </div>

      </div> */}
      <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">


        <div className="grid auto-rows-min gap-4 md:grid-cols-5">
          <MenuBox1 title="AKUN" desc="Daftar Akun" menulink='/coa' />
          <MenuBox1 title="JURNAL" desc="Entri Jurnal Umum" menulink='/jurnal' />
          <MenuBox1 title="KAS KERK" desc="Entri KAS KERK" menulink='/receive-keb' />
          <MenuBox1 title="BANK" desc="Entri Penerimaan BANK" menulink='/receive-other' />
          <MenuBox1 title="PENGELUARAN" desc="Entri Pengeluaran" menulink='/expense' />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <MenuBox3 title={global.pageTitle.neraca} desc="Laporan Neraca" menulink='/neraca' />
          <MenuBox3 title={global.pageTitle.lampNeraca} desc="Laporan Lampiran Neraca" menulink='/lamp-neraca-dev' />
          <MenuBox3 title={global.pageTitle.activity} desc="Laporan Aktivitas & Arus Kas" menulink='/aktivitas' />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <MenuBox3 title={global.pageTitle.cashflow} desc="Laporan Penerimaan/Pengeluaran Bulanan" menulink='/cashflow' />
          <MenuBox3 title={global.pageTitle.ledger} desc="Laporan Buku Besar Umum" menulink='/ledger' />
          <MenuBox3 title={global.pageTitle.nerSaldo} desc="Semua Transaksi Per-Periode/Akun" menulink='/neraca-saldo-x' />
          <MenuBox3 title={global.pageTitle.tjbj} desc="Laporan TJBJ" menulink='/tjbj' />
        </div>


      </div>
    </>
  )
}

export default HomeMenu