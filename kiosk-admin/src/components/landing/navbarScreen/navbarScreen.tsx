"use client";

import { LogOut } from "lucide-react";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
import { Raleway } from "next/font/google";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function NavbarScreen() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("Authorization");
    router.push("/");
  };

  return (
    <div className={`flex w-full py-6 justify-between px-16 bg-neutral-50`}>
      <div className="flex flex-row w-full h-[64px] gap-x-3">
        <div className="flex flex-row w-1/12">
          <Image
            src={logo}
            alt="Lampung Timur"
            className="w-full h-full object-fill"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none">
          <h3
            className={`${raleway.className} font-bold text-[14px] text-secondary-700 py-[4px]`}>
            MAL PELAYANAN PUBLIK
          </h3>

          <h3
            className={`${raleway.className} font-normal text-primary-700 text-[12px]`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </div>

      <div
        onClick={handleLogout}
        className="flex flex-row w-2/12 bg-primary-700 cursor-pointer group rounded-lg justify-center items-center my-2 gap-x-3 group hover:bg-primary-600">
        <LogOut className="w-5 h-5 text-neutral-50" />
        <Button className="text-neutral-50 text-[16px] font-normal p-0">
          Keluar
        </Button>
      </div>
    </div>
  );
}
