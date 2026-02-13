import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import { AppProvider } from "@/redux/AppProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/background-splash.svg" as="image" />
      </head>
      <body>
        <AppProvider>
          <LenisScroll />
          {children}
          <ToastContainer position="bottom-right" theme="dark" />
        </AppProvider>
      </body>
    </html>
  );
}
