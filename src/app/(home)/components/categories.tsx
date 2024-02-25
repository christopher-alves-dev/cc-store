import { prismaClient } from "@/lib/prisma";
import { CategoryItem } from "./category-item";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const Categories = async ({ className }: Props) => {
  const categories = await prismaClient.category.findMany();
  return (
    <div className={twMerge("grid grid-cols-2 gap-x-4 gap-y-2", className)}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
