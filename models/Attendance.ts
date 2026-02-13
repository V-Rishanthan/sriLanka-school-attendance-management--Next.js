import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
    studentId: string;
    date: string; // ISO format "YYYY-MM-DD"
    status: "Present" | "Absent" | "Late";
    createdAt: Date;
}

const AttendanceSchema: Schema = new Schema({
    studentId: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
    createdAt: { type: Date, default: Date.now },
});

// Compound index to ensure uniqueness of attendance record per student per day
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);
