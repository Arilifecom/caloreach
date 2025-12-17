import { RegularFoodListitemSkeltone } from "@/app/dashboard/regular-foods/_components/RegularFoodListitemSkeltone";

export const RegularFoodListsSkeltone = () => {
  return (
    <>
      <ul className="w-full">
        <RegularFoodListitemSkeltone />
        <RegularFoodListitemSkeltone />
        <RegularFoodListitemSkeltone />
      </ul>
    </>
  );
};
