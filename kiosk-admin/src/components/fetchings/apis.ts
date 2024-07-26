import { fetchAuth, fetchNoAuth } from "@/utils/fetchers";
import useSWR from "swr";

export function AntrianDash(
  limit: number,
  range?: string,
  status?: string,
  start_date?: string,
  end_date?: string,
  code?: string
) {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/dashboard/admlayanan-antrian?limit=${limit}&range=${range}&status=${status}&start_date=${start_date}&end_date=${end_date}&code=${code}`,
    fetchAuth
  );

  return {
    data,
    isLoading,
  };
}

export function TermCondition() {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/termcond/get`,
    fetchNoAuth
  );

  return {
    data,
    isLoading,
  };
}
