"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  UserCog,
  User,
  Briefcase,
  Calendar,
  Star,
  School2Icon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetUserFromToken } from "@/api/users";
import { useGetRegisterdSchoolByUserId } from "@/api/school";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const data = {
  navMain: [
    {
      title: "Student",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "student Details",
          url: "/menu/students",
        },
        // {
        //   title: "Academic Performance",
        //   url: "#",
        // },
        // {
        //   title: "Achivements",
        //   url: "#",
        // },
        {
          title: "Attendance",
          url: "/menu/attendance",
        },
        // {
        //   title: "Health Profile", // and medical emergency
        //   url: "#",
        // },
      ],
    },
    {
      title: "Teacher",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Teacher Details", // extra class will ge all shown in this page
          url: "/menu/teachers",
        },
        {
          title: "Attendance",
          url: "/menu/teacher-attendance",
        },
        // {
        //   title: "Performance and Achiments",
        //   url: "#",
        // },
        {
          title: "Routine",
          url: "/menu/routine",
        },
      ],
    },
    {
      title: "Aceademics",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Classrooms",
          url: "/menu/class-room",
        },
        {
          title: "Report card",
          url: "#",
        },
        {
          title: "Admit Card",
          url: "#",
        },
        {
          title: "Syllabus",
          url: "/menu/syllabus",
        },
        {
          title: "Lesson Plan",
          url: "/menu/lesson-plan",
        },
        {
          title: "Examination",
          url: "#",
        },
      ],
    },
    {
      title: "Leaves & Holidays",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Leaves", // apply for leaves will also there
          url: "#",
        },
        {
          title: "Holidays",
          url: "#",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Star,
      items: [
        {
          title: "Sports Events", // apply for leaves will also there
          url: "#",
        },
        {
          title: "Cultural Events",
          url: "#",
        },
      ],
    },
    {
      title: "Access Control",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Roles and Permission", // apply for leaves will also there
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const getUserFromToken = useGetUserFromToken();
  const userId = "0fa7117a-d243-4a25-8d5c-8d580df915ed";

  //@TODO: get user id from token is not completed because there is no api to school created by user

  // set school name
  const [schoolName, setSchoolName] = useState("");

  // handle get user from token
  useEffect(() => {
    if (getUserFromToken.data) {
      setUser({
        name: getUserFromToken.data.lastName,
        email: getUserFromToken.data.email,
        avatar: "/avatars/shadcn.jpg",
      });
      // setUserId(getUserFromToken.data.id);
    }
  }, [getUserFromToken.error, getUserFromToken.data]);
  const getSchoolByUser = useGetRegisterdSchoolByUserId(userId);
  // handle get school by user id
  useEffect(() => {
    if (getSchoolByUser.error) {
      toast.error("Error while fetching school data");
    }
    if (getSchoolByUser.data) {
      console.log("school data ", getSchoolByUser.data.data.name);
      setSchoolName(getSchoolByUser.data.data.name);
    }
  }, [getSchoolByUser.error, getSchoolByUser.data]);
  return (
    <Sidebar className="" variant="floating" collapsible="icon" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="">
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <School2Icon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{schoolName}</span>
                  <span className="truncate text-xs">Co-ed School</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* for now not though about this feature but good idea
        <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Sidebar>
  );
}
