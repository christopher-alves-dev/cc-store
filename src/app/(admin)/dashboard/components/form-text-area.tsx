import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TextareaHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props<T extends FieldValues> =
  TextareaHTMLAttributes<HTMLTextAreaElement> &
    UseControllerProps<T> & {
      label?: string;
    };

export const FormTextArea = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...rest
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-base font-bold">{label}</FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Textarea
                className={twMerge(fieldState.error && "border-red-600")}
                {...field}
                {...rest}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
