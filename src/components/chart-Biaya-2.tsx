"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CountCashFlow from "./countCashFlow"

export const description = "An interactive pie chart"

// const desktopData = [
//   { month: "january", value: 186, fill: "var(--color-january)" },
//   { month: "february", value: 305, fill: "var(--color-february)" },
//   { month: "march", value: 237, fill: "var(--color-march)" },

// ]

const color1 = "purple"
const color2 = "blue"
const color3 = "orange"

const chartConfig = {
  visitors: {
    label: "Total",
  },
  value: {
    label: "Value",
  },
  mobile: {
    label: "Mobile",
  },
  b1: {
    label: "Operasional",
    color: color1,
  },
  b2: {
    label: "Sekretariat",
    color: color2,
  },
  b3: {
    label: "Bidang/Bapel",
    color: color3,
  },

} satisfies ChartConfig

export function ChartBiaya2() {

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

  const desktopData = [
  { label:'Operasional', b: "b1", value: biaya1, fill: color1 },
  { label:'Sekretariat', b: "b2", value: biaya2, fill: color2 },
  { label:'Bidang/Bapel', b: "b3", value: biaya3, fill: color3 },
  ]

  const total = (typeof biaya1 === "number" ? biaya1 : 0) + (typeof biaya2 === "number" ? biaya2 : 0) + (typeof biaya3 === "number" ? biaya3 : 0)
  const totalRp = `Rp. ${total.toLocaleString()}`
  const title = "Distribusi Biaya / Pengeluaran"
  // Month labels
  // const today = new Date();
  const currentMonth = new Date().getMonth(); // Current month index (0-11)
  const monthText = new Date(today.getFullYear(), currentMonth-1).toLocaleString('id-ID', { month: 'long' })+` ${today.getFullYear()}`  ;
  // const monthText1 = new Date(currentMonth).toLocaleString('id-ID', { month: 'long' }); // Current month
  // const monthYear = `${monthText1} ${today.getFullYear()}`;

  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].b)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.b === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.b), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{monthText}</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Biaya:"
          >
            <SelectValue placeholder="Pilih" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto h-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="value"
              nameKey="b"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-sm font-bold"
                        >
                          {desktopData[activeIndex].value.toLocaleString()}
                        </tspan>
                            
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[0.7rem]"
                        >
                        {desktopData[activeIndex].label}
                        </tspan>
                      </text>

                   
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
          <div>
            <p className="text-sm">Total Biaya / Pengeluaran: </p>
            <p className="font-bold">{totalRp}</p>
          </div>
      </CardContent>
    </Card>
  )
}
