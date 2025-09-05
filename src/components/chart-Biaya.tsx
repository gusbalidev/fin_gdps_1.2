"use client"

import { LabelList, Pie, PieChart } from "recharts"

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
import CountCashFlow from "./countCashFlow"
import React from "react"

export const description = "A pie chart with a legend"

// const chartData = [
//   { b: "biaya_op", value: 100, fill: "var(--color-biaya_op)" },
//   { b: "biaya_sekre", value: 200, fill: "var(--color-biaya_sekre)" },
//   { b: "biaya_bid", value: 187, fill: "var(--color-biaya_bid)" },
// ]

const color1 = "red"
const color2 = "blue"
const color3 = "green"

const chartConfig = {
  biaya_op: {
    label: "Operasional",
    color: color1,
  },
  biaya_sekre: {
    label: "Sekretariat",
    color: color2,
  },
  biaya_bid: {
    label: "Bidang / Bapel",
    color: color3,
  },
} satisfies ChartConfig



export function ChartBiaya() {

  
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
      
      // Get dates for last month
      const month1 = getMonthDates(1); // Last Month  
  
      // Hitung Data Biaya
      const biaya1 = CountCashFlow( { title: "Bia1", type: 5, group2: 10, start: month1.start, end: month1.end, } ) ;
      const biaya2 = CountCashFlow( { title: "Bia2", type: 5, group2: 11, start: month1.start, end: month1.end, } ) ;
      const biaya3 = CountCashFlow( { title: "Bia3", type: 5, group2: 12, start: month1.start, end: month1.end, } ) ;
      
      // Safely get number from CountCashFlow result
      const getNumber = (val: number | React.JSX.Element) =>
        typeof val === "number" ? val : 0;
      
      const totalBiaya = getNumber(biaya1) + getNumber(biaya2) + getNumber(biaya3);

      // Total Biaya
      // const biaya = getNumber(biaya1a) + getNumber(biaya1b) + getNumber(biaya1c); // Current month

      // Month labels
      const monthText1 = new Date(month1.start).toLocaleString('id-ID', { month: 'long' }); // Current month
  
      // Prepare data for the chart
      const chartData = [
          { x: 'Operasional', value: biaya1, fill: color1 }, 
          { x: 'Sekretariat', value: biaya2, fill: color2 },
          { x: 'Bidang/Bapel', value: biaya3, fill: color3 },
      ]

      const monthYear = `${monthText1} ${today.getFullYear()}`;


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pengeluaran / Biaya-biaya</CardTitle>
        <CardDescription>{monthYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig} className="mx-auto h-auto"
        >
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="x"/>
            <LabelList
                dataKey="x"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />  
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" nameKey="x" hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent nameKey="x" />} />
          </PieChart>
          
        </ChartContainer>
        
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 text-sm">
        
        <div className="font-muted font-medium">
            Cek Laporan Detail <Link className="text-blue-500" href={"/cashflow"} target="_blank">DISINI</Link>
        </div>
    </CardFooter>
    </Card>
  )
}
