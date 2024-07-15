"use client";

import NavbarScreen from "@/components/landing/navbarScreen/navbarScreen";
import { Poppins } from "next/font/google";
import React from "react";

import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${poppins.className} bg-primary-50 w-full relative flex flex-col min-h-screen`}>
      <NavbarScreen />
      <div className="flex-1 overflow-y-auto pt-6 bg-primary-50">
        {children}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
