import { Footer, Header } from "@/app/_component";
import {
  Button,
  CardContent,
  CardHeader,
  CardWithShadow,
} from "@/components/ui";
import Link from "next/link";

export default async function TermsPage() {
  return (
    <>
      <Header />
      <div className="relative grid grid-rows-[40px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 bg-cover bg-center">
        <main className="flex flex-col gap-[32px] w-full max-w-2xl row-start-2 items-center">
          <CardWithShadow className="md:p-10">
            <CardHeader>
              <h1 className="text-2xl font-bold mb-4">
                プライバシーポリシー・免責事項
              </h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-12">
              <div className="article">
                <div>
                  <p>
                    当アプリでは、認証機能の提供、および食事/カロリー記録データの保存・表示のために、以下の情報をSupabaseのデータベースに保存します。
                  </p>
                  <ul className="mt-4 mb-8">
                    <li>
                      <span className="text-primary">&#9655;</span>
                      メールアドレス（認証時）
                    </li>
                    <li>
                      <span className="text-primary">&#9655;</span>ユーザー名
                    </li>
                    <li>
                      <span className="text-primary">&#9655;</span>
                      ユーザー名やプロフィール画像（Googleアカウント連携時）
                    </li>
                    <li>
                      <span className="text-primary">&#9655;</span>
                      ユーザーが入力した食事/カロリー記録データ
                    </li>
                  </ul>
                  <p>
                    これらの情報は、アプリのサービス提供目的以外で使用することはありません。法律で定められた場合を除き、第三者に開示・提供することはありません。
                  </p>
                  <p>
                    また、Googleアカウント連携により取得する情報は、当アプリのサービス利用に必要な範囲でのみ利用します。Googleのプライバシーポリシーについては、
                    <a
                      href="https://policies.google.com/"
                      rel="noopener noreferrer"
                      className="underline"
                      target="_blank"
                    >
                      Google ポリシーと規約
                    </a>
                    をご確認ください。
                  </p>
                </div>

                <div>
                  <h2>Cookie（クッキー）について</h2>
                  <p>
                    当アプリでは、サービスの正常な動作と機能維持（ログイン状態の保持やデータキャッシュ管理など）に必須のCookieのみを使用しています。
                  </p>
                  <p>
                    これらの必須Cookieをブラウザの設定で無効化した場合、アプリのログインやデータ保存などの主要な機能が正しく動作せず、サービスをご利用いただけない可能性があります。
                  </p>
                </div>

                <div>
                  <h2>データ削除について</h2>
                  <p>
                    ご自身のログイン情報やデータ削除をご希望の場合は、下記フォーム（Googleフォーム）からご連絡ください。
                  </p>
                  <Button className="mb-2">
                    <a
                      href="https://forms.gle/PtJFkJc4o9uYvK1Q9"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      お問い合わせフォーム
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600">
                    ※お問い合わせフォームではご回答用のメールアドレスを記入いただいております。お問い合わせへの回答にのみ使用し、それ以外の目的で使用することはありません。
                  </p>
                </div>

                <div>
                  <h2>免責事項・サービス提供の中断</h2>
                  <p>
                    当アプリは個人制作であり、開発者の都合により、事前の通知なくサービス内容の変更、または提供を中断・終了する場合があります。
                  </p>
                  <p>
                    サービスの中断・終了によって生じたいかなる損害についても、開発者は一切の責任を負いません。あらかじめご了承ください。
                  </p>
                  <p>
                    また、本ポリシーの内容は、必要に応じて事前の予告なく変更されることがあります。変更後は、変更内容を当ページに掲載することで、すべての利用者が変更後のポリシーに同意したものとみなします。
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Last Updated: 2025-11-28
                  </p>
                </div>

                <p className="text-center underline">
                  <Link href="/" className="font-bold cursor-pointer">
                    ホームへもどる
                  </Link>
                </p>
              </div>
            </CardContent>
          </CardWithShadow>
        </main>
      </div>
      <Footer />
    </>
  );
}
