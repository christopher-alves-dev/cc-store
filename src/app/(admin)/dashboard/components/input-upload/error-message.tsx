import { Label as LabelDefault } from "@/components/ui/label";
import {
  ComponentPropsWithoutRef,
  LabelHTMLAttributes,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

const ErrorMessage = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<"label">
>(({ ...rest }: Props, ref) => {
  return (
    <LabelDefault
      {...rest}
      ref={ref}
      className={twMerge("text-sm font-medium text-red-600", rest.className)}
    />
  );
});

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
