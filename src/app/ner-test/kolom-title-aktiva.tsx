import React from 'react'

import { TulisTitle, TulisTitleBold, TulisTotal } from './titles';

export default function KolomTitleAktiva() {
    return (
        <>
            <AktivaLancar />
            <AktivaTidakLancar />
            <AktivaTetap />
            <AkumulasiPenyusutan />
            <AktivaTetapBersih />
        </>
    )
}

function AktivaLancar() {
    return (
        <>
            <div className="w-full mb-3">
                <TulisTitleBold title="AKTIVA LANCAR" />
                {/* -- */}
                <div>
                <TulisTitle title="KAS" />
                <TulisTitle title="BANK" />
                <TulisTitle title="DEPOSITO" />
                <TulisTitle title="BON SEMENTARA BIDANG" />
                <TulisTitle title="BON SEMENTARA BAPEL" />
                <TulisTitle title="PIUTANG KARYAWAN" />
                <TulisTitle title="PIUTANG JEMAAT" />
                <TulisTitle title="RELOKASI" />
                <TulisTitle title="BIAYA DIBAYAR DIMUKA" />
                </div>
                {/* sub total */}
                <TulisTotal title="Total AKTIVA LANCAR" />
            </div>
        </>
    )
};

//
function AktivaTidakLancar() {
    return (
        <>
            <div className="w-full mb-3">
                <TulisTitleBold title="AKTIVA TIDAK LANCAR" />
                {/* -- */}
                <TulisTitle title="TANAH DALAM PENYELESAIAN" />
                <TulisTitle title="GEDUNG DALAM PENYELESAIAN" />
                {/* sub total */}
                <TulisTotal title="Total AKTIVA TIDAK LANCAR" />
            </div>
        </>
    )
};


//
function AktivaTetap() {
    return (
        <>
            <div className="w-full mb-3">
                <TulisTitleBold title="AKTIVA TETAP" />
                {/* -- */}
                <TulisTitle title="TANAH" />
                <TulisTitle title="BANGUNAN" />
                <TulisTitle title="KENDARAAN" />
                <TulisTitle title="INVENTARIS" />
                {/* sub total */}
                <TulisTotal title="Total AKTIVA TETAP" />
            </div>
        </>
    )
};

function AkumulasiPenyusutan() {
    return (
        <>
            <div className="w-full mb-3">
                <TulisTotal title="AKUMULASI PENYUSUTAN" />
            </div>
        </>
    )
}

function AktivaTetapBersih() {
    return (
        <>
            <div className="w-full">
                <TulisTotal title="Total Aktiva Tetap Bersih" />
            </div>
        </>
    )
}