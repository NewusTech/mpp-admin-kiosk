"use client";

import logo from "@/../public/assets/DesignLogoMpp.svg";
import yt from "@/../public/assets/yt.png";
import Image from "next/legacy/image";

export default function Screen() {
  return (
    <div className="flex flex-col w-full px-24 gap-y-4">
      <div className="flex flex-row w-full gap-x-4 mt-3">
        <div className="flex flex-row w-1/12">
          <Image
            src={logo}
            alt="Lampung Timur"
            className="w-full h-full object-fill"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex justify-center items-center bg-primary-700 rounded-lg w-full">
          <h3 className="capitalize text-neutral-50 text-[24px] font-semibold">
            Nomor Antrian Dinas Kependudukan Dan Catatan Sipil
          </h3>
        </div>

        <div className="grid grid-cols-2 place-items-center justify-center items-center bg-secondary-700 rounded-lg w-4/12">
          <div className="flex flex-col">
            <h3 className="text-neutral-50 text-[20px]">Rabu</h3>

            <p className="text-neutral-50 text-[20px]">03-07-2024</p>
          </div>

          <div className="">
            <h3 className="text-neutral-50 text-[32px] font-semibold">11:20</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-x-4">
        <div className="flex flex-col justify-evenly items-center bg-secondary-700 rounded-lg w-5/12">
          <h4 className="text-neutral-50 font-semibold text-[30px]">
            Nomor Antrian
          </h4>

          <h2 className="text-neutral-50 font-semibold text-[50px]">A10</h2>

          <h5 className="text-neutral-50 font-normal text-[20px]">Loket 1</h5>
        </div>

        <div className="bg-neutral-50 w-full rounded-lg">
          <div className="flex flex-row w-full">
            <Image
              src={yt}
              alt="Youtube"
              className="w-full h-full object-fit rounded-lg"
              width={1000}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 justify-between w-full gap-x-4">
        <div className="bg-[#3597FC] rounded-lg grid grid-rows-2 place-items-center w-full p-8">
          <h4 className="text-neutral-50 font-semibold text-[50px]">A10</h4>

          <h5 className="text-neutral-50 font-normal text-[26px]">Loket 1</h5>
        </div>

        <div className="bg-[#00CC83] rounded-lg grid grid-rows-2 place-items-center w-full p-8">
          <h4 className="text-neutral-50 font-semibold text-[50px]">A10</h4>

          <h5 className="text-neutral-50 font-normal text-[26px]">Loket 1</h5>
        </div>

        <div className="bg-[#ED4B54] rounded-lg grid grid-rows-2 place-items-center w-full p-8">
          <h4 className="text-neutral-50 font-semibold text-[50px]">A10</h4>

          <h5 className="text-neutral-50 font-normal text-[26px]">Loket 1</h5>
        </div>

        <div className="bg-[#A636FF] rounded-lg grid grid-rows-2 place-items-center w-full p-8">
          <h4 className="text-neutral-50 font-semibold text-[50px]">A10</h4>

          <h5 className="text-neutral-50 font-normal text-[26px]">Loket 1</h5>
        </div>
      </div>
    </div>
  );
}
