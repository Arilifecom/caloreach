export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen text-sm p-8 pt-14 pb-20 sm:p-20">
      <main className="flex flex-col gap-[24px] w-full max-w-md row-start-2 items-center">
        {children}
      </main>
    </div>
  );
}
