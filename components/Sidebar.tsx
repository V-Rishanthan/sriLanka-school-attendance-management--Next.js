"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Student Management", href: "/dashboard/studentManagement" },
  { name: "Daily Attendance", href: "/dashboard/dailyAttendance" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-4">
      <div className="text-xl font-semibold mb-6">EduAttend</div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-2 transition ${active
                ? "bg-pink-600 text-white"
                : "text-slate-300 hover:bg-pink-950/40"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
