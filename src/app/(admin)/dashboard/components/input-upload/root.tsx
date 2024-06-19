import { ComponentPropsWithoutRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

const Root = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ ...rest }: Props, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          "relative h-10 w-full overflow-hidden rounded-md border-2 border-gray-800 bg-background data-[error=true]:border-red-600",
          rest.className,
        )}
      />
    );
  },
);

Root.displayName = "Root";

export { Root };
