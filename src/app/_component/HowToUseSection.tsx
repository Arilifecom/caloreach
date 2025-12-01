const contents = [
  {
    title: "食事を記録（検索 or 手入力）",
    description: "食品検索で自動カロリー計算。毎日の食事を素早く記録します。",
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
      "定期的に摂取するフードを事前に登録。食事記録をワンタップで楽にします。",
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
    title: "履歴をチェック",
    description:
      "過去の記録を一覧表示し、過去の記入漏れや食事内容を振り返ります。",
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
    <section id="fllows" className="max-w-6xl mx-auto px-4 pt-16">
      <div className="text-center text-4xl font-black uppercase leading-snug mb-8 md:text-left md:text-6xl md:flex md:items-baseline md:leading-[80px]">
        <h2 className="leading-tight">How to use</h2>
        <span className="text-2xl ml-2">-カロリーチの使い方-</span>
      </div>

      <ul className="flex flex-col gap-12 px-4 pt-10">
        {contents.map((item, index) => (
          <li key={index}>
            <div className="grid grid-cols-[40px_1fr] gap-x-4 my-6 items-top max-w-md">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-white">{item.step}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  {item.title}
                </p>
                <p className="text-base text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center">{item.video}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
