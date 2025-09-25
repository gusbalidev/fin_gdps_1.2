'use client';

import { Button } from '@/components/ui/button';
import useNeracaSaldoContext from '@/context/neraca-saldo-context';
import React, { useState } from 'react'

export default function BlokPeriode() {
    // const [periodType, setPeriodType] = useState<'M' | 'Y'>('M');
    const { periodType, setPeriodType, setIsClosing } = useNeracaSaldoContext();

    return (
        <>
            <div className="flex gap-2 mb-4 py-3">
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
        </>
    )
}

