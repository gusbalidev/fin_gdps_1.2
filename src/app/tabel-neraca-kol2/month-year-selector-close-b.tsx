'use client'

import React, { useState, useCallback, useMemo } from 'react';

import global from "@/config.js";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useNeracaSaldoContextB from '@/context/neraca-saldo-context-b';

// Import the component to be displayed
interface MonthYearSelectorProps {
    DataComponent: React.ComponentType;
}

// MonthYearSelector component that accepts a DataComponent prop
const MonthYearSelectorB = ({ DataComponent }: MonthYearSelectorProps) => {
    const btnCaption = global.btnCaption.hitung;
    const { start, end, setIsClosing, setSubTitle2, setStartContext, setEndContext, setPrevStartContext, setPrevEndContext,
        setTitleMonthYear, setPrevTitleMonthYear } = useNeracaSaldoContextB();

    const currentMonthIndex = new Date().getMonth(); // Get current month index (0-11)
    const currentYear = new Date().getFullYear(); // Get current year
    const years = Array.from({ length: global.app.maxYearBack + 1 }, (_, i) => (currentYear - i).toString()); // Generate years

    const monthNames = useMemo(() => [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ], []);
    const [month, setMonth] = useState(monthNames[currentMonthIndex]); // Set default to current month

    //const [month, setMonth] = useState('');
    const currentYearString = currentYear.toString();
    const [year, setYear] = useState(currentYearString);
    const [showComponent, setShowComponent] = useState(false);

    const [selectedPeriod, setSelectedPeriod] = useState(`${month} ${year}`); // New state for selected period

    const [startDate, setStartDate] = useState(`${currentYearString}-01-01`); // Initialize with the first day of the current year
    const [endDate, setEndDate] = useState(`${currentYearString}-01-31`); // Initialize with the last day of January

    const [previousStartDate, setPreviousStartDate] = useState(''); // New state for previous start date
    const [previousEndDate, setPreviousEndDate] = useState(''); // New state for previous end date

    const updateStartAndEndDate = useCallback((month: string, year: string) => {
        const monthIndex = monthNames.indexOf(month) + 1; // Get month index (1-12)
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex; // Format month to two digits

        // Calculate the last day of the month
        const lastDay = new Date(parseInt(year), monthIndex, 0).getDate(); // Get the last day of the month

        setStartDate(`${year}-${formattedMonth}-01`); // Set start date to the first day of the month
        setEndDate(`${year}-${formattedMonth}-${lastDay}`); // Set end date to the last day of the month

        // Calculate previous month and year
        const previousMonthIndex = monthIndex === 1 ? 12 : monthIndex - 1;
        const previousYear = monthIndex === 1 ? parseInt(year) - 1 : parseInt(year);
        const formattedPreviousMonth = previousMonthIndex < 10 ? `0${previousMonthIndex}` : previousMonthIndex;
        const lastDayOfPreviousMonth = new Date(previousYear, previousMonthIndex, 0).getDate();

        setPreviousStartDate(`${previousYear}-${formattedPreviousMonth}-01`); // Set previous start date
        setPreviousEndDate(`${previousYear}-${formattedPreviousMonth}-${lastDayOfPreviousMonth}`); // Set previous end date

        // set: start - end date-range
        setStartContext(`${year}-${formattedMonth}-01`);
        setEndContext(`${year}-${formattedMonth}-${lastDay}`);

        // set: startPrev - endPrev date-range
        setPrevStartContext(`${previousYear}-${formattedPreviousMonth}-01`);
        setPrevEndContext(`${previousYear}-${formattedPreviousMonth}-${lastDayOfPreviousMonth}`);

        // Convert formattedPreviousMonth to local month name
        const localPreviousMonthName = monthNames[previousMonthIndex - 1];
        const previousYearString = previousYear.toString();
        setTitleMonthYear(selectedPeriod);
        setPrevTitleMonthYear(localPreviousMonthName + ' ' + previousYearString);

    }, [
        monthNames,
        selectedPeriod,
        setStartContext,
        setEndContext,
        setPrevStartContext,
        setPrevEndContext,
        setTitleMonthYear,
        setPrevTitleMonthYear,
        setStartDate,
        setEndDate,
        setPreviousStartDate,
        setPreviousEndDate
    ]);

    React.useEffect(() => {
        // updateStartAndEndDate(month, year); // Calculate start and end dates, including previous month
        setSubTitle2(selectedPeriod);
        setShowComponent(false);
    }, [month, year, updateStartAndEndDate, setSubTitle2, selectedPeriod]);

    const handleMonthChange = (value: string) => {
        setMonth(value);
        setSelectedPeriod(`${value} ${year}`); // Update selected period
        updateStartAndEndDate(value, year); // Update start date
        setSubTitle2(selectedPeriod);
        setShowComponent(true);
        setIsClosing(false);
        //refreshPath();
    };

    const handleYearChange = (value: string) => {
        setYear(value);
        setSelectedPeriod(`${month} ${value}`); // Update selected period
        updateStartAndEndDate(month, value); // Update start date
        setSubTitle2(selectedPeriod);
        setShowComponent(true);
        setIsClosing(false);
        //refreshPath();
    };

    const handleButtonClick = () => {
        setSubTitle2(selectedPeriod);
        setShowComponent(true);
        //refreshPath();
    };

    return (
        <>
            <div className="flex gap-3 py-2">
                <div className="w-600 flex-none">
                    {/* <div className="flex justify-normal space-x-2 mt-2 mb-2"> */}
                    <Select onValueChange={handleMonthChange} value={month}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {monthNames.map((monthName, index) => (
                                <SelectItem key={index} value={monthName}>
                                    {monthName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-300 flex-none">
                    <Select onValueChange={handleYearChange} value={year}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearValue) => (
                                <SelectItem key={yearValue} value={yearValue}>
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
                {/* Tampilkan Component */}
                {showComponent && <DataComponent />}
            </div>
        </>
    );
};


export default MonthYearSelectorB;