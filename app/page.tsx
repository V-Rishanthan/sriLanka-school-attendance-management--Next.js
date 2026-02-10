import React from "react";
import Login from "@/app/login/page";
import { redirect } from "next/navigation";

const page = () => {
  return <div>{redirect("/login")}</div>;
};

export default page;
