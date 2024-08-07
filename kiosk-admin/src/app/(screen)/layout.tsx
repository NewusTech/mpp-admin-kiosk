"use client";

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function ScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppins.className} h-screen w-screen bg-primary-100`}>
      <div className="flex-1 overflow-y-auto">
        {children}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
