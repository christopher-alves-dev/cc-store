import { ComponentPropsWithoutRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

const Content = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ ...rest }: Props, ref) => {
    return <div {...rest} ref={ref} className={twMerge(rest.className)} />;
  },
);

Content.displayName = "Content";

export { Content };
