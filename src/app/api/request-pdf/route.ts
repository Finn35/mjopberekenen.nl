import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * MVP: Update calculation with email and simulate PDF send.
 * In production: generate PDF and send via Resend/SendGrid/Supabase Edge Function.
 */
export async function POST(req: Request) {
  try {
    const { calculationId, email } = (await req.json()) as {
      calculationId: string;
      email: string;
    };

    if (!calculationId || !email) {
      return NextResponse.json(
        { error: "calculationId and email required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("vve_calculations")
      .update({ email })
      .eq("id", calculationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // MVP: Simulate PDF generation and email send.
    // To add real PDF: use @react-pdf/renderer or jsPDF.
    // To add real email: use Resend, SendGrid, or Supabase Edge Function.
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
