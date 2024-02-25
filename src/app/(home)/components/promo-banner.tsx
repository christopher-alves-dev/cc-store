import Image, { ImageProps } from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

export const PromoBanner = ({ alt, className, ...rest }: ImageProps) => {
  return (
    <Image
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={twMerge("h-auto w-full px-5", className)}
      {...rest}
    />
  );
};
