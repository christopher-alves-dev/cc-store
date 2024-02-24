import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-8 px-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>
    </div>
  );
}
