import { DashboardHeader, DashboardNav } from "@/app/dashboard/_components";
import TanstackQueryProvider from "@/app/dashboard/provider";
import { Toaster } from "@/components/ui";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="min-h-screen">
        <DashboardHeader />
        <div className="font-sans grid justify-items-center  max-w-md mx-auto px-6 text-sm pb-20">
          <main className="flex flex-col gap-6 w-full items-center md:gap-8">
            <Toaster />
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
            <DashboardNav />
          </main>
        </div>
      </div>
    </>
  );
}
