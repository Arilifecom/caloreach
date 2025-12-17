const steps = [
  {
    title: "食事を記録（検索 or 手入力）",
    description:
      "食品検索で量を入力するだけでカロリーを自動計算。\nその日の食事をすぐに記録できます。",
    step: 1,
    video: (
      <video
        src="/videos/step-1.mp4"
        controls
        playsInline
        preload="metadata"
        muted={true}
        poster="/images/sutep1-thumbnail.png"
        className="w-full h-full object-contain -webkit-playsinline"
      />
    ),
  },
  {
    title: "レギュラーフードを登録",
    description:
      "よく食べるメニューを事前に保存。\n次回からはワンタップで素早く記録できます。",
    step: 2,
    video: (
      <video
        src="/videos/step-2.mp4"
        controls
        playsInline
        preload="metadata"
        muted={true}
        poster="/images/sutep2-thumbnail.png"
        className="w-full h-full object-contain -webkit-playsinline"
      />
    ),
  },
  {
    title: "履歴で振り返る",
    description:
      "日ごとの合計カロリーを一覧で確認\n記録漏れがあっても、詳細ページで食事を追加・編集できます。",
    step: 3,
    video: (
      <video
        src="/videos/step-3.mp4"
        controls
        playsInline
        preload="metadata"
        muted={true}
        poster="/images/sutep3-thumbnail.png"
        className="w-full h-full object-contain -webkit-playsinline"
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

      <ul className="flex flex-col my-8 gap-10 md:gap-56">
        {steps.map((content, index) => (
          <li
            key={index}
            className="flex flex-col items-center md:flex-row-reverse"
          >
            <div className="flex flex-col items-center text-center gap-4 mb-6 md:w-1/2">
              <div className="flex flex-col items-center">
                <p className="text-yellow-400 text-lg font-black">STEP</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-white text-lg font-black">
                    {content.step}
                  </span>
                </div>
              </div>

              <div className="max-w-4xl">
                <h3 className="text-xl font-bold mb-4">{content.title}</h3>
                <p
                  style={{ whiteSpace: "pre-line" }}
                  className="text-left max-w-72 text-gray-700 font-medium md:text-center md:max-w-full"
                >
                  {content.description}
                </p>
              </div>
            </div>

            <div className="flex justify-center w-[250px] aspect-[9/16] mx-auto md:w-[300px]">
              {content.video}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
