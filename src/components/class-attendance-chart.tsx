"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "class 1", absent: 186, present: 80 },
  { month: "class 2", absent: 269, present: 120 },
  { month: "class 3", absent: 368, present: 150 },
  { month: "class 4", absent: 500, present: 200 },
  { month: "class 5", absent: 368, present: 150 },
  { month: "class 6", absent: 500, present: 200 },
  { month: "class 7", absent: 368, present: 150 },
  { month: "class 8", absent: 500, present: 200 },
  { month: "class 9", absent: 368, present: 150 },
  { month: "class 10", absent: 500, present: 200 },
  { month: "class 11", absent: 368, present: 150 },
  { month: "class 12", absent: 500, present: 200 },
];

const chartConfig = {
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ClassAttendanceChart() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Class Attendance Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="absent"
              type="natural"
              fill="var(--color-absent)"
              fillOpacity={0.4}
              stroke="var(--color-absent)"
              stackId="a"
            />
            <Area
              dataKey="present"
              type="natural"
              fill="var(--color-present)"
              fillOpacity={0.4}
              stroke="var(--color-present)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              February 2025
              {/* show this month */}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
