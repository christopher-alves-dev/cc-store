import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fullscreen, X } from "lucide-react";
import Image from "next/image";
import { ComponentPropsWithoutRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type PreviewData = {
  data: string;
};

type ActionsProps = {
  onRemove: () => void;
};

type Props = HTMLAttributes<HTMLDivElement> & PreviewData & ActionsProps;

const Preview = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & PreviewData & ActionsProps
>(({ data, onRemove, ...rest }: Props, ref) => {
  return (
    <Dialog>
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          "group relative aspect-square h-28 cursor-pointer overflow-hidden rounded-md border-2 border-gray-800 py-2",
          rest.className,
        )}
      >
        <Image
          src={data}
          alt={data}
          quality={100}
          fill
          className="object-cover"
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
          onClick={onRemove}
        >
          <X size={12} />
        </Button>

        <DialogContent>
          <DialogHeader className="relative flex h-[400px] items-center justify-center">
            <Image
              src={data}
              alt={data}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[90%] w-full"
            />
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
});

Preview.displayName = "Preview";

export { Preview };
