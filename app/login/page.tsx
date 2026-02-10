"use client";
import { motion } from "motion/react";
import TiltedImage from "@/components/TiltImage";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  // Navigate
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // later on i will  add auth validation here
    router.push("/dashboard");
  };

  const stats = [
    { value: "500+", label: "Schools" },
    { value: "50k+", label: "Students" },
    { value: "99%", label: "Accuracy" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Background glow */}
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]" />

      {/* Main layout */}
      <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-6xl">
        {/* LEFT – Branding */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 60 }}
        >
          <h1 className="text-5xl/17 md:text-6xl/21 font-medium">EduAttend</h1>

          <p className="text-slate-200 max-w-lg mt-6">
            Streamline your school's attendance management with our modern,
            intuitive platform.
          </p>

          <div className="flex flex-wrap gap-10 mt-10 justify-center lg:justify-start">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="text-3xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT – Login */}
        <motion.div
          className="bg-pink-200/10 border border-pink-900/40 rounded-2xl p-8 w-full max-w-md mx-auto"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 60 }}
        >
          <h2 className="text-3xl font-medium mb-2">Welcome back</h2>
          <p className="text-slate-300 mb-6">Sign in to your teacher account</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl bg-transparent border border-pink-900 px-4 h-11 text-white outline-none focus:border-pink-600"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl bg-transparent border border-pink-900 px-4 h-11 text-white outline-none focus:border-pink-600"
            />

            <div className="flex justify-end text-sm">
              <span className="text-pink-400 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 transition text-white rounded-full h-11"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>

      {/* Visual component */}
      <TiltedImage />
    </div>
  );
}
