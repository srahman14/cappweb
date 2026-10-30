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

export async function getMediaBySlots(slotKeys: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_assets")
    .select("slot_key, blob_url, alt_text")
    .in("slot_key", slotKeys);

  if (error) {
    console.error("Failed to load media assets:", error.message);
    throw new Error("Unable to load media assets.");
  }

  return data ?? [];
}