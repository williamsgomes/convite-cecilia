import { EVENT_ID } from "@/mock/event";
import type { Rsvp, RsvpStatus } from "@/types/rsvp";

import { saveStoredRsvp } from "./storage";

export type SubmitRsvpInput = {
  name: string;
  guests: number;
  status: RsvpStatus;
};

function createRsvpId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `rsvp-${Date.now()}`;
}

export async function submitRsvp(input: SubmitRsvpInput): Promise<Rsvp> {
  const trimmedName = input.name.trim();

  if (input.status === "confirmed") {
    if (trimmedName.length < 2) {
      throw new Error("Informe seu nome para confirmar presença.");
    }

    if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 20) {
      throw new Error("Escolha entre 1 e 20 convidados.");
    }
  }

  if (input.status === "declined" && trimmedName.length < 2) {
    throw new Error("Informe seu nome para avisar que não poderá ir.");
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });

  const rsvp: Rsvp = {
    id: createRsvpId(),
    eventId: EVENT_ID,
    name: trimmedName,
    phone: "",
    status: input.status,
    guests: input.status === "confirmed" ? input.guests : 0,
    createdAt: new Date().toISOString(),
  };

  saveStoredRsvp(rsvp);
  return rsvp;
}
