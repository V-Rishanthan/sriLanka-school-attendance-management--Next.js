import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Student = {
  _id?: string;
  studentId: string;
  name: string;
  grade: string;
  class: string;
};

export type Attendance = {
  _id?: string;
  studentId: string;
  date: string; // "2026-02-10"
  status: "Present" | "Absent" | "Late";
};

type AttendanceState = {
  students: Student[];
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
};

const initialState: AttendanceState = {
  students: [],
  attendance: [],
  loading: false,
  error: null,
};

// Async Thunks for API Calls
export const fetchStudents = createAsyncThunk("attendance/fetchStudents", async () => {
  const response = await fetch("/api/students");
  const data = await response.json();
  return data.data;
});

export const addStudentAsync = createAsyncThunk("attendance/addStudent", async (student: Student) => {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data.data;
});

export const fetchAttendanceByDate = createAsyncThunk("attendance/fetchByDate", async (date: string) => {
  const response = await fetch(`/api/attendance?date=${date}`);
  const data = await response.json();
  return data.data;
});

export const saveAttendanceAsync = createAsyncThunk("attendance/save", async (attendance: Attendance) => {
  const response = await fetch("/api/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attendance),
  });
  const data = await response.json();
  return data.data;
});

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    // We can still have local sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch students";
      })
      // Add Student
      .addCase(addStudentAsync.fulfilled, (state, action: PayloadAction<Student>) => {
        state.students.push(action.payload);
      })
      // Fetch Attendance
      .addCase(fetchAttendanceByDate.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.attendance = action.payload;
      })
      // Save Attendance
      .addCase(saveAttendanceAsync.fulfilled, (state, action: PayloadAction<Attendance>) => {
        const index = state.attendance.findIndex(
          (a) => a.studentId === action.payload.studentId && a.date === action.payload.date
        );
        if (index !== -1) {
          state.attendance[index] = action.payload;
        } else {
          state.attendance.push(action.payload);
        }
      });
  },
});

export default attendanceSlice.reducer;
