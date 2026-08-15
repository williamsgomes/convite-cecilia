import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

type CountdownHeaderProps = {
  event: Event;
  className?: string;
};

export function CountdownHeader({ event, className }: CountdownHeaderProps) {
  const alt = `${event.countdownIntro} ${event.countdownTitle}`;

  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-1/2 px-2 text-center",
        className,
      )}
    >
      <h2 id="contagem-titulo" className="sr-only">
        {alt}
      </h2>

      <Image
        src="/images/countdown/topo-contador.webp"
        alt={alt}
        width={560}
        height={209}
        sizes="(max-width: 448px) 78vw, 360px"
        className="mx-auto block h-auto w-[78%] max-w-xs sm:max-w-sm"
      />
    </header>
  );
}
