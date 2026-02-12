"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Download,
  GraduationCap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddStudentForm from "@/components/AddStudentForm";
import { id } from "date-fns/locale";

export default function StudentManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [openForm, setOpenForm] = useState(false);

  const students = [
    {
      id: "STU001",
      name: "John Doe",
      class: "10-A",
      status: "Present",
      email: "john@example.com",
    },
    {
      id: "STU002",
      name: "Jane Smith",
      class: "10-B",
      status: "Absent",
      email: "jane@example.com",
    },
    {
      id: "STU003",
      name: "Alice Johnson",
      class: "11-A",
      status: "Present",
      email: "alice@example.com",
    },
    {
      id: "STU004",
      name: "Bob Brown",
      class: "11-A",
      status: "Late",
      email: "bob@example.com",
    },
    {
      id: "STU005",
      name: "Charlie Davis",
      class: "10-A",
      status: "Present",
      email: "charlie@example.com",
    },
    {
      id: "STU006",
      name: "Nimal Perera",
      class: "12-B",
      status: "Present",
      email: "nimal@example.com",
    },
    {
      id: "STU007",
      name: "Sunil Silva",
      class: "9-C",
      status: "Absent",
      email: "sunil@example.com",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "absent":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "late":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-(--split-view-width) mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <GraduationCap className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Student Management
            </h1>
          </div>
          <p className="text-zinc-400">
            View and manage student records and attendance history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setOpenForm(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-pink-500">
              Add New Student
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Fill in the details below to add a new student to the management
              system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AddStudentForm />
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Quick View (Professional touch) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Students", value: "842", sub: "+12 this month" },
          {
            label: "Attendance Rate",
            value: "94.2%",
            sub: "-2% from yesterday",
          },
          { label: "Active Classes", value: "32", sub: "Grade 1 - 13" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className="text-xs text-zinc-400">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3 font-medium">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-start text-left bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-zinc-900 border-zinc-800"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="bg-zinc-900 text-white"
              />
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-[160px] bg-zinc-950/50 border-zinc-800 text-zinc-400">
              <Filter className="w-3.5 h-3.5 mr-2" />
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="10-a">Class 10-A</SelectItem>
              <SelectItem value="10-b">Class 10-B</SelectItem>
              <SelectItem value="11-a">Class 11-A</SelectItem>
              <SelectItem value="11-b">Class 11-B</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="text-zinc-500 hover:text-zinc-300">
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-b border-zinc-800">
            <TableRow className="hover:bg-transparent border-zinc-800">
              <TableHead className="w-32 py-4 px-6 font-semibold text-white bg-pink-900/20">
                Student ID
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold text-white bg-pink-900/20">
                Name
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold text-white bg-pink-900/20">
                Class
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold text-center text-white bg-pink-900/20">
                Status
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold text-right text-white bg-pink-900/20">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-zinc-500"
                >
                  Data not found
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
                >
                  <TableCell className="py-4 px-6 font-mono text-xs text-zinc-500">
                    {student.id}
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">
                        {student.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {student.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-zinc-300">
                    {student.class}
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <Badge
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all",
                        getStatusColor(student.status),
                      )}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-700/50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-zinc-900 border-zinc-800 text-zinc-300"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-pink-500">
                          Edit Records
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-rose-500">
                          Mark Absent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Placeholder (Professional look needs this) */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/30">
          <p className="text-sm text-zinc-500 italic">
            Showing 7 of 842 students
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 bg-zinc-950/50 disabled:opacity-30"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
