import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputUnit } from "./input-unit";

type Props<T extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  UseControllerProps<T> & {
    label?: string;
    unit?: string;
  };

export const FormInputPassword = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  unit,
  ...rest
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

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
              <div className="relative">
                <Input
                  className={twMerge(
                    "border-gray-800",
                    fieldState.error && "border-red-600",
                  )}
                  {...field}
                  {...rest}
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-muted-foreground" />
                  ) : (
                    <Eye size={16} className="text-muted-foreground" />
                  )}
                </Button>
              </div>

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
