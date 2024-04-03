import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const SectionTitle = ({
  children,
  className,
  ...rest
}: ComponentProps<"p">) => {
  return (
    <p className={twMerge("font-bold uppercase md:pl-10", className)} {...rest}>
      {children}
    </p>
  );
};
