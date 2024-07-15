import { AntrianQueueType, QueueHistoryType, SettingType } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";

export const AntrianQueueColums: ColumnDef<AntrianQueueType>[] = [
  {
    accessorKey: "loket",
    header: "Loket",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
  },
  {
    accessorKey: "no_antrian",
    header: "Nomor Antrian",
  },
  {
    accessorKey: "time",
    header: "Waktu",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const QueueHistoryColums: ColumnDef<QueueHistoryType>[] = [
  {
    accessorKey: "loket",
    header: "Loket",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
  },
  {
    accessorKey: "no_antrian",
    header: "Nomor Antrian",
  },
  {
    accessorKey: "waktu_datang",
    header: "Waktu Datang",
  },
  {
    accessorKey: "waktu_selesai",
    header: "Waktu Selesai",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const SettingColums: ColumnDef<SettingType>[] = [
  {
    accessorKey: "loket",
    header: "Loket",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
  },
];
