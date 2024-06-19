import { Label as LabelDefault } from "@/components/ui/label";
import {
  ComponentPropsWithoutRef,
  LabelHTMLAttributes,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<"label">>(
  ({ ...rest }: Props, ref) => {
    return (
      <LabelDefault
        {...rest}
        ref={ref}
        className={twMerge(
          "absolute inset-0 flex cursor-pointer items-center justify-center gap-2.5 text-base font-bold",
          rest.className,
        )}
      />
    );
  },
);

Label.displayName = "Label";

export { Label };
