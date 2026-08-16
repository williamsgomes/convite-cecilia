import { getAdminListingPassword } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapRsvp, type RsvpRow } from "@/lib/supabase/mappers";
import type { Rsvp } from "@/types/rsvp";

export async function getRsvps(): Promise<Rsvp[]> {
  const supabase = createAdminClient();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    const { data, error } = await supabase
      .from("rsvps")
      .select("id, event_id, name, status, adults_count, children_count, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new Error("Não foi possível carregar as confirmações.");
    }

    return (data as RsvpRow[]).map(mapRsvp);
  }

  const { data, error } = await supabase.rpc("admin_list_rsvps", {
    p_password: getAdminListingPassword(),
  });

  if (error || !data) {
    throw new Error("Não foi possível carregar as confirmações.");
  }

  return (data as RsvpRow[]).map(mapRsvp);
}
