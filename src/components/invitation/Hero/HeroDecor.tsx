import Image from "next/image";

import { DecorImage } from "@/components/decorations/DecorImage";

export function HeroDecor() {
  return (
    <div className="relative w-full">
      <Image
        src="/images/farm/sign-convidado.webp"
        alt="Você é nosso convidado especial!"
        width={274}
        height={369}
        className="h-auto w-full select-none"
      />
      <div className="absolute top-8 -left-4 w-6 sm:-left-5 sm:w-7">
        <DecorImage
          src="/images/decorations/butterfly.webp"
          width={117}
          height={123}
          className="animate-float"
        />
      </div>
    </div>
  );
}
