"use client";

import { useState, useRef, useEffect } from "react";
import { saveContactMessage } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");
    try {
      await saveContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const toggle = () => {
    if (status === "success") setStatus("idle");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="rounded-2xl border-2 border-gray-100 bg-white transition-all duration-300">
      {/* Toggle button */}
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 sm:px-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2E5E4E]/10 sm:h-10 sm:w-10">
            <svg className="h-4 w-4 text-[#2E5E4E] sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Contact opnemen</p>
            <p className="text-xs text-[#64748b]">Stel een vraag of laat een bericht achter</p>
          </div>
        </div>
        <svg
          className={`h-5 w-5 shrink-0 text-[#64748b] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentHeight + 32}px` : "0px" }}
      >
        <div ref={contentRef} className="border-t border-gray-100 px-5 py-5 sm:px-6 sm:py-6">
          {status === "success" ? (
            <div className="flex items-start gap-3 rounded-xl bg-[#2E5E4E]/10 p-4">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#2E5E4E]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#2E5E4E]">Bericht verzonden!</p>
                <p className="mt-0.5 text-xs text-[#2E5E4E]/80 sm:text-sm">
                  Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-[#1a1a2e] sm:text-sm">
                    Naam
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                    placeholder="Uw naam"
                    className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white px-3.5 text-sm text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10 disabled:opacity-60 sm:h-12 sm:px-4 sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-[#1a1a2e] sm:text-sm">
                    E-mailadres
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    placeholder="uw@email.nl"
                    className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white px-3.5 text-sm text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10 disabled:opacity-60 sm:h-12 sm:px-4 sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-[#1a1a2e] sm:text-sm">
                  Bericht
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "loading"}
                  placeholder="Waar kunnen we u mee helpen?"
                  className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white px-3.5 py-3 text-sm text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10 disabled:opacity-60 sm:px-4 sm:text-base"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2E5E4E] px-6 text-sm font-semibold text-white shadow-md shadow-[#2E5E4E]/15 transition-all duration-200 hover:bg-[#234a3d] hover:shadow-lg disabled:opacity-60 sm:h-12 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Verzenden…
                    </>
                  ) : (
                    <>
                      Verstuur bericht
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="flex items-center gap-1 text-xs text-red-500 sm:text-sm">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    Verzenden mislukt. Probeer het later opnieuw.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
