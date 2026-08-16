import { event } from "@/mock/event";
import type { Event } from "@/types/event";

export function getEvent(): Event {
  return event;
}

export function getEventId(): string {
  return event.id;
}
