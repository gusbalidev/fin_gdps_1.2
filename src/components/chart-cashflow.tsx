"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link"
import { useState } from "react"
import CountCashFlow from "./countCashFlow"

export const description = "A multiple bar chart"

const Color1 = "#15d1a5ff"
const Color2 = "#db5b34ff"

const chartConfig = {
    in: {
        label: "Pemasukan",
        color: Color1,
    },
    out: {
        label: "Pengeluaran",
        color: Color2,
    },
} satisfies ChartConfig

export function ChartCashflow() {

    const [values, setValues] = useState({
        pen1a: 0,
        pen1b: 0,
        pen2a: 0,
        pen2b: 0,
        pen3a: 0,
        pen3b: 0,
    });

    // Save start and end dates
    const today = new Date();

    // Helper function to get start and end of month
    const getMonthDates = (monthsAgo: number) => {
        const year = today.getFullYear();
        const month = today.getMonth() - monthsAgo;
        const start = new Date(year, month, 1+1);
        const end = new Date(year, month + 1, 0+1);
        return {
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0]
        };
    };    
    
    // Get dates for last 3 months
    const month1 = getMonthDates(1); // Last Month
    const month2 = getMonthDates(2); // 2 month ago
    const month3 = getMonthDates(3); // 3 months ago
    // const month4 = getMonthDates(3);
        

    // Hitung Data Penerimaan
    const pen1a = CountCashFlow( { title: "Pen1a", type: 4, group2: 8, start: month1.start, end: month1.end, } ) ;
    const pen1b = CountCashFlow( { title: "Pen1b", type: 4, group2: 9, start: month1.start, end: month1.end, } ) ;
    
    const pen2a = CountCashFlow( { title: "Pen2a", type: 4, group2: 8, start: month2.start, end: month2.end, } ) ;
    const pen2b = CountCashFlow( { title: "Pen2b", type: 4, group2: 9, start: month2.start, end: month2.end, } ) ;
    
    const pen3a = CountCashFlow( { title: "Pen3a", type: 4, group2: 8, start: month3.start, end: month3.end, } ) ;
    const pen3b = CountCashFlow( { title: "Pen3b", type: 4, group2: 9, start: month3.start, end: month3.end, } ) ;


    // Hitung Data Biaya
    const biaya1a = CountCashFlow( { title: "Bia1a", type: 5, group2: 10, start: month1.start, end: month1.end, } ) ;
    const biaya1b = CountCashFlow( { title: "Bia1a", type: 5, group2: 11, start: month1.start, end: month1.end, } ) ;
    const biaya1c = CountCashFlow( { title: "Bia1a", type: 5, group2: 12, start: month1.start, end: month1.end, } ) ;

    const biaya2a = CountCashFlow( { title: "Bia2a", type: 5, group2: 10, start: month2.start, end: month2.end, } ) ;
    const biaya2b = CountCashFlow( { title: "Bia2b", type: 5, group2: 11, start: month2.start, end: month2.end, } ) ;
    const biaya2c = CountCashFlow( { title: "Bia2c", type: 5, group2: 12, start: month2.start, end: month2.end, } ) ;

    const biaya3a = CountCashFlow( { title: "Bia3a", type: 5, group2: 10, start: month3.start, end: month3.end, } ) ;
    const biaya3b = CountCashFlow( { title: "Bia3b", type: 5, group2: 11, start: month3.start, end: month3.end, } ) ;
    const biaya3c = CountCashFlow( { title: "Bia3c", type: 5, group2: 12, start: month3.start, end: month3.end, } ) ;

    // Safely get number from CountCashFlow result
    const getNumber = (val: number | React.JSX.Element) =>
        typeof val === "number" ? val : 0;
    
    // Total Penerimaan
    const pen1 = getNumber(pen1a) + getNumber(pen1b); // Current month
    const pen2 = getNumber(pen2a) + getNumber(pen2b); // Last month
    const pen3 = getNumber(pen3a) + getNumber(pen3b); // 2 months ago

    // Total Biaya
    const biaya1 = getNumber(biaya1a) + getNumber(biaya1b) + getNumber(biaya1c); // Current month
    const biaya2 = getNumber(biaya2a) + getNumber(biaya2b) + getNumber(biaya2c); // Last month
    const biaya3 = getNumber(biaya3a) + getNumber(biaya3b) + getNumber(biaya3c); // 2 months ago

    // Month labels
    const monthText1 = new Date(month1.start).toLocaleString('id-ID', { month: 'long' }); // Current month
    const monthText2 = new Date(month2.start).toLocaleString('id-ID', { month: 'long' }); // Last month
    const monthText3 = new Date(month3.start).toLocaleString('id-ID', { month: 'long' }); // 2 months ago

    // Prepare data for the chart
    const chartData = [
        { month: monthText3, in: pen3, out: biaya3 }, // 2 months ago
        { month: monthText2, in: pen2, out: biaya2 }, // last month
        { month: monthText1, in: pen1, out: biaya1 }, // current month
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Pemasukan / Pengeluaran untuk 3 bulan terakhir</CardTitle>
                    {/* <CardDescription>2025</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <ChartContainer config={chartConfig}>        
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={true} />
                            <XAxis                                
                                dataKey="month"
                                tickLine={true}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="in" fill="var(--color-in)" radius={4} />
                            <Bar dataKey="out" fill="var(--color-out)" radius={4} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {/* <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div> */}
                    <div className="font-muted font-medium">
                        Cek Detail <Link className="text-blue-500" href={"/cashflow"} target="_blank">DISINI</Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}




