import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import React from "react";
import { CategoryItem } from "./components/category-item";

export default async function page() {
  const categories = await prismaClient.category.findMany();

  return (
    <div className="mt-10 flex flex-col gap-8 px-5">
      <Badge variant="heading">
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 justify-between gap-8 md:grid-cols-3 lg:gap-10 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
