"use client";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTables } from "@/components/dataTables";
import {
  AntrianQueueColums,
  QueueHistoryColums,
  SettingColums,
} from "../constants";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-col w-full">
      <div className="felx flex-row w-full px-16">
        <Tabs defaultValue="booking-queue" className="w-full bg-neutral-50">
          <TabsList className="gap-x-3 bg-transparent pb-6 flex justify-start w-full border-b border-primary-700">
            <TabsTrigger
              value="booking-queue"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Antrian Aktif
            </TabsTrigger>
            <TabsTrigger
              value="queue-history"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Riwayat Antrian
            </TabsTrigger>
            <TabsTrigger
              value="setting"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking-queue">
            <div className="flex flex-col w-full mt-5">
              <div className="flex flex-row w-full gap-x-5">
                <div className="flex flex-row w-full gap-x-8">
                  <div className="flex flex-row justify-center items-center w-full">
                    <Select>
                      <SelectTrigger className="w-full rounded-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-row justify-center items-center w-full">
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
                </div>

                <div className="flex flex-col w-full bg-primary-200 rounded-lg">
                  <div className="grid grid-cols-2 w-full p-4 gap-5">
                    <div className="flex flex-col justify-center items-center bg-primary-600 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Diproses
                      </h4>

                      <h6 className="text-neutral-50 text-[26px]">A10</h6>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Selanjutnya
                      </h4>

                      <h6 className="text-primary-700 text-[26px]">A10</h6>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 w-full place-items-center gap-x-3 px-10 pb-4">
                    <Button className="bg-error-700 w-full rounded-full text-neutral-50 font-normal">
                      Panggil
                    </Button>

                    <Button className="bg-secondary-700 w-full rounded-full text-neutral-50 font-normal">
                      Ulangi
                    </Button>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-neutral-800 w-full rounded-full text-neutral-50 font-normal">
                          Transfer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader className="mb-4">
                          <AlertDialogTitle>
                            <div className="flex flex-row justify-between">
                              <h3>Transfer</h3>

                              <AlertDialogFooter></AlertDialogFooter>
                              <div onClick={() => setOpen(false)}>
                                <X className="w-6 h-6" />
                              </div>
                            </div>
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Pilih metode transfer:
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Tabs defaultValue="transfer-antrian">
                          <TabsList className="gap-x-3 bg-transparent flex justify-start w-full">
                            <TabsTrigger
                              value="transfer-antrian"
                              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
                              Transfer Antrian
                            </TabsTrigger>
                            <TabsTrigger
                              value="transfer-loket"
                              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
                              Transfer Loket
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="transfer-antrian">
                            <form className="border border-neutral-700 rounded-lg p-4">
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-col w-full">
                                  <h3 className="text-primary-800 font-semibold text-[16px]">
                                    Nomor Antrian: 10
                                  </h3>

                                  <h3 className="text-primary-800 font-semibold text-[16px]">
                                    Jenis Layanan: Permbuatan KTP
                                  </h3>
                                </div>

                                <div className="flex flex-row w-full gap-x-4">
                                  <div className="flex flex-col w-full gap-y-3">
                                    <Label className="text-neutral-900">
                                      Loket Awal
                                    </Label>

                                    <Select>
                                      <SelectTrigger className="w-full rounded-full">
                                        <SelectValue placeholder="Pilih Loket" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="light">
                                          Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                          Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                          System
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex flex-col w-full gap-y-3">
                                    <Label className="text-neutral-900">
                                      Loket Tujuan
                                    </Label>

                                    <Select>
                                      <SelectTrigger className="w-full rounded-full">
                                        <SelectValue placeholder="Pilih Loket" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="light">
                                          Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                          Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                          System
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <Button
                                  type="submit"
                                  className="self-end bg-primary-700 w-4/12 rounded-full text-neutral-50 hover:bg-primary-600">
                                  Transfer Antrian
                                </Button>
                              </div>
                            </form>
                          </TabsContent>
                          <TabsContent value="transfer-loket">
                            <form className="bg-neutral-50 border border-neutral-700 rounded-lg p-4">
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-row w-full gap-x-4">
                                  <div className="flex flex-col w-full gap-y-3">
                                    <Label className="text-neutral-900">
                                      Loket Awal
                                    </Label>

                                    <Select>
                                      <SelectTrigger className="w-full rounded-full">
                                        <SelectValue placeholder="Pilih Loket" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="light">
                                          Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                          Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                          System
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex flex-col w-full gap-y-3">
                                    <Label className="text-neutral-900">
                                      Loket Tujuan
                                    </Label>

                                    <Select>
                                      <SelectTrigger className="w-full rounded-full">
                                        <SelectValue placeholder="Pilih Loket" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="light">
                                          Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                          Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                          System
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <Button
                                  type="submit"
                                  className="self-end bg-primary-700 w-4/12 rounded-full text-neutral-50 hover:bg-primary-600">
                                  Transfer Loket
                                </Button>
                              </div>
                            </form>
                          </TabsContent>
                        </Tabs>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button className="bg-success-700 w-full rounded-full text-neutral-50 font-normal">
                      Selesai
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <DataTables
                  columns={AntrianQueueColums}
                  data={[]}
                  filterBy={"loket" || "status"}
                  type="requirement"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="queue-history">
            <div className="flex flex-col w-full mt-5">
              <div className="flex flex-row w-full gap-x-4">
                <div className="flex flex-row justify-center items-center w-full">
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

                <div className="flex flex-row justify-center items-center w-full border border-neutral-400 rounded-full pr-4">
                  <Input
                    className="rounded-full border-none outline-none focus:border-none active:border-none focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                    placeholder="Cari"
                    type="text"
                  />

                  <Search className="w-6 h-6 text-neutral-800" />
                </div>

                <div className="flex flex-row justify-evenly items-center w-3/12 gap-x-4">
                  <div className="flex flex-row justify-center items-center w-1/12">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <p className="text-neutral-900">to</p>

                  <div className="flex flex-row justify-center items-center w-1/12">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div>
                <DataTables
                  columns={QueueHistoryColums}
                  data={[]}
                  filterBy={"loket" || "status" || "time"}
                  type="requirement"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="setting">
            <div className="flex flex-col w-full mt-5">
              <div className="flex flex-row w-full gap-x-4">
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

                <Link href={"/setting"}>
                  <Button className="bg-primary-700 hover:bg-primary-600 w-full rounded-full text-neutral-50 font-normal">
                    Tambah
                  </Button>
                </Link>
              </div>

              <div>
                <DataTables
                  columns={SettingColums}
                  data={[]}
                  filterBy={"loket"}
                  type="requirement"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
