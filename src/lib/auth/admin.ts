import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getCappAdminStatus() {
  const supabase = await createClient();
  
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      user: null,
      isAdmin: false,
    };
  }

  // Then check administrator membership in the database.
  const { data: isAdmin, error: adminError } =
    await supabase.rpc("is_capp_admin");

  // Fail closed if the permission check cannot be completed.
  if (adminError) {
    throw new Error("Unable to verify administrator permissions.");
  }

  return {
    user,
    isAdmin: isAdmin === true,
  };
}