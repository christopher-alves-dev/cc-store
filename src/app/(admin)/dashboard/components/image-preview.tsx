import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fullscreen, X } from "lucide-react";
import Image from "next/image";

type Props = {
  data: {
    src: string;
    alt?: string;
  };
  onRemoveImage: () => void;
};

export const ImagePreview = ({ data, onRemoveImage }: Props) => {
  return (
    <Dialog>
      <div className="group relative flex h-[100px] cursor-pointer items-center justify-center rounded-lg lg:h-[77px] lg:w-[77px] lg:bg-black">
        <Image
          src={data.src}
          alt={data?.alt || ""}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
        />
        <DialogTrigger asChild>
          <div className="absolute inset-0 hidden items-center justify-center gap-2 opacity-80 group-hover:flex">
            <Button size={"sm"} type="button" variant="outline">
              <Fullscreen size={12} />
            </Button>
          </div>
        </DialogTrigger>
        <Button
          type="button"
          variant="destructive"
          className="absolute right-0 top-0 hidden h-fit p-1.5 group-hover:block"
          onClick={onRemoveImage}
        >
          <X size={12} />
        </Button>
      </div>

      <DialogContent>
        <DialogHeader className="relative flex h-[400px] items-center justify-center">
          <Image
            src={data.src}
            alt={data?.alt || ""}
            width={0}
            height={0}
            sizes="100vw"
            quality={100}
            className="h-auto max-h-[90%] w-full"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
