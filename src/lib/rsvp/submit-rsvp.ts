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

export async function submitRsvp(input: SubmitRsvpInput): Promise<Rsvp> {
  const trimmedName = input.name.trim();
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
    if (
      !Number.isFinite(childrenCount) ||
      childrenCount < 0 ||
      childrenCount > 20
    ) {
      throw new Error("Informe entre 0 e 20 crianças.");
    }
  }

  const rsvp: Rsvp = {
    id: createRsvpId(),
    eventId: getEventId(),
    name: trimmedName,
    status: input.status,
    childrenCount,
    createdAt: new Date().toISOString(),
  };

  const supabase = createServerClient();
  const { error } = await supabase.from("rsvps").insert({
    id: rsvp.id,
    event_id: rsvp.eventId,
    name: rsvp.name,
    status: rsvp.status,
    children_count: rsvp.childrenCount,
    created_at: rsvp.createdAt,
  });

  if (error) {
    throw new Error("Não conseguimos registrar sua resposta agora. Tente novamente, por favor.");
  }

  return rsvp;
}
