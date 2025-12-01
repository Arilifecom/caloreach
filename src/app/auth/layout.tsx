import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen p-8 pb-20 sm:p-20 bg-cover bg-center">
      <Image
        src="/images/bg.webp"
        alt="background-image"
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
        priority
      />
      <main className="flex flex-col gap-[32px] w-full max-w-md row-start-2 items-center">
        {children}
      </main>
    </div>
  );
}
