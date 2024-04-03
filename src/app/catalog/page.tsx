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

      <div className="flex flex-wrap gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
