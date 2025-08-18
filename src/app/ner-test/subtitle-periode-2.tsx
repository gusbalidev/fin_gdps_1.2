"use client"

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

// Tulis subTitle, default = Periode bulan Aktif
export default function SubtitlePeriode2() {

    const { subTitle2, setSubTitle2 } = useNeracaSaldoContext();

    const currentMonthYear = new Date().toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric'
    });

    if (!subTitle2) {
        setSubTitle2('Periode: ' + currentMonthYear);
    }

    return (

        <div>
            {/* {filterType === "all" ? null :
                <h2>{subTitle}</h2>
            } */}
            <h2 className="text-xl text-blue-600 dark:text-orange-500">{subTitle2}</h2>
        </div>

    )


};
