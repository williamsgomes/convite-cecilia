import Image from "next/image";

import { DecorImage } from "@/components/decorations/DecorImage";

export function HeroPlaque() {
  return (
    <div className="relative z-20 w-full min-w-0 pb-2">
      <div className="absolute inset-x-2 bottom-0 z-0">
        <DecorImage
          src="/images/flowers/strip.webp"
          width={436}
          height={142}
        />
      </div>

      <div className="relative z-10 mx-auto w-[80%]">
        <Image
          src="/images/decorations/nuvem-1ano.webp"
          alt=""
          width={714}
          height={459}
          priority
          aria-hidden
          className="h-auto w-full"
        />
      </div>

      <div className="absolute bottom-10 left-0 z-30 w-24 sm:bottom-12 sm:w-28">
        <DecorImage
          src="/images/animals/cow-sitting.webp"
          width={350}
          height={376}
        />
      </div>
      <div className="absolute right-0 bottom-10 z-30 w-20 sm:bottom-12 sm:w-24">
        <DecorImage
          src="/images/animals/sheep-sitting.webp"
          width={224}
          height={249}
        />
      </div>
    </div>
  );
}
