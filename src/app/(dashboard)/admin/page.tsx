"use client";
import React from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import TotalCountCard from "@/components/total-countcard";
import AttendancePichart from "@/components/attendance-pichart";
import AttendanceBarChart from "@/components/attendance-barchart";
import AnnouncementsAlert from "@/components/anouncement-alert";
import LeaveRequestTable from "@/components/leave-request-table";
import { AlertType } from "@/enums/alertEnums";
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
import { badgeVariants } from "@/components/ui/badge";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const announcements = [
  {
    id: 1,
    title: "System Maintenance",
    message: "The system will be down for maintenance from 12 AM to 3 AM.",
    type: AlertType.Health,
  },
  {
    id: 2,
    title: "New Feature Release",
    message: "We have introduced a new dashboard for analytics.",
    type: AlertType.Events,
  },
  {
    id: 3,
    title: "Password Expiry",
    message: "Your password will expire in 7 days. Please update it.",
    type: AlertType.Announcement,
  },
  {
    id: 4,
    title: "Password Expiry",
    message: "Your password will expire in 7 days. Please update it.",
    type: AlertType.Announcement,
  },
];

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
        <div className="flex flex-row h-screen w-full">
          {/* MIDDLE-LEFT */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0  ">
            {/* TOP CARDS */}
            <div className="grid auto-rows-min w-full gap-4 md:grid-cols-3  p-2 ">
              <div className="rounded-xl w-full ">
                <TotalCountCard
                  title="Students Present"
                  count={120}
                  colorType={1}
                />
              </div>
              <div className="rounded-xl w-full ">
                <TotalCountCard
                  title="Teacher Present"
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
            <LeaveRequestTable />
          </div>
          {/* MIDDLE-RIGHT */}
          <div className="flex flex-col w-1/3 items-center mr-2 ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="h-[600px] pt-2 border rounded-xl bg-card text-card-foreground shadow"
            />
            <div className="flex flex-col justify-center items-center h-full w-full gap-4">
              <span className="pt-5 font-semibold text-xl">
                Announcement & Alerts
              </span>
              {/** here will more than one type of alert events, emergeny, anouncement */}
              <div className="flex flex-col bg-card rounded-xl text-card-foreground shadow gap-3 pt-2 h-full">
                <div className="flex flex-row  justify-center space-x-6">
                  <Link
                    href="#"
                    className={`${badgeVariants({
                      variant: "outline",
                    })}  rounded-xl border-red-400 font-weight`}
                  >
                    {4} {AlertType.Health}
                  </Link>
                  <Link
                    href="#"
                    className={`${badgeVariants({
                      variant: "outline",
                    })}  rounded-xl border-blue-400`}
                  >
                    {5} {AlertType.Events}
                  </Link>
                  <Link
                    href="#"
                    className={`${badgeVariants({
                      variant: "outline",
                    })}  rounded-xl border-yellow-400`}
                  >
                    {6} {AlertType.Announcement}
                  </Link>
                </div>
                <div className="w-full">
                  {announcements.map((announcement) => (
                    <AnnouncementsAlert
                      key={announcement.id}
                      id={announcement.id}
                      type={announcement.type}
                      title={announcement.title}
                      message={announcement.message}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminPage;
