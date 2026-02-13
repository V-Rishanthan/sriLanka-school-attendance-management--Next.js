import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    try {
        const query = date ? { date } : {};
        const attendance = await Attendance.find(query);
        return NextResponse.json({ success: true, data: attendance });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { studentId, date, status } = body;

        // Upsert attendance: update if exists, otherwise create
        const attendance = await Attendance.findOneAndUpdate(
            { studentId, date },
            { status },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: attendance });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
