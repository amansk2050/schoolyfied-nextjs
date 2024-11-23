"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import toCamelCase from "@/helper/toCamelCase";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const data = {
  sectionCategory: [
    {
      sectionCategoryId: "12jkj123",
      title: "Higher Secondary",
      class: [
        {
          className: "Class 11",
          classId: "12jkj123123",
          classSections: [
            {
              sectionName: "11 - A",
              sectionId: "11jkj123123",
              roomNo: 101,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 101,
              },
            },
            {
              sectionName: "11 - B",
              sectionId: "11jkj123124",
              roomNo: 102,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 102,
              },
            },
            {
              sectionName: "11 - C",
              sectionId: "11jkj123125",
              roomNo: 103,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 103,
              },
            },
          ],
        },
        {
          className: "Class 12",
          classId: "12jkj123124",
          classSections: [
            {
              sectionName: "12 - A",
              sectionId: "11jkj123126",
              roomNo: 101,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 101,
              },
            },
            {
              sectionName: "12 - B",
              sectionId: "11jkj123127",
              roomNo: 102,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 102,
              },
            },
            {
              sectionName: "12 - C",
              sectionId: "11jkj123128",
              roomNo: 103,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 103,
              },
            },
          ],
        },
      ],
    },
    {
      sectionCategoryId: "12jkj124",
      title: "Secondary",
      class: [
        {
          className: "Class 10",
          classId: "12jkj123125",
          classSections: [
            {
              sectionName: "10 - A",
              sectionId: "11jkj123131",
              roomNo: 101,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 101,
              },
            },
            {
              sectionName: "10 - B",
              sectionId: "11jkj123132",
              roomNo: 102,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 102,
              },
            },
            {
              sectionName: "10 - C",
              sectionId: "11jkj123133",
              roomNo: 103,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 103,
              },
            },
          ],
        },
      ],
    },
    {
      sectionCategoryId: "12jkj125",
      title: "Middle",
      class: [
        {
          className: "Class 8",
          classId: "12jkj123188",
          classSections: [
            {
              sectionName: "8 - A",
              sectionId: "11jkj123199",
              roomNo: 101,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 101,
              },
            },
            {
              sectionName: "8 - B",
              sectionId: "11jkj123198",
              roomNo: 102,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 102,
              },
            },
            {
              sectionName: "8 - C",
              sectionId: "11jkj123197",
              roomNo: 103,
              info: {
                classTeacher: "Mr. John Doe",
                classMonitor: "Sheikh Aaman",
                totalPresent: 40,
                totalStudents: 50,
                roomNo: 103,
              },
            },
          ],
        },
      ],
    },
  ],
};

const ClassRoomMenu = () => {
  return (
    <Tabs
      defaultValue={toCamelCase(data.sectionCategory[0].title)}
      className="h-screen pt-2"
    >
      <TabsList className="grid w-full grid-cols-5">
        {data.sectionCategory.map((section) => {
          return (
            <TabsTrigger
              key={section.sectionCategoryId}
              value={toCamelCase(section.title)}
            >
              {section.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {data.sectionCategory.map((section) => {
        return (
          <TabsContent
            key={section.sectionCategoryId}
            value={toCamelCase(section.title)}
            className=""
          >
            <div>
              {section.class.map((classData) => {
                return (
                  <Card
                    key={classData.classId}
                    className="mb-4 w-[70%] mx-auto "
                  >
                    <CardHeader className="items-center p-2">
                      <CardTitle className="">{classData.className}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-2 ">
                      {classData.classSections.map((sectionData) => {
                        return (
                          <Card
                            key={sectionData.sectionId}
                            className="mb-2 flex flex-col transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
                          >
                            <CardHeader className="p-0 items-start">
                              <CardTitle className="pl-2 font-semibold text-xl">
                                {sectionData.sectionName}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="items-start p-2 ">
                              <CardDescription>
                                <Label>Class Teacher : </Label>
                                <label>{sectionData.info.classTeacher}</label>
                              </CardDescription>
                              <CardDescription>
                                <Label>Class Monitor : </Label>
                                <label>{sectionData.info.classMonitor}</label>
                              </CardDescription>
                              <CardDescription>
                                <Label>Total Present : </Label>
                                <label>{sectionData.info.totalPresent}</label>
                              </CardDescription>
                              <CardDescription>
                                <Label>Total Students : </Label>
                                <label>{sectionData.info.totalStudents}</label>
                              </CardDescription>
                              <CardDescription>
                                <Label>Room No : </Label>
                                <Label>{sectionData.info.roomNo}</Label>
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="p-2  items-end ml-auto">
                              <Link
                                href={`/class-room/${sectionData.sectionId}`}
                                className="bg-secondary text-white p-2 rounded-md "
                              >
                                <EyeIcon
                                  name="arrow-right"
                                  size={20}
                                  className="rounded-full cursor-pointer text-primary hover:text-black  "
                                />
                              </Link>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ClassRoomMenu;
