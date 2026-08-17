import { DecorImage } from "@/components/decorations/DecorImage";

export function CountdownFooter() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative left-1/2 z-10 mt-15 -mb-8 w-screen max-w-none -translate-x-1/2"
    >
      <div className="relative w-full">
        <DecorImage
          src="/images/farm/barn.webp"
          width={280}
          height={320}
          className="absolute bottom-[38%] left-[3%] z-10 w-[24%] max-w-28 translate-y-8 opacity-95 sm:left-[5%] sm:w-[26%] sm:max-w-32"
        />

        <div className="absolute right-[3%] bottom-[34%] z-10 w-[22%] max-w-24 translate-y-8 sm:right-[5%] sm:w-[24%] sm:max-w-28">
          <div className="animate-float-slow">
            <DecorImage
              src="/images/animals/pig.webp"
              width={200}
              height={220}
              className="w-full opacity-95"
            />
          </div>
        </div>

        <DecorImage
          src="/images/farm/fence-gate.webp"
          width={1214}
          height={265}
          className="relative block h-auto w-full max-w-none"
        />
      </div>
    </div>
  );
}
