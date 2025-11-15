import {
  NavHistoryIcon,
  NavHomeIcon,
  NavKcalIcon,
  NavRegularFoodIcon,
} from "@/components/icons";
import Link from "next/link";

export const DashboardNav = () => {
  return (
    <div className="flex justify-center">
      <nav className="fixed bottom-4 w-[90vw] max-w-[400px]">
        <ul className="flex justify-around py-2 px-4 bg-white rounded-full w-full">
          <li>
            <Link href="/dashboard">
              <div className="flex flex-col items-center gap-1">
                <NavHomeIcon className="w-8" />
                <p className="text-xs">今日</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/histories">
              <div className="flex flex-col items-center gap-1">
                <NavHistoryIcon className="w-8" />
                <p className="text-xs">履歴</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/regular-foods">
              <div className="flex flex-col items-center">
                <NavRegularFoodIcon className="w-9" />
                <p className="text-xs">登録</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/target-kcal-plans">
              <div className="flex flex-col items-center">
                <NavKcalIcon className="w-9" />
                <p className="text-xs">目標</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
