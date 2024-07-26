"use client";

import logo from "@/../public/assets/DesignLogoMpp.svg";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeOff, Eye, UserRound, Loader } from "lucide-react";
import { Raleway } from "next/font/google";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { TermType } from "@/types/type";
import { TermCondition } from "@/components/fetchings/apis";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const formSchema = z.object({
  nik: z
    .string({ message: "Email/NIK/No-Telepon Tidak Boleh Kosong!" })
    .min(5, { message: "Email/NIK/No-Telepon harus lebih dari 5 karakter" }),
  password: z
    .string({ message: "Password harus lebih dari 6 karakter" })
    .min(6, { message: "Password harus lebih dari 6 karakter" }),
});

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = TermCondition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      password: "",
    },
  });

  const term = data?.data;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const formData = {
        nik: values.nik,
        password: values.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/login?admin=${"true"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (result?.data?.token) {
        Cookies.set("Authorization", result?.data?.token);
        toast.success("Login berhasil!", { duration: 1000 });
        router.push("/dashboard");
      } else {
        toast.error("Login gagal. Periksa NIK dan password Anda.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="md:container md:mx-auto flex justify-center items-center bg-gradient-to-bl from-neutral-50 from-[-40%] via-primary-700 via-99% to-neutral-700 to-[120%] w-screen h-screen md:min-w-full">
      <div className="flex flex-col w-5/12 items-center justify-center rounded-2xl bg-neutral-50 py-12 px-20">
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-6/12">
            <Image
              src={logo}
              alt="Lampung Timur"
              className="w-full h-full object-fit"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex flex-col w-full justify-center items-center">
            <h3
              className={`${raleway.className} font-semibold text-[20px] text-primary-700`}>
              MAL PELAYANAN PUBLIK
            </h3>

            <h3
              className={`${raleway.className} font-normal text-primary-800 text-[16px]`}>
              Kabupaten Lampung Timur
            </h3>
          </div>
        </Link>

        <div className="flex flex-col w-full justify-center mt-8 md:mt-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-y-4">
                <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="nik"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="NIK/Email/Nomor-Telepon"
                              {...field}
                              className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-2">
                    <UserRound className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                  </div>
                </div>
                {form.formState.errors.nik && (
                  <p className="text-destructive text-[14px] text-error-700 mb-1">
                    {form.formState.errors.nik.message}
                  </p>
                )}

                <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type={!seen ? "text" : "password"}
                              placeholder="Kata Sandi"
                              {...field}
                              className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div onClick={() => setSeen(!seen)} className="p-2">
                    {seen ? (
                      <EyeOff className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    ) : (
                      <Eye className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    )}
                  </div>
                </div>
                {form.formState.errors.password && (
                  <p className="text-destructive text-[14px] text-error-700 mb-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-3/12 h-[72px] flex flex-row justify-center items-center self-center">
                <Button
                  className="text-neutral-50 bg-primary-700 w-full h-[40px] font-normal text-[16px] rounded-full"
                  type="submit"
                  variant="outline">
                  {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="w-full text-center text-primary-700 text-[14px] mt-4">
          Dengan mendaftar, Anda menyetujui{" "}
          {term && (
            <Link
              href={term?.desc}
              target="_blank"
              className="text-primary-800 font-semibold hover:underline">
              Syarat & Ketentuan{" "}
            </Link>
          )}{" "}
          kami dan Anda telah membaca{" "}
          {term && (
            <Link
              href={term?.privasi}
              target="_blank"
              className="text-primary-800 font-semibold hover:underline">
              Kebijakan Privasi{" "}
            </Link>
          )}{" "}
          kami.
        </div>
      </div>
    </section>
  );
}
