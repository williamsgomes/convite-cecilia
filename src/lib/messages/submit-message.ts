import { EVENT_ID } from "@/mock/event";
import type { Message } from "@/types/message";

const MAX_MESSAGE_LENGTH = 200;

export type SubmitMessageInput = {
  name: string;
  message: string;
};

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

  await new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });

  return {
    id: createMessageId(),
    eventId: EVENT_ID,
    name,
    message,
    approved: true,
    createdAt: new Date().toISOString(),
  };
}

export { MAX_MESSAGE_LENGTH };
