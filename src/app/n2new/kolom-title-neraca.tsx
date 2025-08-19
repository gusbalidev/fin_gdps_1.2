import React from 'react'

import JustTitle from '@/lib/just-title'
// import { JustTitleNoline } from '@/lib/just-title-noline';
import { JustTitleNoline, JustTitleNoline2 } from './title-value';

import Divider from '@/components/Divider';

export default function KolomTitleNera() {
    // const { subTitle } = useNeracaSaldoContext();
    return (
        <>
            <div className="w-full">

                <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">AKTIVA</h2>
                <Divider />

                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA LANCAR</h2>
                <JustTitleNoline title="KAS" />
                <JustTitleNoline title="BANK" />
                <JustTitleNoline title="DEPOSITO" />
                <JustTitleNoline title="BON SEMENTARA BIDANG" />
                <JustTitleNoline title="BON SEMENTARA BAPEL" />
                <JustTitleNoline title="PIUTANG KARYAWAN" />
                <JustTitleNoline title="PIUTANG JEMAAT" />
                <JustTitleNoline title="PIUTANG RELOKASI" />
                <JustTitleNoline title="BIAYA DIBAYAR DIMUKA" />
                <JustTitle title="Total Aktiva Lancar" />

                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA TIDAK LANCAR</h2>
                <JustTitleNoline title="TANAH DALAM PENYELESAIAN" />
                <JustTitleNoline title="GEDUNG DALAM PENYELESAIAN" />
                <JustTitle title="Total Aktiva Tidak Lancar" />

                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA TETAP</h2>
                <JustTitleNoline title="TANAH" />
                <JustTitleNoline title="BANGUNAN" />
                <JustTitleNoline title="KENDARAAN" />
                <JustTitleNoline title="INVENTARIS" />
                <JustTitle title="Total Aktiva Tetap" />

                <br />
                <JustTitleNoline title="Akumulasi Penyusutan" />
                <JustTitle title="Total Aktiva Tetap bersih" />
                
                <br />
                <Divider />
                <JustTitleNoline2 title="Total AKTIVA"/>

                <br />
                <h2 className="text-start text-2xl text-blue-600 dark:text-orange-600 font-bold">PASIVA</h2>
                <Divider />

                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">KEWAJIBAN</h2>
                <JustTitleNoline title="HUTANG BIAYA" />
                <JustTitleNoline title="HUTANG LAIN-LAIN" />
                <JustTitleNoline title="KEWAJIBAN JANGKA PANJANG" />
                <JustTitle title="Total Kewajiban" />

                <br />
                <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">ASET BERSIH</h2>
                <JustTitleNoline title="Aset Bersih Awal" />
                <JustTitleNoline title="Kenaikan (Penurunan) Aset Bersih" />
                <JustTitle title="Total Aset Bersih Akhir" />

                <br />
                <Divider />
                <JustTitleNoline2 title="Total PASIVA"/>

            </div>
        </>
    )
}

