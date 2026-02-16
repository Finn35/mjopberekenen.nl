"use client";

import { useState } from "react";
import type { CalculationInput, CalculationResult } from "@/types/calculator";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

interface Props {
  input: CalculationInput;
  result: CalculationResult;
  calculationId: string | null;
  onRequestPdf: (email: string) => Promise<void>;
}

const resultCards = [
  {
    label: "10-jaar onderhoudsbehoefte",
    key: "total_estimate" as const,
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Jaarlijkse reserve",
    key: "yearly_reserve" as const,
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Per appartement / maand",
    key: "monthly_per_unit" as const,
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    highlight: true,
  },
];

export function ResultScreen({
  input,
  result,
  calculationId,
  onRequestPdf,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await onRequestPdf(email.trim());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E5E4E]/10 sm:mb-4 sm:h-14 sm:w-14">
          <svg className="h-6 w-6 text-[#2E5E4E] sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#1a1a2e] sm:text-2xl md:text-3xl">
          Uw onderhoudsreserve berekening
        </h2>
        <p className="mt-1.5 text-sm text-[#64748b] sm:mt-2 sm:text-base">
          Op basis van uw invoer voor {input.apartments} appartementen ({input.oppervlakte} m²)
        </p>
      </div>

      {/* Result cards — stack on mobile, 3 cols on larger */}
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {resultCards.map((card, i) => (
          <div
            key={card.key}
            className={`animate-count-up rounded-2xl border-2 p-4 transition-all sm:p-5 ${
              card.highlight
                ? "border-[#2E5E4E] bg-[#2E5E4E] text-white shadow-lg shadow-[#2E5E4E]/20"
                : "border-gray-100 bg-white shadow-sm"
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
              <div className={`shrink-0 sm:mb-3 ${card.highlight ? "text-white/70" : "text-[#2E5E4E]"}`}>
                {card.icon}
              </div>
              <div className="min-w-0 flex-1 sm:flex-none">
                <p className={`text-xs font-medium uppercase tracking-wider ${card.highlight ? "text-white/70" : "text-[#64748b]"}`}>
                  {card.label}
                </p>
                <p className={`mt-0.5 text-xl font-bold sm:mt-1 sm:text-2xl ${card.highlight ? "text-white" : "text-[#1a1a2e]"}`}>
                  {formatCurrency(result[card.key])}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input summary */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 sm:p-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#64748b] sm:mb-4 sm:text-sm">
          Uw invoer samengevat
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-3 sm:gap-x-6 sm:gap-y-3">
          <div>
            <span className="text-[#64748b]">Appartementen</span>
            <p className="font-semibold text-[#1a1a2e]">{input.apartments}</p>
          </div>
          <div>
            <span className="text-[#64748b]">Bouwjaar</span>
            <p className="font-semibold text-[#1a1a2e]">{input.bouwjaar}</p>
          </div>
          <div>
            <span className="text-[#64748b]">Oppervlakte</span>
            <p className="font-semibold text-[#1a1a2e]">{input.oppervlakte} m²</p>
          </div>
          <div>
            <span className="text-[#64748b]">Lift</span>
            <p className="font-semibold text-[#1a1a2e]">{input.lift ? "Ja" : "Nee"}</p>
          </div>
          <div>
            <span className="text-[#64748b]">Dak</span>
            <p className="font-semibold capitalize text-[#1a1a2e]">{input.dak_type} — {input.dak_conditie}</p>
          </div>
          <div>
            <span className="text-[#64748b]">Gevel</span>
            <p className="font-semibold capitalize text-[#1a1a2e]">{input.gevel_conditie}</p>
          </div>
        </div>
      </div>

      {/* Email / PDF CTA */}
      <div className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-[#f0fdf4] to-white p-4 sm:p-6 md:p-8">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="hidden shrink-0 rounded-xl bg-[#2E5E4E]/10 p-3 sm:block">
            <svg className="h-6 w-6 text-[#2E5E4E]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#1a1a2e] sm:text-lg">
              Ontvang uw MJOP-overzicht als PDF
            </h3>
            <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
              Inclusief samenvatting van uw invoer, 10-jaarsinschatting en maandelijkse aanbeveling.
            </p>

            {status === "success" ? (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#2E5E4E]/10 p-3 sm:mt-5 sm:gap-3 sm:p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#2E5E4E]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#2E5E4E]">Bedankt!</p>
                  <p className="mt-0.5 text-xs text-[#2E5E4E]/80 sm:text-sm">
                    U ontvangt binnen enkele minuten een e-mail met uw rapport.
                    Controleer ook uw spam-map.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="uw@email.nl"
                  required
                  disabled={status === "loading"}
                  className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-base text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10 disabled:opacity-60 sm:flex-1"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-[#2E5E4E] px-5 text-sm font-semibold text-white shadow-md shadow-[#2E5E4E]/15 transition-all duration-200 hover:bg-[#234a3d] hover:shadow-lg disabled:opacity-60 sm:px-6"
                >
                  {status === "loading" ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Versturen…
                    </>
                  ) : (
                    <>
                      Verstuur rapport
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2.5 flex items-center gap-1 text-sm text-red-500 sm:mt-3">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                Er ging iets mis. Probeer het later opnieuw.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
