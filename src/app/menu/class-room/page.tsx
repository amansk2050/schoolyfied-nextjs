"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import toCamelCase from "@/helper/toCamelCase";
import {
  EyeIcon,
  UserIcon,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  School,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddClassSectionSheet } from "@/components/add-class-section-sheet";
import { motion } from "framer-motion";

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
    {
      sectionCategoryId: "12jkj126",
      title: "Primary",
      class: [
        {
          className: "Class 5",
          classId: "12jkj123188",
          classSections: [
            {
              sectionName: "5 - A",
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
              sectionName: "5 - B",
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
              sectionName: "5 - C",
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
    {
      sectionCategoryId: "12jkj127",
      title: "Pre-Primary",
      class: [
        {
          className: "Class 1",
          classId: "12jkj123188",
          classSections: [
            {
              sectionName: "1 - A",
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
              sectionName: "1 - B",
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
              sectionName: "1 - C",
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
    <div className="flex flex-col py-6 px-6 space-y-8">
      {/* Updated Hero Section to exactly match lesson-plan page */}
      <div className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-8">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 max-w-7xl mx-auto px-0">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Classroom Management
            </h1>
            <p className="mt-2 text-violet-100">
              View and manage all classroom details across different sections
            </p>
          </div>
          <AddClassSectionSheet />
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Total Sections</div>
            <div className="text-2xl font-bold mt-1">
              {data.sectionCategory.reduce(
                (acc, category) =>
                  acc +
                  category.class.reduce(
                    (acc2, cls) => acc2 + cls.classSections.length,
                    0
                  ),
                0
              )}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Total Classes</div>
            <div className="text-2xl font-bold mt-1">
              {data.sectionCategory.reduce(
                (acc, category) => acc + category.class.length,
                0
              )}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Categories</div>
            <div className="text-2xl font-bold mt-1">
              {data.sectionCategory.length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center">
            <div>
              <div className="text-violet-200">Academic Year</div>
              <div className="text-2xl font-bold mt-1">2023-24</div>
            </div>
            <Calendar className="ml-auto h-10 w-10 text-violet-200/70" />
          </div>
        </div>
      </div>

      {/* Rest of the content with max-width container */}
      <div className="max-w-7xl mx-auto w-full">
        <Tabs
          defaultValue={toCamelCase(data.sectionCategory[0].title)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
            {data.sectionCategory.map((section) => (
              <TabsTrigger
                key={section.sectionCategoryId}
                value={toCamelCase(section.title)}
                className="text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg py-2"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.sectionCategory.map((section) => (
            <TabsContent
              key={section.sectionCategoryId}
              value={toCamelCase(section.title)}
              className="animate-in fade-in-50 duration-300"
            >
              <div className="space-y-8">
                {section.class.map((classData) => (
                  <div key={classData.classId} className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-700 mr-3">
                        <Users size={20} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {classData.className}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {classData.classSections.map((sectionData) => (
                        <motion.div
                          key={sectionData.sectionId}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="overflow-hidden border border-slate-200 h-full bg-white hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="border-2 border-white shadow-sm">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="bg-blue-600 text-white">
                                      {sectionData.sectionName.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-lg text-gray-800">
                                      {sectionData.sectionName}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                      Room {sectionData.info.roomNo}
                                    </CardDescription>
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  {Math.round(
                                    (sectionData.info.totalPresent /
                                      sectionData.info.totalStudents) *
                                      100
                                  )}
                                  % Present
                                </Badge>
                              </div>
                            </CardHeader>

                            <CardContent className="p-4">
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <UserIcon
                                    size={16}
                                    className="text-blue-600"
                                  />
                                  <span className="font-medium text-gray-700">
                                    Teacher:
                                  </span>
                                  <span className="text-gray-600">
                                    {sectionData.info.classTeacher}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Users size={16} className="text-blue-600" />
                                  <span className="font-medium text-gray-700">
                                    Monitor:
                                  </span>
                                  <span className="text-gray-600">
                                    {sectionData.info.classMonitor}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <CheckCircle
                                    size={16}
                                    className="text-emerald-600"
                                  />
                                  <span className="font-medium text-gray-700">
                                    Present:
                                  </span>
                                  <span className="text-gray-600">
                                    {sectionData.info.totalPresent} /{" "}
                                    {sectionData.info.totalStudents}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <MapPin size={16} className="text-blue-600" />
                                  <span className="font-medium text-gray-700">
                                    Room:
                                  </span>
                                  <span className="text-gray-600">
                                    {sectionData.info.roomNo}
                                  </span>
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="p-4 pt-0 flex justify-end">
                              <Link
                                href={`/menu/class-room/${sectionData.sectionId}`}
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                              >
                                View Details
                                <EyeIcon size={16} />
                              </Link>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ClassRoomMenu;
