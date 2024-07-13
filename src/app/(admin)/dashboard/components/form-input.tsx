import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputUnit } from "./input-unit";

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & {
    label?: string;
    unit?: string;
  };

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  unit,
  ...rest
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={name} className="text-base font-bold">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                className={twMerge(
                  "border-gray-800",
                  fieldState.error && "border-red-600",
                )}
                {...field}
                {...rest}
              />

              {!!field.value && !!unit && (
                <InputUnit direction="right">{unit}</InputUnit>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
