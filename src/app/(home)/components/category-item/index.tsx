import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";
import React from "react";

type Props = {
  category: Category;
};

export const CategoryItem = ({ category }: Props) => {
  const categoryIcon = {
    mouses: <MouseIcon />,
    keyboards: <KeyboardIcon />,
    headphones: <HeadphonesIcon />,
    mousepads: <SquareIcon />,
    monitors: <MonitorIcon />,
    speakers: <SpeakerIcon />,
  };
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-2 rounded-lg py-3"
    >
      {categoryIcon[category.slug as keyof typeof categoryIcon]}

      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  );
};
