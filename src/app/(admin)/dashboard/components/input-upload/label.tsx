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
        className={twMerge("text-base font-bold", rest.className)}
      />
    );
  },
);

Label.displayName = "Label";

export { Label };
