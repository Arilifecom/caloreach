import { GetStartedButton } from "@/components";
import { CardHeader, CardWithShadow } from "@/components/ui";
import Image from "next/image";

type CtaSectionProps = {
  isLoggedIn: boolean;
};

export const CtaSection = ({ isLoggedIn }: CtaSectionProps) => {
  return (
    <section className="min-h-[70vh] grid place-items-center p-[5%] md:min-h-screen">
      <CardWithShadow className="max-w-2xl">
        <CardHeader>
          <div className="text-center text-4xl font-black uppercase leading-snug md:text-6xl md:leading-[80px]">
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
            <GetStartedButton isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </CardWithShadow>
    </section>
  );
};
