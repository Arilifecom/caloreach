"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const HiroSection = () => {
  const router = useRouter();
  return (
    <section>
      <div className="w-full h-full p-[5%] min-h-screen gap-12 flex flex-col place-items-center md:flex-row md:place-items-start md:gap-6 md:p-[10%]">
        <div className="flex h-full w-full flex-col place-content-center gap-0 pt-16 md:max-w-[50%] md:gap-6">
          <div className="text-center text-4xl font-black uppercase leading-snug md:text-6xl md:leading-20">
            <h1 className="leading-tight max-w-96 mx-auto md:leading-16">
              Reach your daily kcal target
            </h1>
          </div>

          <div className="flex flex-col w-full place-items-center place-content-center gap-4 md:gap-8">
            <div className="text-base font-medium mt-3 p-2 text-center text-gray-700 max-w-96">
              <p className="mb-4 font-bold">
                「あとどれくらい？」が、ひと目でわかる
              </p>
              <p>目標までの残りを可視化する</p>
              <p>シンプルなカロリー管理アプリ</p>
            </div>

            <div className="flex place-items-center gap-4">
              <Button
                onClick={() => router.push("/auth/signup")}
                className="font-bold"
              >
                アカウントを作成する
              </Button>

              <Link href="#fllows">
                <Button
                  variant="outline"
                  className="font-bold border-2 border-gray-800"
                >
                  使い方はこちら
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full h-150 md:h-250">
          <Image
            src="/images/phone.webp"
            alt="phone"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};
