"use server";

import { getEventId } from "@/lib/data/events";
import { createServerClient } from "@/lib/supabase/server";
import type { Rsvp, SubmitRsvpInput } from "@/types/rsvp";

function createRsvpId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `rsvp-${Date.now()}`;
}

function isValidCount(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= 20;
}

export async function submitRsvp(input: SubmitRsvpInput): Promise<Rsvp> {
  const trimmedName = input.name.trim();
  const adultsCount = input.status === "confirmed" ? input.adultsCount : 0;
  const childrenCount =
    input.status === "confirmed" ? input.childrenCount : 0;

  if (trimmedName.length < 2) {
    throw new Error(
      input.status === "confirmed"
        ? "Informe seu nome para confirmar presença."
        : "Informe seu nome para avisar que não poderá ir.",
    );
  }

  if (input.status === "confirmed") {
    if (!isValidCount(adultsCount)) {
      throw new Error("Informe entre 0 e 20 adultos.");
    }

    if (!isValidCount(childrenCount)) {
      throw new Error("Informe entre 0 e 20 crianças.");
    }
  }

  const rsvp: Rsvp = {
    id: createRsvpId(),
    eventId: getEventId(),
    name: trimmedName,
    status: input.status,
    adultsCount,
    childrenCount,
    createdAt: new Date().toISOString(),
  };

  const supabase = createServerClient();
  const { error } = await supabase.from("rsvps").insert({
    id: rsvp.id,
    event_id: rsvp.eventId,
    name: rsvp.name,
    status: rsvp.status,
    adults_count: rsvp.adultsCount,
    children_count: rsvp.childrenCount,
    created_at: rsvp.createdAt,
  });

  if (error) {
    throw new Error("Não conseguimos registrar sua resposta agora. Tente novamente, por favor.");
  }

  return rsvp;
}
