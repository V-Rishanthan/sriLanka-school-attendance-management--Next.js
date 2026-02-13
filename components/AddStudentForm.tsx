"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "@/redux/slices/attendanceSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { grades, classes } from "@/data/formOptions";

export default function AddStudentForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    studentId: `STU-${uuidv4().slice(0, 4).toUpperCase()}`,
    name: "",
    email: "",
    grade: "",
    class: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //  Store class as "1-A" format in Redux/DB
      const combinedClass = `${formData.grade}-${formData.class}`;

      await dispatch(
        addStudentAsync({
          studentId: formData.studentId,
          name: formData.name,
          grade: formData.grade, // keep grade
          class: combinedClass, // save as 1-A
        })
      ).unwrap();

      toast.success("Student added successfully!");

      // reset form
      setFormData({
        studentId: `STU-${uuidv4().slice(0, 4).toUpperCase()}`,
        name: "",
        email: "",
        grade: "",
        class: "",
      });
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            Student Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Doe"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Parent / Student Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="e.g. student@school.com"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
            required
          />
        </div>

        {/* Grade Dropdown */}
        <div className="space-y-2">
          <Label className="text-zinc-300">Grade</Label>
          <Select
            value={formData.grade}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                grade: value,
                class: "", //  reset class when grade changes
              }))
            }
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade.value} value={grade.value}>
                  {grade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class Dropdown */}
        <div className="space-y-2">
          <Label className="text-zinc-300">Class</Label>
          <Select
            value={formData.class}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, class: value }))
            }
            disabled={!formData.grade} //  force select grade first
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.value} value={cls.value}>
                  {formData.grade ? `${formData.grade}-${cls.value}` : cls.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!formData.grade && (
            <p className="text-xs text-zinc-500">
              Please select a grade first.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
          onClick={() =>
            setFormData({
              studentId: `STU-${uuidv4().slice(0, 4).toUpperCase()}`,
              name: "",
              email: "",
              grade: "",
              class: "",
            })
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.grade ||
            !formData.class
          }
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
        >
          Register Student
        </Button>
      </div>
    </form>
  );
}
