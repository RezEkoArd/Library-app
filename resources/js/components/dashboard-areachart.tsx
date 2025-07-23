"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  fisik: {
    label: "Fisik",
    color: "var(--chart-2)",
  },
  digital: {
    label: "Digital",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", fisik: 120, digital: 80 },
  { month: "February", fisik: 150, digital: 95 },
  { month: "March", fisik: 200, digital: 110 },
  { month: "April", fisik: 100, digital: 60 },
  { month: "May", fisik: 130, digital: 70 },
  { month: "June", fisik: 180, digital: 90 },
];

const DashboardAreaChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Peminjaman Buku per Bulan</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id="fillFisik" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-fisik)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-fisik)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillDigital" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-digital)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-digital)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="digital"
            type="natural"
            fill="url(#fillDigital)"
            fillOpacity={0.4}
            stroke="var(--color-digital)"
            stackId="a"
          />
          <Area
            dataKey="fisik"
            type="natural"
            fill="url(#fillFisik)"
            fillOpacity={0.4}
            stroke="var(--color-fisik)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default DashboardAreaChart;