"use client";

import { Button } from "@/components/ui/button";
import { EyeOff, Eye, UserRound, Loader } from "lucide-react";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
import { Raleway } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="username"
                              {...field}
                              className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-2">
                    <UserRound className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                  </div>
                </div>

                <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Kata Sandi"
                              {...field}
                              className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
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
      </div>
    </section>
  );
}
