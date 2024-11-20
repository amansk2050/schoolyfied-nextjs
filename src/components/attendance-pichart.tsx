"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { gender: "boy", students: 275, fill: "var(--color-boy)" },
  { gender: "girl", students: 200, fill: "var(--color-girl)" },
];

const chartConfig = {
  students: {
    label: "Total Students",
  },
  boy: {
    label: "boy",
    color: "hsl(var(--primary))",
  },
  girl: {
    label: "girl",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

function AttendancePichart() {
  const totalstudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  return (
    <Card className="flex flex-col w-1/3">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-semibold text-xl">Students</CardTitle>
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
               dataKey="students"
               nameKey="gender"
               innerRadius={70} // Adjusted for a wider slice
               outerRadius={80} // Increased radius for better proportions
               strokeWidth={8} 
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
                          {totalstudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                         total students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total students for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default AttendancePichart;

