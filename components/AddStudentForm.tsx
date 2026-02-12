"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addStudent } from "@/redux/slices/userSlice";

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const shortId = uuidv4().slice(0, 4);
  const [formData, setFormData] = useState({
    id: `STU-${uuidv4().slice(0, 4).toUpperCase()}`,
    name: "",
    class: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here

    // console.log("Form submitted with data:", formData);
    dispatch(addStudent(formData));
    setFormData({
      id: `STU-${shortId}`,
      name: "",
      class: "",
      email: "",
    });
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            Student Name
          </Label>
          <Input
            value={formData.name}
            onChange={handleChange}
            id="name"
            name="name"
            placeholder="e.g. John Doe"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Parent/Student Email
          </Label>
          <Input
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="e.g. student@school.com"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Grade / Class
          </Label>
          <Input
            value={formData.class}
            onChange={handleChange}
            id="class"
            name="class"
            placeholder="e.g. 10-A"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-pink-500/20 focus:border-pink-500/50"
            required
          />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
        >
          Cancel
        </Button>
        {/* <Button
         disabled={!formData.name || !formData.class || !formData.email}
          variant="solid"
          onClick={handleSubmit}
          type="submit"
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
        >
          Register Student
        </Button> */}
        <Button
          onClick={handleSubmit}
          type="submit"
          disabled={!formData.name || !formData.class || !formData.email}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
        >
          Register Student
        </Button>
      </div>
    </form>
  );
}
