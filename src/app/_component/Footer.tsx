import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className={
        "flex flex-col justify-center w-full border-t-2 border-slate-400 border-solid px-8 md:px-12 lg:px-32 text-gray-700"
      }
    >
      <div className="pt-8 pb-20 md:py-8 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <span>&copy;{new Date().getFullYear()}カロリーチ</span>
          <Link href="/terms/" className="ml-4">
            -terms-
          </Link>
        </div>
        <div className="flex items-center lg:py-2">
          build by <span className="text-cyan-500 text-2xl px-1">&#9825;</span>
          by&nbsp;
          <Link
            href="/about"
            className="underline
            underline-offset-2
            font-bold
            "
          >
            Ari
          </Link>
        </div>
      </div>
    </footer>
  );
};
