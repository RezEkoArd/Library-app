"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "Distribusi Buku Berdasarkan Kategori"

const chartData = [
  { category: "Fiksi", total: 120, fill: "var(--chart-1)" },
  { category: "Non-Fiksi", total: 80, fill: "var(--chart-2)" },
  { category: "Sains", total: 65, fill: "var(--chart-3)" },
  { category: "Teknologi", total: 100, fill: "var(--chart-4)" },
  { category: "Lainnya", total: 30, fill: "var(--chart-5)" },
]

const chartConfig = {
  total: {
    label: "Jumlah Buku",
  },
  fiksi: {
    label: "Fiksi",
    color: "var(--chart-1)",
  },
  "non-fiksi": {
    label: "Non-Fiksi",
    color: "var(--chart-2)",
  },
  sains: {
    label: "Sains",
    color: "var(--chart-3)",
  },
  teknologi: {
    label: "Teknologi",
    color: "var(--chart-4)",
  },
  lainnya: {
    label: "Lainnya",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function DashboardPieChart() {
  const totalBooks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Buku per Kategori</CardTitle>
        <CardDescription>Statistik per Juli 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalBooks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Buku
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Tren naik 5.2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Menampilkan jumlah buku dari semua kategori
        </div>
      </CardFooter>
    </Card>
  )
}
