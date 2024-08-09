"use client";

import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTables } from "@/components/dataTables";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AntrianQueueColums, QueueHistoryColums, SettingColums } from "@/constants";
import { DataTypes, JwtPayload } from "@/types/type";
import { formatCreateTime } from "@/helpers/time";
import { formatLongDate, getStartOfMonth, getToday } from "@/helpers/date";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAudioStore from "@/lib/useAudioStore";
import socket from "@/utils/socket";

export default function Dashboard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [data, setData] = useState<DataTypes>();
  const { audioUrl, idQueue, setAudioUrl, setIdQueue } = useAudioStore();
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRecall, setIsLoadingRecall] = useState(false);
  const [slug, setSlug] = useState({ layanan_slug: "" });
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string; }>(
    {
      startDate: getStartOfMonth(),
      endDate: getToday(),
    }
  );
  const [filterToday, setFilterToday] = useState('today');
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    socket.on('newAntrian', () => {
      fetchDatasAntrians(1000000, filterToday, filterDate.startDate, filterDate.endDate, searchTerm);
    });

    return () => {
      socket.off('newAntrian');
    };
  }, [filterToday, filterDate, searchTerm]);

  const fetchDatasAntrians = async (limit: number, range?: string, start_date?: string, end_date?: string, code?: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/dashboard/admlayanan-antrian?limit=${limit}&range=${range}&start_date=${start_date}&end_date=${end_date}&code=${code}`,
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
    fetchDatasAntrians(1000000, filterToday, filterDate.startDate, filterDate.endDate, searchTerm);
  }, [filterToday, filterDate, searchTerm]);

  const formatAntrianDatas = data?.riwayatAntrian?.map((item: any, index: number) => ({
    ...item,
    nomorUrut: index + 1, // Menambahkan nomor urut berdasarkan index
    timeStart: `${formatCreateTime(item.createdAt)} WIB`,
    date: formatLongDate(item.createdAt),
    timeEnd: item.updatedAt ? formatLongDate(item.updatedAt) : null,
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
        setIdQueue(data.data.id);
        toast(data.message);
        fetchDatasAntrians(1000000, filterToday, filterDate.startDate, filterDate.endDate, searchTerm);
      }
    } catch (e: any) {
      toast(e.message);
    } finally {
      setIsLoadingNext(false);
    }
  };

  const finishQueue = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/antrianfinish/${idQueue}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setAudioUrl(null);
        setIdQueue(null);
        localStorage.removeItem("audio");
        toast(data.message);
        fetchDatasAntrians(1000000, filterToday, filterDate.startDate, filterDate.endDate, searchTerm);
      }
    } catch (e: any) {
      toast(e.message);
    } finally {
      setIsLoading(false);
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
              onClick={() => {
                setFilterToday("today")
                setSearchTerm("");
              }}
              value="booking-queue"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Antrian Aktif
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setFilterToday("");
                setSearchTerm("");
              }}
              value="queue-history"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Riwayat Antrian
            </TabsTrigger>
            {/* <TabsTrigger
              value="setting"
              className="bg-primary-100 p-4 hover:bg-primary-700 hover:text-neutral-50 text-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50">
              Pengaturan
            </TabsTrigger> */}
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
                    {(idQueue === null && audioUrl === null && data?.AntrianNext !== "-") ? (
                      <Button
                        onClick={fetchAudio}
                        className="bg-error-700 w-2/12 hover:bg-error-800 rounded-full font-normal text-neutral-50"
                        disabled={isLoadingNext}
                      >
                        {isLoadingNext ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Panggil"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-error-700 w-2/12 hover:bg-error-800 rounded-full font-normal text-neutral-50"
                        disabled={true}
                      >
                        Panggil
                      </Button>
                    )}

                    {idQueue !== null && audioUrl !== null ? (
                      <Button
                        onClick={replayAudio}
                        className="bg-secondary-700 w-2/12 hover:bg-secondary-800 rounded-full font-normal text-neutral-50"
                        disabled={isLoadingRecall}
                      >
                        {isLoadingRecall ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Ulangi"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-secondary-700 w-2/12 hover:bg-secondary-800 rounded-full font-normal text-neutral-50"
                        disabled={true}
                      >
                        Ulangi
                      </Button>
                    )}

                    {idQueue !== null && audioUrl !== null ? (
                      <Button
                        onClick={finishQueue}
                        className="bg-success-700 w-2/12 hover:bg-success-800 rounded-full font-normal text-neutral-50"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Selesai"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-success-700 w-2/12 hover:bg-success-800 rounded-full font-normal text-neutral-50"
                        disabled={true}
                      >
                        Selesai
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-y-4">
                <div className="flex flex-row w-full gap-x-8">
                  <div className="flex flex-row justify-center items-center w-2/6 border border-neutral-400 rounded-full pr-4">
                    <Input
                      className="rounded-full border-none outline-none focus:border-none active:border-none focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                      placeholder="Cari"
                      type="text"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Search className="w-6 h-6 text-neutral-800" />
                  </div>
                </div>

                {filterToday === "today" && (
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
                </div>

                <div className="flex flex-row justify-center items-center w-full border border-neutral-400 rounded-full pr-4">
                  <Input
                    className="rounded-full border-none outline-none focus:border-none active:border-none focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                    placeholder="Cari"
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                {filterToday === "" && (
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
