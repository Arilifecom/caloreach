import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid justify-items-center min-h-dvh bg-cover bg-center pt-10 md:pt-16">
      <Image
        src="/images/bg.webp"
        alt="background-image"
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
        priority
      />
      <main className="flex flex-col gap-4 w-full max-w-md items-center">
        {children}
      </main>
    </div>
  );
}
