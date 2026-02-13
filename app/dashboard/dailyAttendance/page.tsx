"use client";

import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { CalendarIcon, Check, X, Clock, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  fetchAttendanceByDate,
  saveAttendanceAsync
} from "@/redux/slices/attendanceSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { grades, classes } from "@/data/formOptions";

export default function DailyAttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { students, attendance: savedAttendance, loading } = useSelector((state: RootState) => state.attendance);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    const dateStr = format(date, "yyyy-MM-dd");
    dispatch(fetchAttendanceByDate(dateStr));
  }, [dispatch, date]);

  useEffect(() => {
    // Populate local attendance state when savedAttendance changes
    const newAttendance: Record<string, string> = {};
    savedAttendance.forEach(a => {
      newAttendance[a.studentId] = a.status.toLowerCase();
    });
    setAttendance(newAttendance);
  }, [savedAttendance]);

  const saveAllAttendance = async () => {
    const dateStr = format(date, "yyyy-MM-dd");
    let successCount = 0;

    try {
      for (const studentId of Object.keys(attendance)) {
        const status = attendance[studentId];
        await dispatch(saveAttendanceAsync({
          studentId,
          date: dateStr,
          status: status === "present" ? "Present" : status === "absent" ? "Absent" : "Late"
        })).unwrap();
        successCount++;
      }
      toast.success(`Saved attendance for ${successCount} students`);
    } catch (error) {
      toast.error("Failed to save some attendance records");
    }
  };

  const handleAttendance = (studentId: string, status: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Filter students based on selected grade and class
  const filteredStudents = students.filter((student: any) => {
    if (selectedGrade && student.grade !== selectedGrade) return false;
    if (selectedClass && !student.class.includes(selectedClass)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Daily Attendance</h1>
          <p className="text-slate-400 mt-2">
            Select grade and date to mark student attendance.
          </p>
        </div>
        <Button
          onClick={saveAllAttendance}
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
        >
          Save All Attendance
        </Button>
      </div>

      {/* Attendance stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-zinc-400">Total Students</h1>
          <p className="text-3xl font-bold mt-1">{filteredStudents.length}</p>
          {(selectedGrade || selectedClass) && (
            <p className="text-xs text-zinc-500 mt-1">of {students.length} total</p>
          )}
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-emerald-500/80">Present</h1>
          <p className="text-3xl font-bold mt-1 text-emerald-500">
            {Object.values(attendance).filter((s) => s === "present").length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-rose-500/80">Absent</h1>
          <p className="text-3xl font-bold mt-1 text-rose-500">
            {Object.values(attendance).filter((s) => s === "absent").length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl ">
          <h1 className="text-sm font-medium text-amber-500/80">Late</h1>
          <p className="text-3xl font-bold mt-1 text-amber-500">
            {Object.values(attendance).filter((s) => s === "late").length}
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
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[160px] bg-zinc-950/50 border-zinc-800">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent className="bg-gray-200 border-zinc-800">
              <SelectItem value="all">All Grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade.value} value={grade.value}>
                  Grade {grade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[160px] bg-zinc-950/50 border-zinc-800">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent className="bg-gray-200 border-zinc-800">
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.value} value={cls.value}>
                  Class {cls.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900/50",
                  !date && "text-muted-foreground",
                )}
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

          {(selectedGrade || selectedClass) && (
            <Button
              variant="ghost"
              className="text-zinc-500 hover:text-zinc-300"
              onClick={() => {
                setSelectedGrade("");
                setSelectedClass("");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Attendance mark Table */}
      <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="hover:bg-transparent border-zinc-800">
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold">
                Student ID
              </TableHead>
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold">
                Name
              </TableHead>
              <TableHead className="py-4 px-6 text-zinc-300 font-semibold text-center">
                Mark Attendance
              </TableHead>
            </TableRow>
          </TableHeader>


          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-10 text-center text-zinc-500"
                >
                  {students.length === 0 ? "No students found" : "No students match the selected filters"}
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student: any) => (
                <TableRow
                  key={student.studentId}
                  className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                >
                  <TableCell className="py-4 px-6 font-mono text-xs text-zinc-500">
                    {student.studentId}
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col text-zinc-200">
                      <span className="font-medium">{student.name}</span>
                      <span className="text-xs text-zinc-500">
                        {student.grade}-{student.class}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAttendance(student.studentId, "present")}
                        className={cn(
                          "h-8 border-zinc-800 transition-all",
                          attendance[student.studentId] === "present"
                            ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                            : "bg-zinc-950/50 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500",
                        )}
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Present
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAttendance(student.studentId, "absent")}
                        className={cn(
                          "h-8 border-zinc-800 transition-all",
                          attendance[student.studentId] === "absent"
                            ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600"
                            : "bg-zinc-950/50 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500",
                        )}
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Absent
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAttendance(student.studentId, "late")}
                        className={cn(
                          "h-8 border-zinc-800 transition-all",
                          attendance[student.studentId] === "late"
                            ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
                            : "bg-zinc-950/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500",
                        )}
                      >
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Late
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
