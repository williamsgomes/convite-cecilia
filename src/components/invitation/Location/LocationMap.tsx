"use client";

import { mapsEmbedUrl } from "@/lib/format-event";

type LocationMapProps = {
  mapsUrl: string;
  title: string;
};

export function LocationMap({ mapsUrl, title }: LocationMapProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-accent/20 bg-surface-sunken shadow-lift">
      <iframe
        title={title}
        src={mapsEmbedUrl(mapsUrl)}
        className="block h-44 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
