import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const checkAuth = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");

    redirect("/auth/login");
  }
};

export const getUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");
    redirect("/auth/login");
  }

  return data.user.id;
};
