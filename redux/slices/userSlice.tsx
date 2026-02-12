import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Student = {
  id: string;
  name?: string;
  grade?: string;
  class?: string;
};

type Attendance = {
  id: string;
  studentId: string;
  date: string; // "2026-02-10"
  status: "Present" | "Absent" | "Late";
};

type UserState = {
  student: Student[];
  attendance: Attendance[];
};

const initialState: UserState = {
  student: [],
  attendance: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.student.push(action.payload);
      console.log("STUDENT ADDED:", action.payload);
      console.log("ALL STUDENTS:", JSON.parse(JSON.stringify(state.student)));
    },

    addAttendance: (state, action: PayloadAction<Attendance>) => {
      state.attendance.push(action.payload);
    },

    deleteStudent: (state, action: PayloadAction<string>) => {
      // payload = student id
      state.student = state.student.filter((s) => s.id !== action.payload);
      // remove related attendance too
      state.attendance = state.attendance.filter(
        (a) => a.studentId !== action.payload,
      );
    },

    deleteAttendance: (state, action: PayloadAction<string>) => {
      // payload = attendance id
      state.attendance = state.attendance.filter(
        (a) => a.id !== action.payload,
      );
    },

    setStudent: (state, action: PayloadAction<Student[]>) => {
      state.student = action.payload;
    },
  },
});

export const {
  addStudent,
  addAttendance,
  deleteStudent,
  deleteAttendance,
  setStudent,
} = userSlice.actions;

export default userSlice.reducer;
