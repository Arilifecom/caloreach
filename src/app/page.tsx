import { GetStartedButton } from "@/components";
import { checkAuthClient } from "@/utils/auth";

export default async function Home() {
  const isLoggedIn = await checkAuthClient();

  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] items-center mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <h1>Landing Page</h1>
        <GetStartedButton isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
}
