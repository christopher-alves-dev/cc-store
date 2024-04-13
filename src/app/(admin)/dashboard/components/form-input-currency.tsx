import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, InputHTMLAttributes } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { maskCurrency } from "../helpers/masks";

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & {
    label?: string;
  };

export const FormInputCurrency = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...rest
}: Props<T>) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<T>,
  ) => {
    event.target.value = maskCurrency(event.currentTarget.value);
    field.onChange(maskCurrency(event.target.value));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={twMerge(className)}>
          {label && (
            <FormLabel className="text-base font-bold">{label}</FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                className={twMerge(
                  "border-gray-800",
                  field.value && "pl-8",
                  fieldState.error && "border-red-600",
                )}
                {...field}
                onChange={(event) => {
                  handleChange(event, field);
                }}
                {...rest}
              />
              {!!field.value && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                  R$
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
