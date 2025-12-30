import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid justify-items-center min-h-dvh bg-cover bg-center p-5 pt-8 md:pt-16">
      <Image
        src="/images/bg.webp"
        alt="background-image"
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
        priority
      />
      <main className="flex flex-col gap-2 w-full items-center">
        {children}
      </main>
    </div>
  );
}
