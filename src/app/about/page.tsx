import { Footer, Header } from "@/app/_component";
import { CardContent, CardHeader, CardWithShadow } from "@/components/ui";
import Link from "next/link";

export default async function Aboutpage() {
  return (
    <>
      <Header />
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 bg-cover bg-center">
        <main className="flex flex-col gap-[32px] w-full max-w-2xl row-start-2 items-center pt-8 md:pt-0">
          <CardWithShadow className="py-6 md:p-10">
            <CardHeader>
              <h1 className="text-2xl font-bold">こんにちは、Ariです</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 article">
              <div>
                <p>
                  このカロリーチは、毎日のカロリー管理を「続けやすく」することだけを考えて作った、小さなウェブアプリです。
                </p>
                <p>
                  正確な栄養管理を目的にしているわけではなく、ちょっとした目安として使いながら、毎日の習慣にすることを重視しています。
                </p>
              </div>

              <div>
                <h2>制作のきっかけ</h2>
                <p>
                  友人が毎日の摂取カロリー管理に苦戦している姿を見て、「日々の食事の中で少しずつでもカロリーを意識できるツールを作ろう」と思ったのが始まりです。
                </p>
              </div>
              <div>
                <h2>制作背景</h2>
                <p>
                  本ウェブアプリは、プログラミングスクールのポートフォリオ課題として制作しました。
                </p>
                <p>
                  Next.jsとSupabaseを使用し、設計から実装まで一貫して行っています。
                </p>
              </div>

              <div>
                <h2>このアプリでできること</h2>
                <ul>
                  <li>
                    <span className="text-primary ">&#9655;</span>
                    1日の摂取カロリーを簡単に記録
                  </li>
                  <li>
                    <span className="text-primary">&#9655;</span>
                    目標カロリーに対する進捗を確認
                  </li>
                  <li>
                    <span className="text-primary">&#9655;</span>
                    過去の記録をさっと振り返り
                  </li>
                </ul>
                <div>
                  <p>
                    検索機能で使用している食品データは日本食品標準成分表をもとにしていますが、すべての食品を網羅しているわけではありません。
                  </p>
                  <p>
                    また、調理法や廃棄率は考慮しておらず、あくまでカロリーの目安を気軽に記録し続けるためのアプリとして設計しています。
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2>さいごに</h2>
                <p>ここまでお読みいただき、ありがとうございます。</p>
                <p>もしよければ、実際に触ってみてください。</p>
              </div>

              <p className="text-center underline">
                <Link href="/" className="font-bold cursor-pointer">
                  ホームへもどる
                </Link>
              </p>
            </CardContent>
          </CardWithShadow>
        </main>
      </div>
      <Footer />
    </>
  );
}
