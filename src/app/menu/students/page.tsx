"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { AddStudent } from "@/components/add-students-sheet";
import { Badge } from "@/components/ui/badge";

type Student = {
  id: string;
  name: string;
  email: string;
  class: string;
  attendance: string;
  active: boolean;
  status: "pending" | "processing" | "success" | "failed";
};

const data: Student[] = [
  {
    id: "abc123",
    name: "Alice Johnson",
    email: "alice@example.com",
    class: "10A",
    attendance: "Present",
    active: true,
    status: "success",
  },
  {
    id: "def456",
    name: "Bob Smith",
    email: "bob@example.com",
    class: "10B",
    attendance: "Absent",
    active: false,
    status: "failed",
  },
  {
    id: "m5gr84i9",
    name: "Ken",
    email: "ken99@yahoo.com",
    class: "10C",
    attendance: "Present",
    active: true,
    status: "success",
  },
  {
    id: "3u1reuv4",
    name: "Abe",
    email: "Abe45@gmail.com",
    class: "10D",
    attendance: "Absent",
    active: false,
    status: "success",
  },
  {
    id: "derv1ws0",
    name: "Monserrat",
    email: "Monserrat44@gmail.com",
    class: "10E",
    attendance: "Present",
    active: true,
    status: "processing",
  },
  {
    id: "5kma53ae",
    name: "Silas",
    email: "Silas22@gmail.com",
    class: "10F",
    attendance: "Absent",
    active: false,
    status: "success",
  },
  {
    id: "bhqecj4p",
    name: "Carmella",
    email: "carmella@hotmail.com",
    class: "10G",
    attendance: "Present",
    active: true,
    status: "failed",
  },
];

const StudentDetails = () => {
  const router = useRouter();

  const columns = React.useMemo<ColumnDef<Student>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "class",
        header: "Class",
        cell: ({ row }) => <div>{row.getValue("class")}</div>,
      },
      {
        accessorKey: "attendance",
        header: "Attendance",
        cell: ({ row }) => {
          const val = row.getValue("attendance") as string;
          return val === "Present" ? (
            <Badge className="bg-green-100 text-green-600">Present</Badge>
          ) : (
            <Badge className="bg-red-100 text-red-600">Absent</Badge>
          );
        },
      },
      {
        accessorKey: "status", // was "active"
        header: "Status",
        cell: ({ row }) => {
          const val = row.original.active;
          return val ? (
            <Badge className="bg-green-100 text-green-600">Active</Badge>
          ) : (
            <Badge className="bg-red-100 text-red-600">Inactive</Badge>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const student = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => router.push(`/menu/students/${student.id}`)}
                >
                  View details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      globalFilter: (row, columnId, filterValue) => {
        const email = (row.getValue("email") as string).toLowerCase();
        const status = (row.getValue("status") as string).toLowerCase();
        const nameVal = (row.getValue("name") as string)?.toLowerCase?.() || "";
        const classVal =
          (row.getValue("class") as string)?.toLowerCase?.() || "";
        const attendanceVal =
          (row.getValue("attendance") as string)?.toLowerCase?.() || "";
        const activeVal = row.getValue("active") ? "true" : "false";
        const searchValue = filterValue.toLowerCase();
        return (
          email.includes(searchValue) ||
          status.includes(searchValue) ||
          nameVal.includes(searchValue) ||
          classVal.includes(searchValue) ||
          attendanceVal.includes(searchValue) ||
          activeVal.includes(searchValue)
        );
      },
    },
  });
  const handleDeleteSelected = () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    // Implement your delete logic here, e.g., make an API call to delete the selected rows
    console.log("Deleting rows with IDs:", selectedRowIds);
  };

  return (
    <div className="flex flex-col p-2">
      <Label className="font-bold text-2xl">Students Details</Label>
      <Label className="pt-4 font-normal text-sm">
        Get you student details here.
      </Label>
      <div className="pt-3 flex justify-end ">
        <AddStudent />
      </div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search email or status..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="destructive"
            className="ml-2"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
