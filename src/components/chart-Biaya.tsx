"use client"

import { Pie, PieChart } from "recharts"

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

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "biaya_op", x: 100, fill: "var(--color-biaya_op)" },
  { browser: "biaya_sekre", x: 200, fill: "var(--color-biaya_sekre)" },
  { browser: "biaya_bid", x: 187, fill: "var(--color-biaya_bid)" },
]

const color1 = "#118aed"
const color2 = "#c15cf7"
const color3 = "#f7aa5c"

const chartConfig = {
  x: {
    label: "X",
  },
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
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Biaya-biaya</CardTitle>
        <CardDescription>Agustus 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig} className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="x" />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="font-muted font-medium">
            Cek Laporan Detail <Link className="text-blue-500" href={"/cashflow"} target="_blank">DISINI</Link>
        </div>
    </CardFooter>
    </Card>
  )
}
