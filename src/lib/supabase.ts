import { createClient } from "@supabase/supabase-js";
import type { VveCalculationRecord } from "@/types/calculator";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveCalculation(
  record: Omit<VveCalculationRecord, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("vve_calculations")
    .insert(record)
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function updateCalculationEmail(id: string, email: string) {
  const { error } = await supabase
    .from("vve_calculations")
    .update({ email })
    .eq("id", id);

  if (error) throw error;
}

export async function saveContactMessage(contact: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase.from("contacts").insert(contact);
  if (error) throw error;
}
