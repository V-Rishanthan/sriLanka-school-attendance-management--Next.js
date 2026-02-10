import {
  Users,
  Percent,
  School,
  CheckCircle2,
  UserCog,
  CalendarCheck,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="space-y-10">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Overview of attendance and student activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6">
            <div className="flex items-center gap-3">
              <Users className="text-pink-500" />
              <p className="text-slate-400 text-sm">Total Students</p>
            </div>
            <h2 className="text-3xl font-semibold mt-3">1,234</h2>
            <p className="text-green-400 text-sm mt-2">+20 from last month</p>
          </div>

          {/* Attendance Rate */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6">
            <div className="flex items-center gap-3">
              <Percent className="text-pink-500" />
              <p className="text-slate-400 text-sm">Attendance Rate</p>
            </div>
            <h2 className="text-3xl font-semibold mt-3">94.2%</h2>
            <p className="text-green-400 text-sm mt-2">+2.1% from last week</p>
          </div>

          {/* Active Classes */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6">
            <div className="flex items-center gap-3">
              <School className="text-pink-500" />
              <p className="text-slate-400 text-sm">Active Classes</p>
            </div>
            <h2 className="text-3xl font-semibold mt-3">42</h2>
            <p className="text-slate-400 text-sm mt-2">Across 13 grades</p>
          </div>

          {/* Classes Marked Today */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-pink-500" />
              <p className="text-slate-400 text-sm">Classes Marked Today</p>
            </div>
            <h2 className="text-3xl font-semibold mt-3">28 / 42</h2>
            <p className="text-slate-400 text-sm mt-2">66% completion</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Students */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6 hover:bg-pink-200/20 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <UserCog className="text-pink-500" />
              <h3 className="text-lg font-medium">Students</h3>
            </div>
            <p className="text-slate-400">
              Manage student profiles, enrollment, and grade assignments.
            </p>
          </div>

          {/* Attendance */}
          <div className="rounded-2xl border border-pink-900/40 bg-pink-200/10 p-6 hover:bg-pink-200/20 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <CalendarCheck className="text-pink-500" />
              <h3 className="text-lg font-medium">Attendance</h3>
            </div>
            <p className="text-slate-400">
              Mark daily attendance, view history, and generate reports.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
