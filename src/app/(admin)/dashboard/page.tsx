import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { useAuthUser } from "./hooks/useAuthUser";

export default async function DashboardPage() {
  const supabase = createClient();

  await useAuthUser();

  return (
    <div className="mt-10 flex flex-col gap-8 px-5">
      <p>Dashboard</p>
    </div>
  );
}
