"use client";

import { ClassAttendanceSummaryTable } from "@/components/class-attendacne-summary-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { Separator } from "@/components/ui/separator";

const Attendance = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="flex flex-col w-full h-screen p-6 gap-7">
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Today&apos;s Attendance</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Pick Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(value) => value && setDate(value)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <span className="text-sm text-muted-foreground">
          {format(date, "MMM dd, yyyy")}
        </span>
      </div>

      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <div className="flex justify-center w-full">
        <div className="w-3/4 h-max">
          <ClassAttendanceSummaryTable />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
