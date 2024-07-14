import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const useAuthUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
};
