import { ComponentPropsWithoutRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

const Root = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ ...rest }: Props, ref) => {
    return <div {...rest} ref={ref} className={twMerge(rest.className)} />;
  },
);

Root.displayName = "Root";

export { Root };
