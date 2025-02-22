"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock data - replace with actual API call
const students = [
  { id: 1, rollNo: "001", name: "John Doe" },
  { id: 2, rollNo: "002", name: "Jane Smith" },
  { id: 3, rollNo: "003", name: "Alice Johnson" },
  { id: 4, rollNo: "004", name: "Robert Wilson" },
  { id: 5, rollNo: "005", name: "Emily Brown" },
  { id: 6, rollNo: "006", name: "Michael Davis" },
  { id: 7, rollNo: "007", name: "Sarah Miller" },
  { id: 8, rollNo: "008", name: "James Anderson" },
  { id: 9, rollNo: "009", name: "Emma Taylor" },
  { id: 10, rollNo: "010", name: "William Thomas" },
  { id: 11, rollNo: "011", name: "Olivia Martinez" },
  { id: 12, rollNo: "012", name: "Daniel Garcia" },
  { id: 13, rollNo: "013", name: "Sophia Rodriguez" },
  { id: 14, rollNo: "014", name: "David Lee" },
  { id: 15, rollNo: "015", name: "Isabella Lopez" },
  { id: 16, rollNo: "016", name: "Joseph Hall" },
  { id: 17, rollNo: "017", name: "Mia White" },
  { id: 18, rollNo: "018", name: "Christopher King" },
  { id: 19, rollNo: "019", name: "Ava Wright" },
  { id: 20, rollNo: "020", name: "Andrew Scott" },
];

const ClassAttendance = ({ params }: { params: { "class-id": string } }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [attendance, setAttendance] = React.useState<Record<number, string>>(
    {}
  );

  const className = "Class 12 A"; // Replace with actual class name from API

  const handleAttendanceChange = (studentId: number, value: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

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

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">{className}</h3>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>

      <div className="flex-1 min-h-0 flex justify-center w-full">
        <div className="w-full max-w-4xl flex flex-col border rounded-lg">
          <div className="overflow-y-auto flex-1">
            <Table>
              <TableCaption className="sticky bottom-0 bg-white border-t">
                Student Attendance Record
              </TableCaption>
              <TableHeader className="sticky top-0 bg-gray-50 z-10">
                <TableRow>
                  <TableHead className="w-[100px] text-center text-black">
                    Roll No
                  </TableHead>
                  <TableHead className="w-[200px] text-center text-black">
                    Name
                  </TableHead>
                  <TableHead className="text-center text-black">
                    Attendance Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto">
                {students.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className={index % 2 === 1 ? "bg-gray-50" : ""}
                  >
                    <TableCell className="text-center">
                      {student.rollNo}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.name}
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        className="flex justify-center gap-6"
                        value={attendance[student.id]}
                        onValueChange={(value) =>
                          handleAttendanceChange(student.id, value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="present"
                            id={`present-${student.id}`}
                            className={`transition-all duration-200 ${
                              attendance[student.id] === "present"
                                ? "bg-green-500 border-green-500"
                                : "border-green-500"
                            }`}
                          />
                          <Label
                            htmlFor={`present-${student.id}`}
                            className={`transition-colors ${
                              attendance[student.id] === "present"
                                ? "text-green-600 font-medium"
                                : "text-gray-900"
                            }`}
                          >
                            Present
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="absent"
                            id={`absent-${student.id}`}
                            className={`transition-all duration-200 ${
                              attendance[student.id] === "absent"
                                ? "bg-red-500 border-red-500"
                                : "border-red-500"
                            }`}
                          />
                          <Label
                            htmlFor={`absent-${student.id}`}
                            className={`transition-colors ${
                              attendance[student.id] === "absent"
                                ? "text-red-600 font-medium"
                                : "text-gray-900"
                            }`}
                          >
                            Absent
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="halfday"
                            id={`halfday-${student.id}`}
                            className={`transition-all duration-200 ${
                              attendance[student.id] === "halfday"
                                ? "bg-yellow-500 border-yellow-500"
                                : "border-yellow-500"
                            }`}
                          />
                          <Label
                            htmlFor={`halfday-${student.id}`}
                            className={`transition-colors ${
                              attendance[student.id] === "halfday"
                                ? "text-yellow-600 font-medium"
                                : "text-gray-900"
                            }`}
                          >
                            Half Day
                          </Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendance;
