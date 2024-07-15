"use client";

import { ChevronLeft, CirclePlus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactHTML, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingAdd() {
  const router = useRouter();
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);

  const handleAddClick = () => {
    setInputs([...inputs, { id: Date.now(), value: "" }]);
  };

  const handleRemoveClick = () => {
    setInputs(inputs.slice(0, -1));
  };

  const handleChange = (id: number, newValue: any) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", inputs);
  };

  return (
    <section className="flex flex-col w-full px-20">
      <div className="flex flex-row w-full gap-x-8">
        <div onClick={() => router.back()}>
          <ChevronLeft className="w-8 h-8 text-primary-700" />
        </div>

        <div className="flex flex-col w-full gap-y-5">
          <h3 className="text-neutral-900 font-semibold text-[20px]">Loket</h3>

          <div className="flex flex-row justify-center items-center w-3/12">
            <Select>
              <SelectTrigger className="w-full rounded-full">
                <SelectValue placeholder="Loket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-full gap-y-4">
            <h4 className="text-neutral-900 font-semibold text-[16px]">
              Layanan
            </h4>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-y-4">
              {inputs.map((input, index) => (
                <div
                  key={input.id}
                  className="bg-neutral-50 rounded-xl w-full border border-neutral-700 h-[100px] flex flex-col justify-center">
                  <Input
                    name={`input-${index}`}
                    type="text"
                    value={input.value}
                    onChange={(e) => handleChange(input.id, e.target.value)}
                    className="w-full rounded-xl border-none active:border-none focus:border-none active:outline-none focus:outline-none active:ring-0 focus:ring-0"
                    placeholder="Ketik Disini..."
                  />
                </div>
              ))}

              <div className="flex flex-row w-full gap-x-2">
                <div className="flex flex-row justify-center items-center w-2/12">
                  <Button
                    onClick={handleAddClick}
                    type="button"
                    className="w-full border border-neutral-600 text-primary-700 rounded-full gap-x-2">
                    <CirclePlus className="w-4 h-4" />
                    Tambah
                  </Button>
                </div>

                <div className="flex flex-row justify-center items-center w-2/12">
                  <Button
                    onClick={handleRemoveClick}
                    type="button"
                    className="w-full border border-neutral-600 text-primary-700 rounded-full gap-x-2">
                    <Trash className="w-4 h-4" />
                    Hapus
                  </Button>
                </div>
              </div>

              <div className="flex flex-row justify-end items-end self-end w-1/12 group">
                <Button
                  type="submit"
                  className="bg-primary-700 rounded-full w-full text-neutral-50 group-hover:bg-primary-600">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
