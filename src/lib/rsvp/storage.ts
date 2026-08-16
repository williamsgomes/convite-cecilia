import type { Rsvp } from "@/types/rsvp";

const STORAGE_KEY = "cecilia-rsvp-response";

export const RSVP_CHANGED_EVENT = "cecilia-rsvp-changed";

export function getStoredRsvp(): Rsvp | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as Rsvp;
  } catch {
    return null;
  }
}

export function saveStoredRsvp(rsvp: Rsvp): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvp));
  window.dispatchEvent(new Event(RSVP_CHANGED_EVENT));
}
