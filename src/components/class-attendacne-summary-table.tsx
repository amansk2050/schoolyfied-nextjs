"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const classes = [
  { id: "1", class: "1A", totalPresent: 25, totalAbsent: 5, roomNumber: "101" },
  { id: "2", class: "1B", totalPresent: 30, totalAbsent: 2, roomNumber: "102" },
  { id: "3", class: "2A", totalPresent: 20, totalAbsent: 8, roomNumber: "201" },
  { id: "4", class: "2B", totalPresent: 22, totalAbsent: 3, roomNumber: "202" },
  { id: "5", class: "3A", totalPresent: 28, totalAbsent: 4, roomNumber: "301" },
  { id: "6", class: "3B", totalPresent: 26, totalAbsent: 6, roomNumber: "302" },
  { id: "7", class: "4A", totalPresent: 24, totalAbsent: 4, roomNumber: "401" },
  { id: "8", class: "4B", totalPresent: 27, totalAbsent: 3, roomNumber: "402" },
  { id: "9", class: "5A", totalPresent: 29, totalAbsent: 3, roomNumber: "501" },
  {
    id: "10",
    class: "5B",
    totalPresent: 25,
    totalAbsent: 5,
    roomNumber: "502",
  },
  {
    id: "11",
    class: "6A",
    totalPresent: 26,
    totalAbsent: 4,
    roomNumber: "601",
  },
  {
    id: "12",
    class: "6B",
    totalPresent: 28,
    totalAbsent: 2,
    roomNumber: "602",
  },
  {
    id: "13",
    class: "7A",
    totalPresent: 23,
    totalAbsent: 7,
    roomNumber: "701",
  },
  {
    id: "14",
    class: "7B",
    totalPresent: 24,
    totalAbsent: 6,
    roomNumber: "702",
  },
  {
    id: "15",
    class: "8A",
    totalPresent: 27,
    totalAbsent: 3,
    roomNumber: "801",
  },
  {
    id: "16",
    class: "8B",
    totalPresent: 25,
    totalAbsent: 5,
    roomNumber: "802",
  },
  {
    id: "17",
    class: "9A",
    totalPresent: 30,
    totalAbsent: 2,
    roomNumber: "901",
  },
  {
    id: "18",
    class: "9B",
    totalPresent: 28,
    totalAbsent: 4,
    roomNumber: "902",
  },
  {
    id: "19",
    class: "10A",
    totalPresent: 26,
    totalAbsent: 4,
    roomNumber: "1001",
  },
  {
    id: "20",
    class: "10B",
    totalPresent: 27,
    totalAbsent: 3,
    roomNumber: "1002",
  },
  {
    id: "21",
    class: "11A",
    totalPresent: 24,
    totalAbsent: 6,
    roomNumber: "1101",
  },
  {
    id: "22",
    class: "11B",
    totalPresent: 25,
    totalAbsent: 5,
    roomNumber: "1102",
  },
  {
    id: "23",
    class: "12A",
    totalPresent: 28,
    totalAbsent: 2,
    roomNumber: "1201",
  },
  {
    id: "24",
    class: "12B",
    totalPresent: 29,
    totalAbsent: 1,
    roomNumber: "1202",
  },
];

export function ClassAttendanceSummaryTable() {
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useState("");

  const filteredClasses = classes.filter((item) => {
    const searchTerm = searchFilter.toLowerCase();
    return (
      item.class.toLowerCase().includes(searchTerm) ||
      item.roomNumber.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="w-full">
      <div className="mb-4 w-[250px]">
        <Input
          placeholder="Search by class or room..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      <Table className="w-full">
        <TableCaption>Summary of Class Attendance</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Class</TableHead>
            <TableHead>Total Present</TableHead>
            <TableHead>Total Absent</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((classItem, index) => (
            <TableRow
              key={classItem.id}
              className={index % 2 === 1 ? "bg-gray-100" : ""}
            >
              <TableCell className="font-medium">{classItem.class}</TableCell>
              <TableCell>{classItem.totalPresent}</TableCell>
              <TableCell>{classItem.totalAbsent}</TableCell>
              <TableCell>{classItem.roomNumber}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/menu/classes/${classItem.id}`)
                      }
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
