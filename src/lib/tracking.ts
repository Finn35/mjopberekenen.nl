import { supabase } from "./supabase";

const SESSION_KEY = "mjop_session_id";

function generateUUID(): string {
  return crypto.randomUUID();
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export async function trackEvent(
  eventType: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    if (process.env.NODE_ENV === "development") {
      console.log(`[tracking] ${eventType}`, metadata ?? {});
    }

    await supabase.from("mjop_events").insert({
      session_id: sessionId,
      event_type: eventType,
      metadata: metadata ?? {},
    });
  } catch (err) {
    console.error("[tracking] failed:", err);
  }
}
