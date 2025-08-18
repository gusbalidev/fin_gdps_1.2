"use client";

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

import { toQueryDate } from "@/lib/tanggal";
import toidr from "@/lib/toidr";
import Divider from "@/components/Divider";

import useAktivitasContext from "@/context/aktivitas-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

import Aktiva from "./n-aktiva";
import Pasiva from "./n-pasiva";
import { SubTotalAll } from "./sub-total";
import useSaldoAwalContext from "@/context/saldo-awal-context";

//
export default function ShowNSData() {
  // const { start, end, periodeOn, titlePrevMonthYear, titleMonthYear } = useNeracaSaldoContext();
  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
    useNeracaSaldoContext();
  const { totalAL, totalALX, totalAT, totalATX, totalAP, totalAPX } =
    useNeracaTContext();

  //const { totalSelisihAB } = useAktivitasContext();

  console.log("SHOW-NS-DATA:");
  console.log("Start:", toQueryDate(start));
  console.log("End:", toQueryDate(end));
  //console.log('Periode is: ', periodeOn)

  const startFirst = "2020-01-01";

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-row gap-2">
          <Aktiva />
        </div>

        <div className="flex flex-row gap-2">
          <Pasiva />
        </div>
      </div>

      <div className="h-8"></div>
      <Divider />

      <div className="flex justify-between bg-slate-200 dark:bg-blue-600 p-2">
        <div className="w-1/2 pr-2">
          <TotalAktiva />
        </div>
        <div className="w-1/2 pr-2">
          <div className="flex justify-between">
          <TotalPasivaKolom1 />
          <TotalPasiva />
          </div>
        </div>
      </div>

      <Divider />

      <div className="h-4"></div>
    </>
  );
}

//Calculate current AB
function HitungAB({
  title,
  type,
  group2,
  start,
  end,
}: {
  title: string;
  type: number;
  group2: number;
  start: string;
  end: string;
}) {
  const {
    totalTerima1,
    totalTerima2,
    totalBebanOp,
    totalBeban2,
    totalBeban3,
    totalSelisihAB,
    setTotalTerima1,
    setTotalTerima2,
    setTotalBebanOp,
    setTotalBeban2,
    setTotalBeban3,
    setTotalSelisihAB,
  } = useAktivitasContext();

  // Fetch data using TanStack Query
  const {
    data: result,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [{ title }, type, group2],
    queryFn: () =>
      fetch(
        `/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`,
        { cache: "no-store" }
      ).then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      }),
  });

  if (isLoading)
    return (
      <div>
        <Spinner size="small" />
      </div>
    ); // Handle loading state
  if (error) return <div>Error: {error.message}</div>; // Handle error state
  if (!result) return <div>Tidak ada data (null)</div>;

  //Total & data for table
  const { accounts: data, totalBalance } = result;
  const newTotal = Math.abs(totalBalance);

  //Set AB
  const totalTerima = totalTerima1 + totalTerima2;
  const totalBeban = totalBebanOp + totalBeban2 + totalBeban3;
  setTotalSelisihAB(totalTerima - totalBeban);

  //Update Total global States
  if (isSuccess) {
    switch (group2) {
      case 8:
        setTotalTerima1(newTotal);
        break;
      case 9:
        setTotalTerima2(newTotal);
        break;
      case 10:
        setTotalBebanOp(newTotal);

      case 11:
        setTotalBeban2(newTotal);
        break;

      case 12:
        setTotalBeban3(newTotal);
        break;

      default:
        // Handle default case
        break;
    }
  }

  return <>{/* <h1>SelisihAB: {toidr(totalSelisihAB)}</h1> */}</>;
}

//Calculate previous AB
function HitungABX({
  title,
  type,
  group2,
  start,
  end,
}: {
  title: string;
  type: number;
  group2: number;
  start: string;
  end: string;
}) {
  const {
    totalTerima1X,
    totalTerima2X,
    totalBebanOpX,
    totalBeban2X,
    totalBeban3X,
    totalSelisihABX,
    setTotalTerima1X,
    setTotalTerima2X,
    setTotalBebanOpX,
    setTotalBeban2X,
    setTotalBeban3X,
    setTotalSelisihABX,
  } = useAktivitasContext();

  // Fetch data using TanStack Query
  const {
    data: result,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["abx", type, group2],
    queryFn: () =>
      fetch(
        `/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`,
        { cache: "no-store" }
      ).then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      }),
  });

  if (isLoading)
    return (
      <div>
        <Spinner size="small" />
      </div>
    ); // Handle loading state
  if (error) return <div>Error: {error.message}</div>; // Handle error state
  if (!result) return <div>Tidak ada data (null)</div>;

  //Total & data for table
  const { accounts: data, totalBalance } = result;
  const newTotal = Math.abs(totalBalance);

  //Set AB
  const totalTerima = totalTerima1X + totalTerima2X;
  const totalBeban = totalBebanOpX + totalBeban2X + totalBeban3X;
  setTotalSelisihABX(totalTerima - totalBeban);

  //Update Total global States
  if (isSuccess) {
    switch (group2) {
      case 8:
        setTotalTerima1X(newTotal);
        break;
      case 9:
        setTotalTerima2X(newTotal);
        break;
      case 10:
        setTotalBebanOpX(newTotal);

      case 11:
        setTotalBeban2X(newTotal);
        break;

      case 12:
        setTotalBeban3X(newTotal);
        break;

      default:
        // Handle default case
        break;
    }
  }

  return <></>;
}

//
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
  const { totalSelisihAB, totalAsetAwal } = useAktivitasContext();
  const { saldoAwal } = useSaldoAwalContext()

  const totalPasiva = totalK + totalAB + totalSelisihAB  + saldoAwal;

  return (
    <>
      <div className="text-sm">
        ---- <br />
        {totalK} <br />
        {totalAB} <br />
        {saldoAwal} <br />
        Tot Aset Awal: {totalAsetAwal} <br />
        KPAB 1: {totalSelisihAB} <br />
        KPAB 2: {totalSelisihAB +saldoAwal} <br />
        -----
      </div>
      <div className="">
      <SubTotalAll title="" value={toidr(totalPasiva)} />
      </div>
    </>
  );
}


function TotalPasivaKolom1() {
  const { totalKX, totalABX } = useNeracaTContext();
  const { totalSelisihABX, totalAsetAwalX } = useAktivitasContext();
  const { saldoAwal } = useSaldoAwalContext()

  const totalPasiva = totalKX + totalABX + totalSelisihABX  + saldoAwal;

  return (
    <>
      <div className="text-sm">
        ---- <br />
        TotalKX: {totalKX} <br />
        TotalABX: {totalABX} <br />
        saldoAwal: {saldoAwal} <br />
        Tot Aset Awal: {totalAsetAwalX+saldoAwal} <br />
        KPAB 1: {totalSelisihABX} <br />
        KPAB 2: {totalSelisihABX+saldoAwal} <br />
        -----
      </div>
      <div className="text-end">
        <SubTotalAll title="" value={toidr(totalPasiva)} />
      </div>
    </>
  );
}
