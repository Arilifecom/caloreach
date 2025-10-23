import { LogoutButton } from "@/components";
import {
  NavHistoryIcon,
  NavHomeIcon,
  NavRegularFoodIcon,
} from "@/components/icons";
import Link from "next/link";

export const DashboardNav = () => {
  return (
    <>
      <header className="flex justify-center">
        <nav className="fixed bottom-4 w-[90vw] max-w-[400px]">
          <ul className="flex justify-around py-2 px-4 bg-white rounded-full w-full">
            <li>
              <Link href="/dashboard">
                <div className="flex flex-col items-center gap-1">
                  <NavHomeIcon className="w-6" />
                  <p className="text-xs">ホーム</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/Histories">
                <div className="flex flex-col items-center gap-1">
                  <NavHistoryIcon className="w-6" />
                  <p className="text-xs">履歴</p>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/regular-foods">
                <div className="flex flex-col items-center gap-1">
                  <NavRegularFoodIcon className="w-6" />
                  <p className="text-xs">登録</p>
                </div>
              </Link>
            </li>

            <li>
              <div className="flex flex-col items-center gap-1">
                <LogoutButton />
                <p className="text-xs">ログアウト</p>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
