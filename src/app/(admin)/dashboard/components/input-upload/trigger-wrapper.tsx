import { ComponentPropsWithoutRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

const TriggerWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ ...rest }: Props, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        "relative aspect-square h-28 w-fit cursor-pointer rounded-md border-2 border-gray-800 py-2",
        rest.className,
      )}
    />
  );
});

TriggerWrapper.displayName = "TriggerWrapper";

export { TriggerWrapper };
