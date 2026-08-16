"use server";

import { getEventId } from "@/lib/data/events";
import { MAX_MESSAGE_LENGTH } from "@/lib/messages/limits";
import { createServerClient } from "@/lib/supabase/server";
import type { Message, SubmitMessageInput } from "@/types/message";

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}`;
}

export async function submitMessage(
  input: SubmitMessageInput,
): Promise<Message> {
  const name = input.name.trim();
  const message = input.message.trim();

  if (name.length < 2) {
    throw new Error("Informe seu nome para enviar o recadinho.");
  }

  if (message.length < 4) {
    throw new Error("Escreva uma mensagem um pouquinho maior.");
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`A mensagem pode ter no máximo ${MAX_MESSAGE_LENGTH} caracteres.`);
  }

  const created: Message = {
    id: createMessageId(),
    eventId: getEventId(),
    name,
    message,
    approved: true,
    createdAt: new Date().toISOString(),
  };

  const supabase = createServerClient();
  const { error } = await supabase.from("messages").insert({
    id: created.id,
    event_id: created.eventId,
    name: created.name,
    message: created.message,
    created_at: created.createdAt,
  });

  if (error) {
    throw new Error("Não conseguimos enviar agora. Tente novamente, por favor.");
  }

  return created;
}
