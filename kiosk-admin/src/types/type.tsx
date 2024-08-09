export interface JwtPayload {
  layanan_slug: string;
}

export interface AntrianQueueType {
  loket: string;
  layanan: string;
  no_antrian: number;
  time: string;
  status: string;
}

export interface QueueHistoryType {
  loket: string;
  layanan: string;
  no_antrian: number;
  waktu_datang: string;
  waktu_selesai: string;
  status: string;
}

export interface SettingType {
  loket: string;
  laynanan: string;
  aksi: string;
}

export interface TermType {
  id: number;
  desc: string;
  privasi: string;
  privasi_text: string;
}

export interface AntrianHistoryType {
  id: number;
  Layanan: { name: string };
  audio: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  date: string;
  timeStart: string;
  newStatus: string;
  timeEnd: string;
}

export interface DataTypes {
  AntrianCount: number;
  AntrianNext: string;
  AntrianProses: number;
  AntrianSebelumnya: number;
  AntrianSelesaiCount: number;
  riwayatAntrian: AntrianHistoryType[];
}

export interface AntrianDataTypes {
  data: DataTypes;
}
