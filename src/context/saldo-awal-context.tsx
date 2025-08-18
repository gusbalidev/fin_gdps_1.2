"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
const SaldoAwalContext = createContext
    <{
        totalTerima: number; setTotalTerima: (type: number) => void;
        saldoAwal: number; setSaldoAwal: (type: number) => void;
        saldoAwal2: number; setSaldoAwal2: (type: number) => void;
        saldoAwalX: number; setSaldoAwalX: (type: number) => void;
    }>

    ({
        totalTerima: 0,
        saldoAwal: 0,
        saldoAwal2: 0,
        saldoAwalX: 0,
        setTotalTerima: () => { },
        setSaldoAwal: () => { },
        setSaldoAwal2: () => { },
        setSaldoAwalX: () => { },

    });

export function SaldoAwalProvider({ children }: {
    children: React.ReactNode;
}) {

    const [totalTerima, setTotalTerima] = useState(0);
    const [saldoAwal, setSaldoAwal] = useState(0);
    const [saldoAwal2, setSaldoAwal2] = useState(0);
    const [saldoAwalX, setSaldoAwalX] = useState(0);

    return (
        <SaldoAwalContext.Provider value={{
            totalTerima, setTotalTerima,
            saldoAwal, setSaldoAwal,
            saldoAwal2, setSaldoAwal2,
            saldoAwalX, setSaldoAwalX
        }}>
            {children}
        </SaldoAwalContext.Provider>
    )

}

export default function useSaldoAwalContext() {
    const context = useContext(SaldoAwalContext);
    if (!context) {
        throw new Error(
            "useSaldoAwalContext must be used within a SaldoAwalProvider"
        );
    }
    return context;
}
