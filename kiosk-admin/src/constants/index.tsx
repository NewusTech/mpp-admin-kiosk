import {
  AntrianHistoryType,
  AntrianQueueType,
  QueueHistoryType,
  SettingType,
} from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";

export const AntrianQueueColums: ColumnDef<AntrianHistoryType>[] = [
  {
    accessorKey: "id",
    header: "Loket",
  },
  {
    accessorKey: "Layanan.name",
    header: "Layanan",
  },
  {
    accessorKey: "code",
    header: "Nomor Antrian",
  },
  {
    accessorKey: "timeStart",
    header: "Waktu",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "newStatus",
    header: "Status",
  },
];

export const QueueHistoryColums: ColumnDef<QueueHistoryType>[] = [
  {
    accessorKey: "id",
    header: "Loket",
  },
  {
    accessorKey: "Layanan.name",
    header: "Layanan",
  },
  {
    accessorKey: "code",
    header: "Nomor Antrian",
  },
  {
    accessorKey: "timeStart",
    header: "Waktu Datang",
  },
  {
    accessorKey: "timeEnd",
    header: "Waktu Selesai",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "newStatus",
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
