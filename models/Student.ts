import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    studentId: string;
    name: string;
    grade: string;
    class: string;
    createdAt: Date;
}

const StudentSchema: Schema = new Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    grade: { type: String, required: true },
    class: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
