import { PageHeader } from "@/components";

const steps = [
  {
    title: "食事を記録（検索 or 手入力）",
    description:
      "食品検索で量を入力するだけでカロリーを自動計算。その日の食事をすぐに記録できます。",
    step: 1,
    video: (
      <video
        src="/videos/step-1.mp4"
        width="250px"
        height="auto"
        controls
        playsInline
        preload="none"
        muted
        poster="/images/sutep1-thumbnail.png"
      />
    ),
  },
  {
    title: "レギュラーフードを登録",
    description:
      "よく食べるメニューを事前に保存。次回からはワンタップで素早く記録できます。",
    step: 2,
    video: (
      <video
        src="/videos/step-2.mp4"
        width="250px"
        height="auto"
        controls
        playsInline
        preload="none"
        muted
        poster="/images/sutep2-thumbnail.png"
      />
    ),
  },
  {
    title: "履歴で振り返る",
    description:
      "日ごとの合計カロリーを一覧で確認。記録漏れがあっても、詳細ページで食事を追加・編集できます。",
    step: 3,
    video: (
      <video
        src="/videos/step-3.mp4"
        width="250px"
        height="auto"
        controls
        playsInline
        preload="none"
        muted
        poster="/images/sutep3-thumbnail.png"
      />
    ),
  },
];

export const HowToUseSection = () => {
  return (
    <section id="fllows" className="max-w-6xl px-4 pt-16 mx-auto">
      <div className="text-center text-4xl font-black uppercase leading-snug mb-20 md:text-6xl md:flex md:items-baseline md:leading-[80px]">
        <h2 className="leading-tight">How to use</h2>
        <span className="text-2xl ml-2">-カロリーチの使い方-</span>
      </div>

      <ul className="flex flex-col my-8 gap-8 md:gap-20">
        {steps.map((item, index) => (
          <li key={index}>
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="flex flex-col items-center">
                <p className="text-yellow-400 text-lg font-black">STEP</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-white text-lg font-black">
                    {item.step}
                  </span>
                </div>
              </div>

              <PageHeader title={item.title} description={item.description} />
            </div>

            <div className="flex justify-center">{item.video}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
