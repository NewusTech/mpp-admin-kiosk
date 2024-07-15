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
