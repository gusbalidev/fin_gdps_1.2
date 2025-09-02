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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link"
import useAktivitasContext from "@/context/aktivitas-context"
import HitungSelisih from "@/app/neraca/hitung-selisih"
import { getMonth } from "date-fns"

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

    // Save start and end dates
    const today = new Date();
    // const start = new Date(today.getFullYear(), today.getMonth(), 1)
    //     .toISOString().split('T')[0];
    // const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // const end = lastDay.toISOString().split('T')[0];

    const start = "2025-08-01"
    const end = "2025-08-31"

    console.log('Start Date:', start);
    console.log('End Date:', end);

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3
    } = useAktivitasContext();

    console.log('Total Terima 1:', totalTerima1);

    const chartData = [
        { month: "January", in: totalTerima1, out: totalBebanOp },
        { month: "February", in: totalTerima2, out: totalBeban2 },
        { month: "March", in: 237, out: 120 },
        { month: "April", in: 73, out: 190 },
        { month: "May", in: 209, out: 130 },
        { month: "June", in: 214, out: 140 },
    ]
    return (
        <>
            <HitungSelisih title="Penerimaan 1" type={4} group2={8} start={start} end={end} />
            <HitungSelisih title="Penerimaan 2" type={4} group2={9} start={start} end={end} />
            <HitungSelisih title="Beban 1" type={5} group2={10} start={start} end={end} />
            <HitungSelisih title="Beban 2" type={5} group2={11} start={start} end={end} />
            <HitungSelisih title="Beban 3" type={5} group2={12} start={start} end={end} />

            <Card>
                <CardHeader>
                    <CardTitle>Pemasukan / Pengeluaran untuk 6 bulan terakhir</CardTitle>
                    <CardDescription>2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            {/* <Bar dataKey="in" fill="blue" radius={4} />
                        <Bar dataKey="out" fill="red-[]" radius={4} /> */}
                            <Bar dataKey="in" fill="var(--color-in)" radius={4} />
                            <Bar dataKey="out" fill="var(--color-out)" radius={4} />
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
