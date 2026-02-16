"use client";

import type { Basisgegevens, DakType } from "@/types/calculator";

interface Props {
  data: Basisgegevens;
  onChange: (data: Partial<Basisgegevens>) => void;
  onNext: () => void;
  errors: Partial<Record<keyof Basisgegevens, string>>;
}

const currentYear = new Date().getFullYear();

function ToggleGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-[#1a1a2e]">{label}</legend>
      <div className="flex gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-200 sm:px-4 ${
                isSelected
                  ? "border-[#2E5E4E] bg-[#2E5E4E]/5 text-[#2E5E4E] shadow-sm"
                  : "border-gray-200 bg-white text-[#64748b] hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function InputField({
  id,
  label,
  suffix,
  error,
  ...inputProps
}: {
  id: string;
  label: string;
  suffix?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#1a1a2e]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...inputProps}
          className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-base text-[#1a1a2e] transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2E5E4E] focus:outline-none focus:ring-4 focus:ring-[#2E5E4E]/10"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748b]">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function Step1Basisgegevens({ data, onChange, onNext, errors }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-[#1a1a2e] sm:text-2xl">Basisgegevens</h2>
        <p className="mt-1.5 text-sm text-[#64748b] sm:mt-2 sm:text-base">Vertel ons over uw gebouw</p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        <InputField
          id="apartments"
          label="Aantal appartementen"
          type="number"
          min={2}
          max={8}
          value={data.apartments || ""}
          onChange={(e) => onChange({ apartments: parseInt(e.target.value, 10) || 0 })}
          placeholder="2–8"
          error={errors.apartments}
        />

        <InputField
          id="bouwjaar"
          label="Bouwjaar"
          type="number"
          min={1900}
          max={currentYear}
          value={data.bouwjaar || ""}
          onChange={(e) => onChange({ bouwjaar: parseInt(e.target.value, 10) || 0 })}
          placeholder={`bijv. ${currentYear - 20}`}
          error={errors.bouwjaar}
        />

        <InputField
          id="oppervlakte"
          label="Totale woonoppervlakte"
          type="number"
          min={50}
          step={10}
          value={data.oppervlakte || ""}
          onChange={(e) => onChange({ oppervlakte: parseFloat(e.target.value) || 0 })}
          placeholder="bijv. 400"
          suffix="m²"
          error={errors.oppervlakte}
        />

        <ToggleGroup
          label="Heeft het gebouw een lift?"
          options={[
            { value: "true", label: "Ja" },
            { value: "false", label: "Nee" },
          ]}
          value={String(data.lift)}
          onChange={(v) => onChange({ lift: v === "true" })}
        />

        <ToggleGroup
          label="Type dak"
          options={[
            { value: "plat", label: "Plat dak" },
            { value: "schuin", label: "Schuin dak" },
          ]}
          value={data.dak_type}
          onChange={(v) => onChange({ dak_type: v as DakType })}
        />

        <ToggleGroup
          label="Balkons aanwezig?"
          options={[
            { value: "true", label: "Ja" },
            { value: "false", label: "Nee" },
          ]}
          value={String(data.balkons)}
          onChange={(v) => onChange({ balkons: v === "true" })}
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#2E5E4E] text-sm font-semibold text-white shadow-md shadow-[#2E5E4E]/15 transition-all duration-200 hover:bg-[#234a3d] hover:shadow-lg hover:shadow-[#2E5E4E]/20 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:ring-offset-2 active:scale-[0.98] sm:mt-8 sm:h-13 sm:w-auto sm:px-10 sm:text-base"
      >
        Volgende stap
        <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
}
