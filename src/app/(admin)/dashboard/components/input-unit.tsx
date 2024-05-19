import { Label as LabelDefault } from "@/components/ui/label";
import {
  ComponentPropsWithoutRef,
  LabelHTMLAttributes,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Direction = {
  direction?: "left" | "right";
};

type Props = LabelHTMLAttributes<HTMLLabelElement> & Direction;

const InputUnit = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<"label"> & Direction
>(({ direction = "left", ...rest }: Props, ref) => {
  return (
    <LabelDefault
      {...rest}
      ref={ref}
      className={twMerge(
        "absolute right-3 top-1/2 -translate-y-1/2 text-sm",
        direction === "left" ? "left-3" : "right-3",
        rest.className,
      )}
    />
  );
});

InputUnit.displayName = "InputUnit";

export { InputUnit };
