
"use client"
// import { DataTable } from "./data-tables";
// import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";

import global from "@/config.js";

import MonthYearSelector from "@/components/widget/month-year-selector-close";
import YearSelector from "@/components/widget/year-selector-close";

import { useState } from "react";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import ShowNSData from "./page-data";
import { Button } from "@/components/ui/button";
import { SubTotalAll } from "./sub-total-close";
import toidr from "@/lib/toidr";
import useNeracaTContext from "@/context/neraca-t-context";
import useAktivitasContext from "@/context/aktivitas-context";
import NSDataForClosing from "./hitung-neraca";
import { Half2Icon } from "@radix-ui/react-icons";
import TulisTotal from "./tulis-total";


export default function Page() {
  // const data = await getData()
  // const [isClosing, setIsClosing] = useState(false);
  const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
  const { subTitle, isClosing, setIsClosing, setSubTitle, setStartContext, setEndContext,
    titleMonthYear, titlePrevMonthYear, setTitleMonthYear, setPrevTitleMonthYear } = useNeracaSaldoContext();

  const { totalTerima1X, totalTerima2X } = useAktivitasContext();

  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;

  // const { setTitleMY, setPeriodeOn } = useNeracaSaldoContext();
  const DataComponent = ShowNSData;

  // setPeriodeOn(false);

  return (

    <PageLayout header={header} footer={footer}>
      <div className="w-full">
        {/* <DataTable columns={columns} data={data} /> */}
        <h1 className="text-3xl font-bold dark:text-blue-500">{global.pageTitle.closing}</h1>

        <div>
          <br />
          <h1 className="text-2xl font-bold dark:text-blue-500">{subTitle}</h1>

          {/* Tahap: Memindahkan Saldo Awal ke Sisa Saldo */}
          {/* <div className="mt-4">
                        <h2>Tahap Penutupan:</h2>
                        <p>1. Memindahkan saldo awal ke sisa saldo.</p>
                        <p>2. Menutup buku untuk periode yang dipilih.</p>
                        <p>3. Menyimpan laporan penutupan.</p>
                    </div> */}
          <div className="flex gap-2 mb-4 py-2">
            <Button
              variant={periodType === 'M' ? 'default' : 'outline'}
              onClick={() => {
                setIsClosing(false);
                setPeriodType('M');
                // setTitleMY('MoM');

              }}
            >
              Bulanan
            </Button>
            <Button
              variant={periodType === 'Y' ? 'default' : 'outline'}
              onClick={() => {
                setIsClosing(false);
                setPeriodType('Y');
                // setTitleMY('YoY');
              }}
            >
              Tahunan
            </Button>
          </div>
          {/* <YearSelector DataComponent={DataComponent} /> */}

          {periodType === 'M' ?
            <MonthYearSelector DataComponent={DataComponent} />
            :
            <YearSelector DataComponent={DataComponent} />
          }
          {/* <div>
                        <h2>Detail Penutupan:</h2>
                        <p>Pastikan semua data sudah benar sebelum menutup buku.</p>
                    </div> */}


          {/* HITUNG NERACA */}
          <h2 className="text-xl font-bold dark:text-blue-500">Data Neraca:</h2>
          <Divider />
          {/* <Button variant="secondary" onClick={() => setIsClosing(true)}>TAMPILKAN</Button>
          {isClosing && <ShowNeraca />} */}


          {/* <TotalAktiva />
                    <TotalPasiva /> */}


          <br />

          <h2 className="text-xl font-bold dark:text-blue-500">Penanggung Jawab:</h2>
          <Divider />
          <p>Nama Penanggung Jawab: [Nama Penanggung Jawab]</p>
          <p>Jabatan: [Jabatan Penanggung Jawab]</p>
          <p>Tanggal Penutupan: [Tanggal Penutupan]</p>
          <br />

          {/* Selector Bulan/Tahun? */}
          <p>Pastikan semua transaksi telah dimasukkan sebelum melakukan penutupan.</p>
          <p>Setelah penutupan, data Periode yang dilakukan Penutupan akan tidak dapat diubah.</p>
          <p>Untuk melanjutkan, klik tombol "PROSES".</p>
          <br />
          <Button variant="destructive">PROSES</Button>
          <br />
          <div className="h-6"></div>
        </div>


      </div>
    </PageLayout>
  )
}

function ShowNeraca() {
  return (
    <>
      <NSDataForClosing />
      <TotalAktiva />
      <TotalPasiva />
    </>
  );
}
function TotalAktiva() {
  const { totalAL, totalATL, totalAT1, totalAT2, totalAT3, totalAT4, totalAP } =
    useNeracaTContext();
  const totalAktiva =
    totalAL + totalATL + totalAT1 + totalAT2 + totalAT3 + totalAT4 + totalAP;

  return (
    <>
      <SubTotalAll title="Total AKTIVA" value={toidr(totalAktiva)} />
    </>
  );
}

//
function TotalPasiva() {
  const { totalK, totalAB } = useNeracaTContext();
  const { totalSelisihAB } = useAktivitasContext();
  // const { saldoAwal } = useSaldoAwalContext()

  const totalPasiva = totalK + totalAB + totalSelisihAB;

  return (
    <>
      <SubTotalAll title="Total PASIVA" value={toidr(totalPasiva)} />
    </>
  );
}
