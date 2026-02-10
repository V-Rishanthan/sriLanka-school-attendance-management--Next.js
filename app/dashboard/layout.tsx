import React from "react";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen">
      {/* Background glow */}
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]" />

      {/* Sidebar stays fixed to viewport */}
      <div className="w-64 shrink-0">
        <div className="fixed w-64 h-screen border-r border-pink-900/40 bg-black">
          <Sidebar />
        </div>
      </div>

      {/* Main content flows naturally */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
