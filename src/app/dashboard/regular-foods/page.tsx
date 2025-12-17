import { RegularFoodSection } from "@/app/dashboard/regular-foods/_components";
import { getUserId } from "@/utils/db/auth";

export default async function RegularFoodsPage() {
  const userId = await getUserId();
  return (
    <>
      <RegularFoodSection userId={userId} />
    </>
  );
}
