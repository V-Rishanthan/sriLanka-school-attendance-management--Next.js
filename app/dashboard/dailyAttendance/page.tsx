"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Check, X, Clock, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { studentsData } from "@/lib/data"

export default function DailyAttendancePage() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [attendance, setAttendance] = React.useState<Record<string, string>>({})

  const handleAttendance = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Daily Attendance</h1>
          <p className="text-slate-400 mt-2">
            Select grade and date to mark student attendance.
          </p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20">
          Save All Attendance
        </Button>
      </div>

      {/* Attendance stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-zinc-400">Total Students</h1>
          <p className="text-3xl font-bold mt-1">{studentsData.length}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-emerald-500/80">Present</h1>
          <p className="text-3xl font-bold mt-1 text-emerald-500">
            {Object.values(attendance).filter(s => s === 'present').length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-rose-500/80">Absent</h1>
          <p className="text-3xl font-bold mt-1 text-rose-500">
            {Object.values(attendance).filter(s => s === 'absent').length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-amber-500/80">Late</h1>
          <p className="text-3xl font-bold mt-1 text-amber-500">
            {Object.values(attendance).filter(s => s === 'late').length}
          </p>
        </div>
      </div>

      {/* Filter Selection bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-4 rounded-2xl">
        <div className="relative flex-1 w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-10 bg-zinc-950/50 border-zinc-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Select>
            <SelectTrigger className="w-[160px] bg-zinc-950/50 border-zinc-800">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
              <SelectItem value="13">Grade 13</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900/50",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="bg-zinc-900 text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Attendance mark Table */}
      <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="hover:bg-transparent border-zinc-800">
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold">Student ID</TableHead>
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold">Name</TableHead>
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold text-center">Mark Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData.map((student) => (
              <TableRow key={student.id} className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <TableCell className="py-4 px-6 font-mono text-xs text-zinc-500">
                  {student.id}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col text-zinc-200">
                    <span className="font-medium">{student.name}</span>
                    <span className="text-xs text-zinc-500">{student.class}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttendance(student.id, 'present')}
                      className={cn(
                        "h-8 border-zinc-800 transition-all",
                        attendance[student.id] === 'present'
                          ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                          : "bg-zinc-950/50 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                      )}
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttendance(student.id, 'absent')}
                      className={cn(
                        "h-8 border-zinc-800 transition-all",
                        attendance[student.id] === 'absent'
                          ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600"
                          : "bg-zinc-950/50 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500"
                      )}
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Absent
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttendance(student.id, 'late')}
                      className={cn(
                        "h-8 border-zinc-800 transition-all",
                        attendance[student.id] === 'late'
                          ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
                          : "bg-zinc-950/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500"
                      )}
                    >
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Late
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
