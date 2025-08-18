'use client'

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
// import ShowNSData from "./neraca-t/page-data";

interface YearSelectorProps {
  DataComponent: React.ComponentType;
}

// const YearSelector = () => {
const YearSelector = ({ DataComponent }: YearSelectorProps) => {
    const btnCaption = 'Tampilkan';
    const { setSubTitle, setStartContext, setEndContext, 
        titleMonthYear, titlePrevMonthYear, setTitleMonthYear, setPrevTitleMonthYear } = useNeracaSaldoContext();

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const years = Array.from(
        { length: 4 }, 
        (_, i) => (currentYear + (1 - i)).toString()
    );

   // Set default values: lastYear for yearFrom, currentYear for yearTo
   const [yearFrom, setYearFrom] = useState(currentYear.toString());
    const [yearTo, setYearTo] = useState(nextYear.toString());
    const [showComponent, setShowComponent] = useState(false);

    const updateDateRange = useCallback((fromYear: string, toYear: string) => {
        
        // Set start date : 1 April fromYear
        setStartContext(`${fromYear}-04-01`);

        // Set end date: 31 Maret toYear
        setEndContext(`${toYear}-03-31`);
        
        // Update subtitle with the year range
        setSubTitle(`Periode: 1 April ${fromYear} - 31 Maret ${toYear}`);

        setTitleMonthYear('Per 31 Maret '+toYear);
        setPrevTitleMonthYear('Per 31 Maret '+fromYear);
    }, [setStartContext, setEndContext, setSubTitle, setTitleMonthYear, setPrevTitleMonthYear]);

    // Update date range when yearFrom or yearTo changes
    React.useEffect(() => {
        updateDateRange(yearFrom, yearTo);
        setShowComponent(false);
    }, [yearFrom, yearTo, updateDateRange, setShowComponent]);

    const handleYearFromChange = useCallback((value: string) => {
        const newYearFrom = value;
        // Check if selected year is current year
        const newYearTo = (parseInt(value) === currentYear) 
            ? (currentYear + 1).toString() 
            : (parseInt(value) + 1).toString();
        setYearFrom(newYearFrom);
        setYearTo(newYearTo);
        updateDateRange(newYearFrom, newYearTo);
        setShowComponent(true);
    }, [currentYear, updateDateRange]);

    const handleYearToChange = useCallback((value: string) => {
        const newYearTo = value;
        const newYearFrom = (parseInt(value) - 1).toString();
        setYearFrom(newYearFrom);
        setYearTo(newYearTo);
        updateDateRange(newYearFrom, newYearTo);
        setShowComponent(true);
    }, [updateDateRange]);
    
    const handleButtonClick = () => {
        setShowComponent(true);
    };

    return (
        <>
            <div className="flex gap-4 py-1">
                <div className="w-300 flex-none">
                    <Select onValueChange={handleYearFromChange} value={yearFrom}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tahun Awal" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearValue) => (
                                <SelectItem 
                                    key={yearValue} 
                                    value={yearValue}
                                    // disabled={parseInt(yearValue) >= currentYear}
                                >
                                    {yearValue}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-300 flex-none">
                    <Select onValueChange={handleYearToChange} value={yearTo}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tahun Akhir" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearValue) => (
                                <SelectItem 
                                    key={yearValue} 
                                    value={yearValue}
                                    disabled={parseInt(yearValue) <= parseInt(yearFrom)}
                                >
                                    {yearValue}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant={'outline'} onClick={handleButtonClick}>{btnCaption}</Button>
            </div>

            <div>
                {/* {showComponent && <ShowNSData />} */}
                {showComponent && <DataComponent />}
            </div>
        </>
    );
};

export default YearSelector;