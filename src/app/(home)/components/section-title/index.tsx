import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const SectionTitle = ({
  children,
  className,
  ...rest
}: ComponentProps<"p">) => {
  return (
    <p className={twMerge("pl-5 font-bold uppercase", className)} {...rest}>
      {children}
    </p>
  );
};
