"use client";

import type { Conditie, Onderhoudsstatus } from "@/types/calculator";

interface Props {
  data: Onderhoudsstatus;
  onChange: (data: Partial<Onderhoudsstatus>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Partial<Record<keyof Onderhoudsstatus, string>>;
}

const currentYear = new Date().getFullYear();

const conditieOptions: { value: Conditie; label: string; description: string }[] = [
  { value: "goed", label: "Goed", description: "Recent onderhouden" },
  { value: "gemiddeld", label: "Gemiddeld", description: "Normaal onderhoud" },
  { value: "slecht", label: "Slecht", description: "Achterstallig" },
];

function ConditieSelector({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: Conditie | "";
  onChange: (value: Conditie) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-[#1a1a2e]">{label}</legend>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {conditieOptions.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center rounded-xl border-2 px-2 py-3 text-center transition-all duration-200 sm:px-3 sm:py-4 ${
                isSelected
                  ? "border-[#2E5E4E] bg-[#2E5E4E]/5 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className={`text-xs font-semibold sm:text-sm ${isSelected ? "text-[#2E5E4E]" : "text-[#1a1a2e]"}`}>
                {opt.label}
              </span>
              <span className={`mt-0.5 hidden text-xs sm:block ${isSelected ? "text-[#2E5E4E]/70" : "text-[#64748b]"}`}>
                {opt.description}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Step2Onderhoudsstatus({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-[#1a1a2e] sm:text-2xl">Onderhoudsstatus</h2>
        <p className="mt-1.5 text-sm text-[#64748b] sm:mt-2 sm:text-base">Hoe is de huidige staat van het gebouw?</p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        <ConditieSelector
          label="Dak conditie"
          value={data.dak_conditie || ""}
          onChange={(v) => onChange({ dak_conditie: v })}
          error={errors.dak_conditie}
        />

        <ConditieSelector
          label="Gevel conditie"
          value={data.gevel_conditie || ""}
          onChange={(v) => onChange({ gevel_conditie: v })}
          error={errors.gevel_conditie}
        />

        <div>
          <label htmlFor="schilderjaar" className="mb-2 block text-sm font-medium text-[#1a1a2e]">
            Schilderwerk laatst uitgevoerd
          </label>
          <input
            id="schilderjaar"
            type="number"
            min={1980}
            max={currentYear}
            value={data.schilderjaar ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              onChange({ schilderjaar: v ? parseInt(v, 10) : null });
            }}
            className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-base text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10"
            placeholder={`bijv. ${currentYear - 5}`}
          />
          <p className="mt-1.5 text-xs text-[#64748b]">Laat leeg indien onbekend</p>
          {errors.schilderjaar && (
            <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {errors.schilderjaar}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-6 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 active:scale-[0.98] sm:h-13 sm:px-8 sm:text-base"
        >
          <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Vorige
        </button>
        <button
          type="button"
          onClick={onNext}
          className="group inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#2E5E4E] text-sm font-semibold text-white shadow-md shadow-[#2E5E4E]/15 transition-all duration-200 hover:bg-[#234a3d] hover:shadow-lg hover:shadow-[#2E5E4E]/20 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:ring-offset-2 active:scale-[0.98] sm:h-13 sm:flex-none sm:px-10 sm:text-base"
        >
          Bereken resultaat
          <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008H15.75v-.008Zm0 2.25h.008v.008H15.75V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
