import Image from "next/image";

import { cn } from "@/lib/utils";

type DecorImageProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function DecorImage({
  src,
  width,
  height,
  className,
  priority = false,
}: DecorImageProps) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      priority={priority}
      aria-hidden
      className={cn("pointer-events-none h-auto w-full select-none", className)}
    />
  );
}
