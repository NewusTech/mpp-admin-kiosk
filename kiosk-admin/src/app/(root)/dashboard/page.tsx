"use client";

import { Input } from "@/components/ui/input";
import { Loader, X } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTables } from "@/components/dataTables";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  AntrianQueueColums,
  QueueHistoryColums,
  SettingColums,
} from "@/constants";
import { DataTypes, JwtPayload } from "@/types/type";
import { formatCreateTime } from "@/helpers/time";
import { formatLongDate, getStartOfMonth, getToday } from "@/helpers/date";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [data, setData] = useState<DataTypes>();
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(true);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoadingRecall, setIsLoadingRecall] = useState(false);
  const [slug, setSlug] = useState({
    layanan_slug: "",
  });
  const [filterDate, setFilterDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded) {
          setSlug({
            layanan_slug: decoded.layanan_slug,
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchDatasAntrians = async (
    limit: number,
    range?: string,
    status?: string,
    start_date?: string,
    end_date?: string,
    code?: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/dashboard/admlayanan-antrian?limit=${limit}&range=${range}&status=${status}&start_date=${start_date}&end_date=${end_date}&code=${code}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      setData(data.data);
    } catch (e: any) {
      toast(e.message);
    }
  };

  useEffect(() => {
    if (today) {
      fetchDatasAntrians(
        1000000,
        "today",
        filterDate.startDate,
        filterDate.endDate,
        "",
        ""
      );
    } else {
      fetchDatasAntrians(
        1000000,
        "",
        filterDate.startDate,
        filterDate.endDate,
        "",
        ""
      );
    }
  }, []);

  const formatAntrianDatas = data?.riwayatAntrian?.map((item: any) => ({
    ...item,
    timeStart: `${formatCreateTime(item.createdAt)} WIB`,
    date: formatLongDate(item.createdAt),
    timeEnd: formatLongDate(item.updatedAt),
    newStatus: item.status ? "Selesai" : "Menunggu",
  }));

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterDate((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audioUrl]);

  const fetchAudio = async () => {
    setIsLoadingNext(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/panggilantrian/get/${slug.layanan_slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAudioUrl(data.data.audio);
        toast(data.message);
        fetchDatasAntrians(
          1000000,
          "today",
          filterDate.startDate,
          filterDate.endDate,
          "",
          ""
        );
      }
    } catch (e: any) {
      toast(e.message);
    } finally {
      setIsLoadingNext(false);
    }
  };

  const replayAudio = () => {
    setIsLoadingRecall(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Error replaying audio:", error);
      });
      setIsLoadingRecall(false);
    }
  };

  return (
    <main className="flex flex-col w-full">
      <div className="felx flex-row w-full px-16">
        <Tabs defaultValue="booking-queue" className="w-full bg-neutral-50">
          <TabsList className="gap-x-3 bg-transparent pb-6 flex justify-start w-full border-b border-primary-700">
            <TabsTrigger
              onClick={() => setToday(true)}
              value="booking-queue"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Antrian Aktif
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setToday(false)}
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
            <div className="flex flex-col w-full mt-5 gap-y-8">
              <div className="flex flex-row w-full gap-x-5">
                <div className="flex flex-col w-full bg-primary-200 rounded-lg">
                  <div className="grid grid-cols-5 w-full p-4 gap-5">
                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Total Antrian
                      </h4>

                      <h6 className="text-primary-700 text-[20px]">
                        {data ? data.AntrianCount : 0}
                      </h6>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Selesai
                      </h4>

                      <h6 className="text-primary-700 text-[20px]">
                        {data ? data.AntrianSelesaiCount : 0}
                      </h6>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Sebelumnya
                      </h4>

                      <h6 className="text-primary-700 text-[20px]">
                        {data ? data.AntrianSebelumnya : 0}
                      </h6>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Saat Ini
                      </h4>

                      <h6 className="text-primary-700 text-[20px]">
                        {data ? data.AntrianProses : 0}
                      </h6>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-neutral-50 w-full rounded-lg py-6">
                      <h4 className="text-neutral-900 font-semibold text-[16px] mb-4">
                        Antrian Selanjutnya
                      </h4>

                      <h6 className="text-primary-700 text-[20px]">
                        {data ? data.AntrianNext : 0}
                      </h6>
                    </div>
                  </div>

                  <div className="flex flex-row self-end justify-end items-center mx-4 w-full gap-x-3 pb-4">
                    <Button
                      onClick={replayAudio}
                      disabled={isLoadingRecall ? true : false}
                      className="bg-secondary-700 w-2/12 rounded-full text-neutral-50 font-normal">
                      {isLoadingRecall ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Ulangi"
                      )}
                    </Button>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-neutral-800 w-2/12 rounded-full text-neutral-50 font-normal">
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

                    <Button
                      onClick={fetchAudio}
                      disabled={isLoadingNext ? true : false}
                      className="bg-error-700 w-2/12 rounded-full text-neutral-50 font-normal">
                      {isLoadingNext ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Panggil"
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-y-4">
                <div className="flex flex-row w-full gap-x-8">
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

                  <div className="flex flex-row justify-center items-center w-full border border-neutral-400 rounded-full pr-4">
                    <Input
                      className="rounded-full border-none outline-none focus:border-none active:border-none focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                      placeholder="Cari"
                      type="text"
                    />

                    <Search className="w-6 h-6 text-neutral-800" />
                  </div>
                </div>

                {today === true && (
                  <DataTables
                    columns={AntrianQueueColums}
                    data={formatAntrianDatas ? formatAntrianDatas : []}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="queue-history">
            <div className="flex flex-col w-full mt-5 gap-y-4">
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
                  <div className="flex flex-row justify-center items-center w-full gap-x-2 md:gap-x-3">
                    <Input
                      type="date"
                      name="startDate"
                      onChange={handleDateChange}
                      value={
                        filterDate.startDate
                          ? filterDate.startDate
                          : getStartOfMonth()
                      }
                      className="w-full h-[40px] block border border-neutral-700 px-2"
                    />
                    <p className="text-center">to</p>
                    <Input
                      type="date"
                      name="endDate"
                      onChange={handleDateChange}
                      value={
                        filterDate.endDate ? filterDate.endDate : getToday()
                      }
                      className="w-full h-[40px] block border border-neutral-700 px-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                {today === false && (
                  <DataTables
                    columns={QueueHistoryColums}
                    data={formatAntrianDatas ? formatAntrianDatas : []}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="setting">
            <div className="flex flex-col w-full mt-5 gap-y-4">
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
                <DataTables columns={SettingColums} data={[]} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
