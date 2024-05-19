import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputUnit } from "./input-unit";
import { Textarea } from "@/components/ui/textarea";

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

              {!!field.value && <InputUnit direction="right">%</InputUnit>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
