"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
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

const color1 = "DarkOrange"
const color2 = "RoyalBlue"

const chartConfig = {

  p1: {
    label: "Persembahan",
    color: color1,
  },
  p2: {
    label: "Lain-lain",
    color: color2,
  },

} satisfies ChartConfig

export function ChartPenerimaan() {

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

  const pen1 = CountCashFlow( { title: "Pen1", type: 4, group2: 8, start: month1.start, end: month1.end, } ) ;
  const pen2 = CountCashFlow( { title: "Pen2", type: 4, group2: 9, start: month1.start, end: month1.end, } ) ;

  const dataSource = [
  { label:'Persembahan', b: "p1", value: pen1, fill: color1 },
  { label:'Lain-lain', b: "p2", value: pen2, fill: color2 },
  ]

  const total = (typeof pen1 === "number" ? pen1 : 0) + (typeof pen2 === "number" ? pen2 : 0) 
  const totalNonRp = total.toLocaleString()
  const totalRp = `Rp. ${total.toLocaleString()}`
  const title = "Distribusi Penerimaan"
  // Month labels
  // const today = new Date();
  const currentMonth = new Date().getMonth(); // Current month index (0-11)
  const monthText = new Date(today.getFullYear(), currentMonth-1).toLocaleString('id-ID', { month: 'long' })+` ${today.getFullYear()}`  ;
  // const monthText1 = new Date(currentMonth).toLocaleString('id-ID', { month: 'long' }); // Current month
  // const monthYear = `${monthText1} ${today.getFullYear()}`;

  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(dataSource[0].b)

  const activeIndex = React.useMemo(
    () => dataSource.findIndex((item) => item.b === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => dataSource.map((item) => item.b), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1 pb-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{monthText}</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Penerimaan:"
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
              data={dataSource}
              dataKey="value"
              nameKey="b"
              innerRadius={50}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 6} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 20}
                    innerRadius={outerRadius + 9}
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
                          {/* {dataSource[activeIndex].value.toLocaleString()} */}
                          {totalNonRp}
                        </tspan>
                            
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[0.7rem]"
                        >
                        {dataSource[activeIndex].label}
                        </tspan> */}
                      </text>

                   
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
          <div>
            <br />
            {/* <p className="text-sm py-2">Total Penerimaan: {totalRp}</p> */}
            <div>
            <ul className="list-disc list-inside">
              {dataSource.map((item) => (
                <p key={item.b} className="text-sm">
                  <span
                    className="inline-block h-3 w-3 mr-2 rounded-xs align-middle"
                    style={{ backgroundColor: `var(--color-${item.b})` }}
                  ></span>
                  {item.label}: Rp. {typeof item.value === "number" ? item.value.toLocaleString() : 0} 
                </p>
              ))}
            </ul>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}
