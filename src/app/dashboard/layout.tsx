import { DashboardNav } from "@/app/dashboard/_components";
import TanstackQueryProvider from "@/app/dashboard/provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      <DashboardNav />
    </>
  );
}
