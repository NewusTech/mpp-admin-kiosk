import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "@/../../public/assets/DesignLogoMpp.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Kios K MPP Kabupaten Lampung Timur",
  description: "Admin Kios K MPP Kabupaten Lampung Timur",
  icons: {
    icon: {
      url: `${logo.src}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
