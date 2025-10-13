import TanstackQueryProvider from "@/utils/tanstack/provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TanstackQueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryProvider>
  );
}
