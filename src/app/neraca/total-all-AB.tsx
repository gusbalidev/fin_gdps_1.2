"use client"

import useAktivitasContext from "@/context/aktivitas-context";
import Divider from "@/components/Divider";

import toidr from "@/lib/toidr";
import { textStyles } from "@/lib/text-styles";
import useSaldoAwalContext from "@/context/saldo-awal-context";
import { title } from "process";
import { TulisRekap, TulisRekapBold, TulisRekapFull, TulisRekapFullBold } from "./TulisRekap";
import useNeracaTContext from "@/context/neraca-t-context";

// Display CURRENT Total
function TulisTotalRp({ value }: { value: string}) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p />
                <p className={`${textStyles.sizes.small} font-medium text-blue-600 dark:text-orange-500`}>{value}</p>
            </div>
        </>
    )
}

// Display PREVIOUS Total
function TulisTotalRpX({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className={`${textStyles.sizes.small} font-medium text-blue-600 dark:text-orange-500`}>{title}</p>
                <p className={`${textStyles.sizes.small} font-medium`}>{value}</p>
            </div>
        </>
    )
}

// Calculate and display the total Aset Bersih Akhir based on the current and previous Periods
const TotalAllAB = ({ isCurrent, titleTotal, month }: { isCurrent: boolean; titleTotal: string, month: number }) => {

    const { saldoAwal, saldoAwalX } = useSaldoAwalContext();

    // Plus Saldo Awal
    //const newTotalFinal = toidr(saldoAwalX);

    const {  totalAsetAkhir, totalAsetAkhirX } = useAktivitasContext();
    
    //For Current values
    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB, setTotalAsetAwal, setTotalAsetAkhir } = useAktivitasContext();

    // For Previous values
    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAwalX, setTotalAsetAkhirX } = useAktivitasContext();

    // Hitung Total Beban Current    
    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    // Hitung Total Beban Previous
    const totalBebanX = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

    //Hitung Kenaikan/Penurunan Aset Bersih Current
    const newTotal = Math.abs(totalTerima1 + totalTerima2 - (totalBeban) );   

    //Hitung Kenaikan/Penurunan Aset Bersih Previous
    const newTotalX = Math.abs(totalTerima1X + totalTerima2X - (totalBebanX));

    //set Kenaikan/Penurunan Aset Bersih Current
    setTotalSelisihAB(newTotal);

    //set Kenaikan/Penurunan Aset Bersih Previous
    setTotalSelisihABX(newTotalX );

    // setTotalAsetAwal( );
    // setTotalAsetAwalX();
    
    //set Aset Bersih Akhir Current
    setTotalAsetAkhir( totalAsetAwal + totalSelisihAB )

    //set Aset Bersih Akhir Previous
    setTotalAsetAkhirX( totalAsetAwalX + totalSelisihABX ) ;
    
    // Total AB Akhir Current
    const newTotalFinal = toidr(newTotal);

    // Total AB Akhir Previous
    const newTotalFinalX = toidr(newTotalX );

    const totalAsetAkhirFinal = totalAsetAwal;
    const totalAsetAkhirFinalX = totalAsetAwalX + totalSelisihABX;
    
    return (
        <>
            <div className="w-full">
                
                {/* Tulis Total Aset Bersih AWAL */}
                {/* <Divider /> */}

                
       
                {isCurrent ?
                    // Untuk bulan Aktif    

                    (month === 3 ?
                        <TulisRekap value={toidr(totalAsetAwal)}  />
                        :
                        <TulisRekap value={toidr(totalAsetAwal+saldoAwal)} />
                    )
                    :
                    (month === 3 ?
                        <TulisRekapFull value={toidr(totalAsetAwalX)} title={'Aset Bersih Awal'}  />
                        :
                        <TulisRekapFull value={toidr(totalAsetAwalX+saldoAwal)} title={'Aset Bersih Awal'}  />
                    )


                    // Untuk bulan Sebelumnya
                    // <TulisRekapFull value={toidr(totalAsetAwalX)} title={'Aset Bersih Awal'}  />
                }


                {/* Tulis Kenaikan (Penurunan) Aset Bersih */}
                
                {isCurrent ? 
                    
                    //Untuk bulan Aktif
                    (month === 3 ?
                       <TulisTotalRp value={toidr(saldoAwal)} /> 
                       :
                       <TulisTotalRp value={newTotalFinal} /> 
                    )
                    
                    :

                    //Untuk kolom bulan Sebelumnya
                    (month === 3 ?
                    //    <TulisTotalRpX value=toidr(saldoAwal) title={titleTotal} /> 
                       <TulisTotalRpX value={toidr(saldoAwal)} title={titleTotal} />
                       :
                       <TulisTotalRpX value={newTotalFinalX} title={titleTotal} />
                    )
                    
                }
                

                {/* Tulis Total Aset Bersih AKHIR */}
                <Divider />
       
                {isCurrent ?

                    (month === 3 ?
                       <TulisRekapBold value={toidr(totalAsetAwal+saldoAwal)}  />
                       :
                       <TulisRekapBold value={toidr(totalAsetAwal+saldoAwal+totalSelisihAB)}  />
                    )
                    
                    :
                    
                    (month === 3 ?
                       <TulisRekapFullBold value={toidr(totalAsetAwalX+saldoAwal)} title={'Total Aset Bersih Akhir'}  />
                       :
                       <TulisRekapFullBold value={toidr(totalAsetAwalX)} title={'Total Aset Bersih Akhir'}  />
                    )
                    
                    
                }
                
                {/* {totalAsetAkhir} */}

                {/* {month}

                {totalAsetAwal} <br />
                {totalTerima1} <br />
                {totalTerima2} <br />
                {totalBebanOp} <br />
                {totalBeban2} <br />
                {totalBeban3} <br /> */}



            </div>
        </>

    )
}

export default TotalAllAB;
