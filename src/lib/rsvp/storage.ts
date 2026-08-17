import type { Rsvp } from "@/types/rsvp";

const STORAGE_KEY = "cecilia-rsvp-response";

export const RSVP_CHANGED_EVENT = "cecilia-rsvp-changed";

let cachedRaw: string | null = null;
let cachedRsvp: Rsvp | null = null;
let cacheReady = false;

export function getStoredRsvp(): Rsvp | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (cacheReady && raw === cachedRaw) {
      return cachedRsvp;
    }

    cacheReady = true;
    cachedRaw = raw;
    cachedRsvp = raw ? (JSON.parse(raw) as Rsvp) : null;
    return cachedRsvp;
  } catch {
    cacheReady = true;
    cachedRaw = null;
    cachedRsvp = null;
    return null;
  }
}

export function getServerStoredRsvp(): Rsvp | null {
  return null;
}

export function saveStoredRsvp(rsvp: Rsvp): void {
  const raw = JSON.stringify(rsvp);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cacheReady = true;
  cachedRaw = raw;
  cachedRsvp = rsvp;
  window.dispatchEvent(new Event(RSVP_CHANGED_EVENT));
}

export function subscribeStoredRsvp(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(RSVP_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(RSVP_CHANGED_EVENT, onStoreChange);
  };
}
