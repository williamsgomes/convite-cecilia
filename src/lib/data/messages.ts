import { messages as mockMessages } from "@/mock/messages";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { mapMessage, type MessageRow } from "@/lib/supabase/mappers";
import { createServerClient } from "@/lib/supabase/server";
import type { Message } from "@/types/message";

export async function getApprovedMessages(): Promise<Message[]> {
  if (!isSupabaseConfigured()) {
    return mockMessages.filter((message) => message.approved);
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("messages")
    .select("id, event_id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load messages from Supabase:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return (data as MessageRow[]).map(mapMessage);
}
