import Image from "next/image";

type OpeningArtworkProps = {
  className?: string;
};

export function OpeningArtwork({ className }: OpeningArtworkProps) {
  return (
    <Image
      src="/images/opening/plaque.webp"
      alt=""
      width={720}
      height={918}
      priority
      aria-hidden
      className={className}
    />
  );
}
