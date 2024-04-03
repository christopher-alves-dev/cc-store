import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  category: Category;
};

export const CategoryItem = ({ category }: Props) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex flex-col overflow-hidden rounded-lg"
    >
      <div className="flex h-[150px] w-full items-center justify-center bg-gradient-to-tr from-[#5033C3] to-[#5033C333] lg:h-[185px]">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-full max-w-[90%] object-contain"
        />
      </div>

      <div className="bg-accent py-3">
        <p className="text-center text-sm font-semibold">{category.name}</p>
      </div>
    </Link>
  );
};
