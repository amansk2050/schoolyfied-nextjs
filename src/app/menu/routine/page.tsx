"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, GraduationCap } from "lucide-react";

// Education theme colors
const themeColors = [
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
];

const teachers = [
  "John Smith",
  "Emma Watson",
  "Michael Brown",
  "Sarah Davis",
  "Robert Wilson",
  "David Miller",
  "Lisa Anderson",
  "James Wilson",
];

const subjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
];
const classes = ["9-A", "9-B", "10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];

const generateRoutineData = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const data = [];

  days.forEach((day) => {
    for (let period = 1; period <= 8; period++) {
      // Generate 3-4 different classes for each period
      const numberOfClasses = Math.floor(Math.random() * 2) + 3; // 3-4 classes
      const periodClasses = [];

      for (let i = 0; i < numberOfClasses; i++) {
        periodClasses.push({
          class: `Class ${classes[Math.floor(Math.random() * classes.length)]}`,
          subject: subjects[Math.floor(Math.random() * subjects.length)],
          teacher: teachers[Math.floor(Math.random() * teachers.length)],
        });
      }

      data.push({
        day,
        period,
        time: `${8 + period}:00 - ${9 + period}:00`,
        classes: periodClasses,
      });
    }
  });

  return data;
};

const routineData = generateRoutineData();

const TeacherStats = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <GraduationCap className="h-5 w-5 text-primary" />
          Teaching Staff
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {teachers.map((teacher, idx) => {
            const classesCount = routineData.reduce((count, period) => {
              return (
                count +
                period.classes.filter((cls) => cls.teacher === teacher).length
              );
            }, 0);

            const colorScheme = themeColors[idx % themeColors.length];

            return (
              <Badge
                key={teacher}
                className={`py-2 px-3 ${colorScheme.bg} ${colorScheme.border} border ${colorScheme.text} 
                hover:bg-white hover:border-current hover:text-current transition-all duration-200 cursor-default`}
              >
                {teacher} ({classesCount}/38)
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Routine() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-12 ">
      <h1 className="text-3xl font-bold text-gray-800">
        School Weekly Routine
      </h1>

      <Tabs defaultValue="view" className="w-full">
        <TabsList className="w-full max-w-[400px] p-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <TabsTrigger
            value="view"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
          >
            View Routine
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
          >
            Create Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-8 mt-8">
          <TeacherStats />

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by teacher name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-lg border bg-white shadow-md overflow-hidden">
            <ScrollArea className="h-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] bg-blue-50 sticky left-0 text-blue-800">
                      Day
                    </TableHead>
                    {Array.from({ length: 8 }, (_, i) => (
                      <TableHead
                        key={i + 1}
                        className="min-w-[200px] bg-gradient-to-b from-blue-50 to-transparent"
                      >
                        <div className="font-semibold text-blue-800">
                          Period {i + 1}
                        </div>
                        <div className="text-xs text-blue-600">
                          {9 + i}:00 - {10 + i}:00
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <TableRow
                      key={day}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <TableCell className="font-medium bg-blue-50/50 sticky left-0 text-blue-800">
                        {day}
                      </TableCell>
                      {Array.from({ length: 8 }, (_, i) => {
                        const periodData = routineData.find(
                          (item) => item.day === day && item.period === i + 1
                        );
                        return (
                          <TableCell key={i + 1} className="p-2">
                            <div className="space-y-2">
                              {periodData?.classes.map((cls, idx) => {
                                const colorScheme =
                                  themeColors[idx % themeColors.length];
                                return (
                                  <div
                                    key={idx}
                                    className={`text-xs p-2 border rounded-md ${colorScheme.bg} ${colorScheme.border}`}
                                  >
                                    <div className="font-medium">
                                      {cls.class}
                                    </div>
                                    <div className={colorScheme.text}>
                                      {cls.subject}
                                    </div>
                                    <div className="text-gray-600">
                                      {cls.teacher}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="create">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">
              Create routine form coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
