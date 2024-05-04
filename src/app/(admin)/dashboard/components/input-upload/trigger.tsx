import { Input as InputDefault } from "@/components/ui/input";
import {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Trigger = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ ...rest }: Props, ref) => {
    return (
      <InputDefault
        {...rest}
        ref={ref}
        type="file"
        className={twMerge("absolute inset-0", rest.className)}
      />
    );
  },
);

Trigger.displayName = "Trigger";

export { Trigger };
