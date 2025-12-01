import { GetStartedButton } from "@/components";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

type HiroSectionProps = {
  isLoggedIn: boolean;
};

export const HiroSection = ({ isLoggedIn }: HiroSectionProps) => {
  return (
    <section>
      <div className="w-full h-full p-[5%] min-h-[100vh] gap-12 flex flex-col place-items-center md:flex-row md:place-items-start md:gap-6">
        <div className="flex h-full w-full flex-col place-content-center gap-0 pt-16 md:max-w-[50%] md:pt-40 md:gap-6">
          <div className="text-center text-4xl font-black uppercase leading-snug md:text-6xl md:leading-[80px]">
            <h1 className="max-w-96 mx-auto leading-tight">
              Record Your calorie simply
            </h1>
          </div>

          <div className="flex flex-col w-full place-items-center place-content-center">
            <div className="text-base font-medium mt-3 p-2 text-center text-gray-700 max-w-72">
              <p>毎日のカロリー管理をシンプルにして</p>
              <p>「継続」させたい人へ</p>
            </div>

            <div className="mt-4 flex place-items-center gap-4 md:mt-10">
              <GetStartedButton isLoggedIn={isLoggedIn} />

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

        <div className="w-full max-w-[450px] flex place-content-center overflow-hidden md:max-w-[750px]">
          <div className="relative flex place-content-center slide-in">
            <div className="overflow-hidden">
              <Image
                src="/images/phone.png"
                priority
                alt="phone"
                width={450}
                height={750}
                className="h-full w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
