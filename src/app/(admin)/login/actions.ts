"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginSchemaType } from "./schema";

export async function login(form: LoginSchemaType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(form);

  return { error };
}

