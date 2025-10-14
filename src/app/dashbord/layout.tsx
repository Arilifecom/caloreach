import TanstackQueryProvider from "@/app/dashbord/provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
