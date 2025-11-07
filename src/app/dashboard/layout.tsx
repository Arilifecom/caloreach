import { DashboardNav } from "@/app/dashboard/_components";
import TanstackQueryProvider from "@/app/dashboard/provider";
import { Toaster } from "@/components/ui";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <Toaster />
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <DashboardNav />
      </main>
    </div>
  );
}
