"use client";
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockAttendance = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    department: "Science",
    checkIn: "08:45 AM",
    checkOut: "04:30 PM",
    status: "present",
  },
  {
    id: 2,
    name: "Mr. Rajesh Verma",
    department: "Mathematics",
    checkIn: "09:00 AM",
    checkOut: "02:30 PM",
    status: "half-day",
  },
  {
    id: 3,
    name: "Mrs. Anjali Gupta",
    department: "English",
    checkIn: null,
    checkOut: null,
    status: "leave",
  },
  {
    id: 4,
    name: "Mr. Arun Kumar",
    department: "Computer Science",
    checkIn: "08:30 AM",
    checkOut: "04:00 PM",
    status: "present",
  },
  {
    id: 5,
    name: "Dr. Meena Iyer",
    department: "Biology",
    checkIn: null,
    checkOut: null,
    status: "absent",
  },
  {
    id: 6,
    name: "Mr. Sanjay Patel",
    department: "Chemistry",
    checkIn: "09:15 AM",
    checkOut: "01:30 PM",
    status: "half-day",
  },
  {
    id: 7,
    name: "Mrs. Lakshmi Krishnan",
    department: "History",
    checkIn: "08:55 AM",
    checkOut: "04:15 PM",
    status: "present",
  },
  {
    id: 8,
    name: "Dr. Kabir Singh",
    department: "Physical Education",
    checkIn: null,
    checkOut: null,
    status: "leave",
  },
  {
    id: 9,
    name: "Ms. Ritu Desai",
    department: "Economics",
    checkIn: "08:40 AM",
    checkOut: "04:30 PM",
    status: "present",
  },
  {
    id: 10,
    name: "Mr. Vijay Mehta",
    department: "Sanskrit",
    checkIn: null,
    checkOut: null,
    status: "absent",
  },
];

export default function TeacherAttendance() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const stats = {
    total: mockAttendance.length,
    present: mockAttendance.filter((t) => t.status === "present").length,
    absent: mockAttendance.filter((t) => t.status === "absent").length,
    onLeave: mockAttendance.filter((t) => t.status === "leave").length,
    halfDay: mockAttendance.filter((t) => t.status === "half-day").length,
  };

  // Filter and paginate attendance records
  const filteredAttendance = mockAttendance.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedAttendance = filteredAttendance.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);

  // Add status color helper function
  const getStatusStyle = (status) => {
    switch (status) {
      case "present":
        return "bg-green-50 text-green-700 border-green-200";
      case "absent":
        return "bg-red-50 text-red-700 border-red-200";
      case "leave":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "half-day":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Date Picker */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Teacher Attendance
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            {format(date, "dd MMM, yyyy")}
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <CalendarIcon className="h-4 w-4" />
              Change Date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Stats Cards with added half-day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-primary/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Total Teachers</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-green-600">Present Today</p>
            <p className="text-2xl font-bold text-green-700">{stats.present}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-red-600">Absent</p>
            <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-yellow-600">On Leave</p>
            <p className="text-2xl font-bold text-yellow-700">
              {stats.onLeave}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-orange-600">Half Day</p>
            <p className="text-2xl font-bold text-orange-700">
              {stats.halfDay}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Check In/Out Card with updated colors */}
      <Card
        className={`border-2 ${
          isCheckedIn
            ? "border-[hsl(var(--chart-1))]"
            : "border-[hsl(var(--chart-2))]"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className={`px-8 py-6 text-lg ${
                isCheckedIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))]"
              }`}
              onClick={() => setIsCheckedIn(true)}
              disabled={isCheckedIn}
            >
              Check In
            </Button>
            <Button
              className={`px-8 py-6 text-lg ${
                !isCheckedIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[hsl(var(--chart-1))] hover:bg-[hsl(var(--chart-1))]"
              }`}
              onClick={() => setIsCheckedIn(false)}
              disabled={!isCheckedIn}
            >
              Check Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Updated Table with Status Colors */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teachers by name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>
                      {record.checkIn || (
                        <span className="text-muted-foreground">--:--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.checkOut || (
                        <span className="text-muted-foreground">--:--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                          record.status
                        )}`}
                      >
                        {record.status === "present"
                          ? "Present"
                          : record.status === "half-day"
                            ? "Half Day"
                            : record.status === "leave"
                              ? "On Leave"
                              : "Absent"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredAttendance.length > 0 ? (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No teachers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
