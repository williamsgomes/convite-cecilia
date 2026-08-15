import { messages } from "@/mock/messages";
import type { Message } from "@/types/message";

export function getApprovedMessages(): Message[] {
  return messages.filter((message) => message.approved);
}
