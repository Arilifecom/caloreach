"use client";

import { Button, CardHeader, CardWithShadow } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CtaSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-[70vh] grid place-items-center p-[5%] md:min-h-screen">
      <CardWithShadow>
        <CardHeader>
          <div className="text-center text-4xl font-black uppercase leading-snug md:text-6xl md:leading-20">
            <h2 className="leading-tight">Reach Your calorie target</h2>
          </div>
        </CardHeader>

        <div className="flex flex-col place-items-center place-content-center">
          <div className="text-base font-medium text-center text-gray-700">
            <Image
              src="/images/cta-image.svg"
              priority
              alt="サムズアップ"
              width={200}
              height={114}
              className="mx-auto mb-2"
            />
            <p>まいにちの目標</p>
            <p>カロリーにリーチする</p>
          </div>

          <div className="mt-6">
            <Button onClick={() => router.push("/auth/signup")}>
              新しく始める
            </Button>
          </div>
        </div>
      </CardWithShadow>
    </section>
  );
};
