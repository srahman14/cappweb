import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getMediaSlots() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_assets")
    .select(
      `
        id,
        slot_key,
        label,
        description,
        alt_text,
        blob_url,
        sort_order,
        updated_at
      `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error("Unable to load media slots.");
  }

  return data ?? [];
}