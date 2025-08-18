"use client"

import { createContext, useContext, useState } from 'react';

// Create a context for managing financial activity data
// This context will hold current and previous financial data for an application
const AktivitasContext = createContext
    <{

        //current
        saldo1: number; setSaldo1: (type: number) => void;
        totalTerima1: number; setTotalTerima1: (type: number) => void;
        totalTerima2: number; setTotalTerima2: (type: number) => void;
        totalBebanOp: number; setTotalBebanOp: (type: number) => void;
        totalBeban2: number; setTotalBeban2: (type: number) => void;
        totalBeban3: number; setTotalBeban3: (type: number) => void;
        totalSelisihAB: number; setTotalSelisihAB: (type: number) => void;
        totalAsetAwal: number; setTotalAsetAwal: (type: number) => void;
        totalAsetAkhir: number; setTotalAsetAkhir: (type: number) => void;
        totalBP: number; setTotalBP: (type: number) => void;

        //before
        saldo1X: number; setSaldo1X: (type: number) => void;
        totalTerima1X: number; setTotalTerima1X: (type: number) => void;
        totalTerima2X: number; setTotalTerima2X: (type: number) => void;
        totalBebanOpX: number; setTotalBebanOpX: (type: number) => void;
        totalBeban2X: number; setTotalBeban2X: (type: number) => void;
        totalBeban3X: number; setTotalBeban3X: (type: number) => void;
        totalSelisihABX: number; setTotalSelisihABX: (type: number) => void;
        totalAsetAwalX: number; setTotalAsetAwalX: (type: number) => void;
        totalAsetAkhirX: number; setTotalAsetAkhirX: (type: number) => void;
        totalBPX: number; setTotalBPX: (type: number) => void;

        //before - all
        saldo1XX: number; setSaldo1XX: (type: number) => void;
        totalTerima1XX: number; setTotalTerima1XX: (type: number) => void;
        totalTerima2XX: number; setTotalTerima2XX: (type: number) => void;
        totalBebanOpXX: number; setTotalBebanOpXX: (type: number) => void;
        totalBeban2XX: number; setTotalBeban2XX: (type: number) => void;
        totalBeban3XX: number; setTotalBeban3XX: (type: number) => void;
        totalSelisihABXX: number; setTotalSelisihABXX: (type: number) => void;
        totalAsetAwalXX: number; setTotalAsetAwalXX: (type: number) => void;
        totalAsetAkhirXX: number; setTotalAsetAkhirXX: (type: number) => void;
        totalBPXX: number; setTotalBPXX: (type: number) => void;

    }>

    ({
        saldo1: 0, setSaldo1: () => { },
        totalTerima1: 0, setTotalTerima1: () => { },
        totalTerima2: 0, setTotalTerima2: () => { },
        totalBebanOp: 0, setTotalBebanOp: () => { },
        totalBeban2: 0, setTotalBeban2: () => { },
        totalBeban3: 0, setTotalBeban3: () => { },
        totalSelisihAB: 0, setTotalSelisihAB: () => { },
        totalAsetAwal: 0, setTotalAsetAwal: () => { },
        totalAsetAkhir: 0, setTotalAsetAkhir: () => { },
        totalBP: 0, setTotalBP: () => { },

        saldo1X: 0, setSaldo1X: () => { },
        totalTerima1X: 0, setTotalTerima1X: () => { },
        totalTerima2X: 0, setTotalTerima2X: () => { },
        totalBebanOpX: 0, setTotalBebanOpX: () => { },
        totalBeban2X: 0, setTotalBeban2X: () => { },
        totalBeban3X: 0, setTotalBeban3X: () => { },
        totalSelisihABX: 0, setTotalSelisihABX: () => { },
        totalAsetAwalX: 0, setTotalAsetAwalX: () => { },
        totalAsetAkhirX: 0, setTotalAsetAkhirX: () => { },
        totalBPX: 0, setTotalBPX: () => { },

        saldo1XX: 0, setSaldo1XX: () => { },
        totalTerima1XX: 0, setTotalTerima1XX: () => { },
        totalTerima2XX: 0, setTotalTerima2XX: () => { },
        totalBebanOpXX: 0, setTotalBebanOpXX: () => { },
        totalBeban2XX: 0, setTotalBeban2XX: () => { },
        totalBeban3XX: 0, setTotalBeban3XX: () => { },
        totalSelisihABXX: 0, setTotalSelisihABXX: () => { },
        totalAsetAwalXX: 0, setTotalAsetAwalXX: () => { },
        totalAsetAkhirXX: 0, setTotalAsetAkhirXX: () => { },
        totalBPXX: 0, setTotalBPXX: () => { },

    });

export function AktivitasProviderB({ children }: {
    children: React.ReactNode;
}) {
    const [saldo1, setSaldo1] = useState(0);
    const [totalTerima1, setTotalTerima1] = useState(0);
    const [totalTerima2, setTotalTerima2] = useState(0);
    const [totalBebanOp, setTotalBebanOp] = useState(0);
    const [totalBeban2, setTotalBeban2] = useState(0);
    const [totalBeban3, setTotalBeban3] = useState(0);
    const [totalSelisihAB, setTotalSelisihAB] = useState(0);
    const [totalAsetAwal, setTotalAsetAwal] = useState(0);
    const [totalAsetAkhir, setTotalAsetAkhir] = useState(0);
    const [totalBP, setTotalBP] = useState(0);

    const [saldo1X, setSaldo1X] = useState(0);
    const [totalTerima1X, setTotalTerima1X] = useState(0);
    const [totalTerima2X, setTotalTerima2X] = useState(0);
    const [totalBebanOpX, setTotalBebanOpX] = useState(0);
    const [totalBeban2X, setTotalBeban2X] = useState(0);
    const [totalBeban3X, setTotalBeban3X] = useState(0);
    const [totalSelisihABX, setTotalSelisihABX] = useState(0);
    const [totalAsetAwalX, setTotalAsetAwalX] = useState(0);
    const [totalAsetAkhirX, setTotalAsetAkhirX] = useState(0);
    const [totalBPX, setTotalBPX] = useState(0);

    const [saldo1XX, setSaldo1XX] = useState(0);
    const [totalTerima1XX, setTotalTerima1XX] = useState(0);
    const [totalTerima2XX, setTotalTerima2XX] = useState(0);
    const [totalBebanOpXX, setTotalBebanOpXX] = useState(0);
    const [totalBeban2XX, setTotalBeban2XX] = useState(0);
    const [totalBeban3XX, setTotalBeban3XX] = useState(0);
    const [totalSelisihABXX, setTotalSelisihABXX] = useState(0);
    const [totalAsetAwalXX, setTotalAsetAwalXX] = useState(0);
    const [totalAsetAkhirXX, setTotalAsetAkhirXX] = useState(0);
    const [totalBPXX, setTotalBPXX] = useState(0);

    return (
        <AktivitasContext.Provider value={{
            saldo1, setSaldo1,
            totalTerima1, setTotalTerima1,
            totalTerima2, setTotalTerima2,
            totalBebanOp, setTotalBebanOp,
            totalBeban2, setTotalBeban2,
            totalBeban3, setTotalBeban3,
            totalSelisihAB, setTotalSelisihAB,
            totalAsetAwal, setTotalAsetAwal,
            totalAsetAkhir, setTotalAsetAkhir,
            totalBP, setTotalBP,

            saldo1X, setSaldo1X,
            totalTerima1X, setTotalTerima1X,
            totalTerima2X, setTotalTerima2X,
            totalBebanOpX, setTotalBebanOpX,
            totalBeban2X, setTotalBeban2X,
            totalBeban3X, setTotalBeban3X,
            totalSelisihABX, setTotalSelisihABX,
            totalAsetAwalX, setTotalAsetAwalX,
            totalAsetAkhirX, setTotalAsetAkhirX,
            totalBPX, setTotalBPX,

            saldo1XX, setSaldo1XX,
            totalTerima1XX, setTotalTerima1XX,
            totalTerima2XX, setTotalTerima2XX,
            totalBebanOpXX, setTotalBebanOpXX,
            totalBeban2XX, setTotalBeban2XX,
            totalBeban3XX, setTotalBeban3XX,
            totalSelisihABXX, setTotalSelisihABXX,
            totalAsetAwalXX, setTotalAsetAwalXX,
            totalAsetAkhirXX, setTotalAsetAkhirXX,
            totalBPXX, setTotalBPXX,
        }}>
            {children}
        </AktivitasContext.Provider>
    )

}

export default function useAktivitasContextB() {
    const context = useContext(AktivitasContext);
    if (!context) {
        throw new Error(
            "useAktivitasContextB must be used within a AktivitasProvider"
        );
    }
    return context;
}
