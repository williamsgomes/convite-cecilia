import type { Event } from "@/types/event";

const TIME_ZONE = "America/Sao_Paulo";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatEventDetails(event: Event) {
  const date = new Date(event.eventDate);
  const hour = date.toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: TIME_ZONE,
  });
  const hourNumber = Number(hour);
  const [placeKind, ...placeRest] = event.locationName.split(" ");

  return {
    dateLabel: date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: TIME_ZONE,
    }),
    weekday: capitalize(
      date.toLocaleDateString("pt-BR", {
        weekday: "long",
        timeZone: TIME_ZONE,
      }),
    ),
    timeLabel: `${hourNumber}h`,
    timeHint:
      hourNumber < 12 ? "da manhã" : hourNumber < 18 ? "da tarde" : "da noite",
    placeKind,
    placeName: placeRest.join(" ") || event.locationName,
  };
}

export function mapsEmbedUrl(mapsUrl: string) {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get("q") ?? mapsUrl;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  } catch {
    return mapsUrl;
  }
}

export function formatMessageDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}
