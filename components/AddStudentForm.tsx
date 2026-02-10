"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddStudentForm() {
    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300">Student Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g. John Doe"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-zinc-300">Registration ID</Label>
                    <Input
                        id="studentId"
                        name="studentId"
                        placeholder="e.g. STU-2024-001"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="grade" className="text-zinc-300">Grade / Class</Label>
                    <Input
                        id="grade"
                        name="grade"
                        placeholder="e.g. 10-A"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Parent/Student Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. student@school.com"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
                        required
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
                    Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20">
                    Register Student
                </Button>
            </div>
        </form>
    );
}
