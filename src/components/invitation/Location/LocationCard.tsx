import { Car, MapPin, MapPinned } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

type LocationCardProps = {
  event: Event;
};

export function LocationCard({ event }: LocationCardProps) {
  return (
    <Card className="mt-5 rounded-lg border border-accent/20 px-4 py-5 shadow-lift">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
          <MapPin aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-extrabold text-accent-strong">{event.locationName}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {event.locationAddress}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
          <Car aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-extrabold text-accent-strong">{event.locationHowToLabel}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {event.locationHowToText}
          </p>
        </div>
      </div>

      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-pill px-5",
          "min-h-11 bg-accent-strong text-base font-semibold text-accent-foreground",
          "transition-colors hover:bg-accent-strong/90",
        )}
      >
        <MapPinned aria-hidden className="size-4" strokeWidth={2} />
        {event.locationMapsLabel}
      </a>
    </Card>
  );
}
