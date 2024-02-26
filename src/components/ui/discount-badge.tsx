import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { twMerge } from "tailwind-merge";

export const DiscountBadge = ({ children, className, ...rest }: BadgeProps) => {
  return (
    <Badge className={twMerge("px-2 py-0.5", className)} {...rest}>
      <ArrowDownIcon size={14} /> {children}%
    </Badge>
  );
};
