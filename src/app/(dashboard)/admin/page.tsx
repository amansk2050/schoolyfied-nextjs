"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import TotalCountCard from "@/components/total-countcard";
import AttendancePichart from "@/components/attendance-pichart";
import AttendanceBarChart from "@/components/attendance-barchart";
import HealthEmergencyAlert from "@/components/health-emergency-alert";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-white flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Class</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Section</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Class 12 - A</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* MIDDLE */}
        <div className="flex flex-row h-full w-full">
          {/* MIDDLE-LEFT */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0  ">
            {/* TOP CARDS */}
            <div className="grid auto-rows-min w-full gap-4 md:grid-cols-3  p-2 ">
              <div className="rounded-xl w-full ">
                <TotalCountCard
                  title="Total Students"
                  count={120}
                  colorType={1}
                />
              </div>
              <div className="rounded-xl w-full ">
                <TotalCountCard
                  title="Total Teacher"
                  count={50}
                  colorType={2}
                />
              </div>
              <div className="rounded-xl w-full ">
                <TotalCountCard title="On Leave " count={10} colorType={3} />
              </div>
            </div>
            {/* CHARTS */}
            <div className="min-h-[600px] flex flex-col rounded-xl md:min-h-min w-full ">
              <div className="flex flex-row w-full gap-2 ">
                <AttendancePichart />
                <AttendanceBarChart />
              </div>
            </div>
            {/* LEAVE REQUESTS  use data-table component for schad cn ui*/}
            
          </div>
          {/* MIDDLE-RIGHT */}
          <div className="flex flex-col w-1/3 items-center mr-2 ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="h-[600px] pt-2 border rounded-xl bg-card text-card-foreground shadow"
            />
            <div className="flex flex-col justify-normal items-center h-full w-full gap-4">
              <span className="p-3 font-semibold text-xl">
                Health Emergency Alert
              </span>
              <div className="w-full">
                <HealthEmergencyAlert />
                <HealthEmergencyAlert />
                <HealthEmergencyAlert />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminPage;
