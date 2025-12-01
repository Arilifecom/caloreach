import {
  CtaSection,
  Footer,
  Header,
  HiroSection,
  HowToUseSection,
} from "@/app/_component";
import { checkAuthClient } from "@/utils/auth";

export default async function Home() {
  const isLoggedIn = await checkAuthClient();

  return (
    <>
      <Header />
      <main className="flex flex-col gap-[32px] justify-center">
        <HiroSection isLoggedIn={isLoggedIn} />
        <HowToUseSection />
        <CtaSection isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </>
  );
}
