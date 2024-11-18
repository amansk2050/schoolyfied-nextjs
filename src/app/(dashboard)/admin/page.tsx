"use client";
import { AppSidebar } from "@/components/app-sidebar";
import TotalCountCard from "@/components/total-countcard";
import AttendancePichart from "@/components/attendance-pichart";
import AttendanceBarChart from "@/components/attendance-barchart";
import SidebarRight from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <header className="flex h-16 shrink-0 items-center gap-2">
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
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
              <TotalCountCard title="Total Teacher" count={50} colorType={2} />
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
        </div>
      </SidebarInset>
      {/* RIGHT */}
      <div>
        <SidebarRight />
      </div>
    </SidebarProvider>
  );
};
export default AdminPage;
