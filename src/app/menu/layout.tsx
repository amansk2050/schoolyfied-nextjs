"use client";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react"; // Import useState and useEffect

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pathSegments, setPathSegments] = useState<string[]>([]);

  useEffect(() => {
    // Extract path segments from the current URL
    const segments = window.location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    setPathSegments(segments);
  }, []); // Empty dependency array to run only once after mount

  // Function to create breadcrumb links dynamically based on path segments
  const generateBreadcrumbs = () => {
    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/"); // Create href for each breadcrumb
      const isLast = index === pathSegments.length - 1; // Check if it's the last breadcrumb (current page)
  
      // Skip rendering the first breadcrumb if it's "menu"
      if (index === 0 && segment === "menu") {
        return null;
      }
  
      return (
        <React.Fragment key={segment + index}> {/* Provide a unique key */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment.replace("-", " ")}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {segment.replace("-", " ")}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Add a separator after each breadcrumb except the last one */}
          {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };
  

  return (
    <html lang="en">
      <body className={nunito.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="">
            {/* HEADER */}
            <header className="sticky top-0 z-10 bg-white flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
               
                  {/* Dynamic Breadcrumb Items */}
                  {generateBreadcrumbs()}
               
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
