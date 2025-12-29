import {
  CtaSection,
  Footer,
  Header,
  HiroSection,
  HowToUseSection,
} from "@/app/_component";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 justify-center">
        <HiroSection />
        <HowToUseSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
