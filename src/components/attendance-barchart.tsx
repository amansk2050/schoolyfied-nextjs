"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { day: "Monday", absent: 105, present: 200 },
  { day: "Tuesday", absent: 110, present: 120 },
  { day: "Wednesday", absent: 115, present: 190 },
  { day: "Thrusday", absent: 120, present: 130 },
  { day: "Friday", absent: 125, present: 140 },
  { day: "Saturday", absent: 130, present: 80 },
];

const chartConfig = {
  present: {
    label: "present",
    color: "hsl(var(--primary))", // green
  },
  absent: {
    label: "absent",
    color: "hsl(var(--chart-4))", // yellow
  },
} satisfies ChartConfig;

function AttendanceBarChart() {
  return (
    <Card className="flex flex-col w-[65%]">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">
          Weekly Attendance Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="present" fill="var(--color-present)" radius={4} />
            <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 days
        </div>
      </CardFooter> */}
    </Card>
  );
}
export default AttendanceBarChart;
