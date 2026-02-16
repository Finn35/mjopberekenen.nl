"use client";

import { useState, useCallback, useRef } from "react";
import {
  calculateOnderhoudsreserve,
  generateSessionId,
} from "@/lib/calculation";
import { saveCalculation } from "@/lib/supabase";
import type {
  Basisgegevens,
  Onderhoudsstatus,
  CalculationInput,
  CalculationResult,
} from "@/types/calculator";
import { Navbar } from "./Navbar";
import { IntroSection } from "./IntroSection";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1Basisgegevens } from "./Step1Basisgegevens";
import { Step2Onderhoudsstatus } from "./Step2Onderhoudsstatus";
import { ResultScreen } from "./ResultScreen";
import { Footer } from "./Footer";

const currentYear = new Date().getFullYear();

const initialBasis: Basisgegevens = {
  apartments: 4,
  bouwjaar: currentYear - 25,
  oppervlakte: 400,
  lift: false,
  dak_type: "plat",
  balkons: false,
};

const initialOnderhoud: Onderhoudsstatus = {
  dak_conditie: "gemiddeld",
  gevel_conditie: "gemiddeld",
  schilderjaar: null,
};

type Step = "intro" | 1 | 2 | "result";

function validateStep1(
  data: Basisgegevens
): Partial<Record<keyof Basisgegevens, string>> {
  const err: Partial<Record<keyof Basisgegevens, string>> = {};
  if (!data.apartments || data.apartments < 2 || data.apartments > 8) {
    err.apartments = "Voer een aantal tussen 2 en 8 in.";
  }
  if (
    !data.bouwjaar ||
    data.bouwjaar < 1900 ||
    data.bouwjaar > currentYear
  ) {
    err.bouwjaar = `Voer een geldig bouwjaar in (1900–${currentYear}).`;
  }
  if (!data.oppervlakte || data.oppervlakte < 50) {
    err.oppervlakte = "Voer minimaal 50 m² in.";
  }
  return err;
}

function validateStep2(
  data: Onderhoudsstatus
): Partial<Record<keyof Onderhoudsstatus, string>> {
  const err: Partial<Record<keyof Onderhoudsstatus, string>> = {};
  if (!data.dak_conditie) err.dak_conditie = "Selecteer de dakconditie.";
  if (!data.gevel_conditie)
    err.gevel_conditie = "Selecteer de gevelconditie.";
  if (
    data.schilderjaar !== null &&
    data.schilderjaar !== undefined &&
    (data.schilderjaar < 1980 || data.schilderjaar > currentYear)
  ) {
    err.schilderjaar = `Voer een jaar tussen 1980 en ${currentYear} in.`;
  }
  return err;
}

export function CalculatorSection() {
  const [step, setStep] = useState<Step>("intro");
  const [basis, setBasis] = useState<Basisgegevens>(initialBasis);
  const [onderhoud, setOnderhoud] =
    useState<Onderhoudsstatus>(initialOnderhoud);
  const [errors, setErrors] = useState<
    Partial<
      Record<keyof Basisgegevens | keyof Onderhoudsstatus, string>
    >
  >({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationId, setCalculationId] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);

  const scrollToCalculator = useCallback(() => {
    setTimeout(() => {
      calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleStart = useCallback(() => {
    setStep(1);
    scrollToCalculator();
  }, [scrollToCalculator]);

  const handleStep1Next = useCallback(() => {
    const e = validateStep1(basis);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep(2);
    scrollToCalculator();
  }, [basis, scrollToCalculator]);

  const handleStep2Back = useCallback(() => {
    setStep(1);
    scrollToCalculator();
  }, [scrollToCalculator]);

  const handleStep2Next = useCallback(async () => {
    const e = validateStep2(onderhoud);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setIsCalculating(true);
    try {
      const input: CalculationInput = { ...basis, ...onderhoud };
      const res = calculateOnderhoudsreserve(input);
      setResult(res);

      const sid = sessionIdRef.current ?? generateSessionId();
      sessionIdRef.current = sid;

      const id = await saveCalculation({
        session_id: sid,
        apartments: input.apartments,
        bouwjaar: input.bouwjaar,
        oppervlakte: input.oppervlakte,
        lift: input.lift,
        dak_type: input.dak_type,
        balkons: input.balkons,
        dak_conditie: input.dak_conditie,
        gevel_conditie: input.gevel_conditie,
        schilderjaar: input.schilderjaar,
        total_estimate: res.total_estimate,
        yearly_reserve: res.yearly_reserve,
        monthly_per_unit: res.monthly_per_unit,
      });
      setCalculationId(id);
      setStep("result");
      scrollToCalculator();
    } catch (err) {
      console.error(err);
      setErrors({
        schilderjaar: "Er ging iets mis. Probeer het opnieuw.",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [basis, onderhoud, scrollToCalculator]);


  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <IntroSection onStart={handleStart} />

        {/* Calculator section */}
        <section
          ref={calcRef}
          id="calculator"
          className="relative bg-[#f8fafc] px-4 py-12 sm:px-6 sm:py-16 md:py-24"
        >
          {/* Decorative top edge */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#2E5E4E]/10 to-transparent" />

          <div className="mx-auto max-w-2xl">
            {step === "intro" && (
              <div className="animate-fade-in text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md sm:h-16 sm:w-16">
                  <svg className="h-7 w-7 text-[#2E5E4E] sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008H15.75v-.008Zm0 2.25h.008v.008H15.75V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#1a1a2e] sm:mt-5 sm:text-xl">
                  Klik hierboven op &quot;Start berekening&quot;
                </h2>
                <p className="mt-1.5 text-sm text-[#64748b] sm:mt-2 sm:text-base">
                  Vul in twee stappen uw gegevens in en ontvang direct uw resultaat.
                </p>
              </div>
            )}

            {(step === 1 || step === 2) && (
              <div className="rounded-2xl border border-gray-200/60 bg-white p-4 shadow-lg shadow-gray-900/[0.04] sm:rounded-3xl sm:p-8 md:p-10">
                <ProgressIndicator
                  currentStep={step}
                  totalSteps={2}
                />

                {step === 1 && (
                  <Step1Basisgegevens
                    data={basis}
                    onChange={(d) =>
                      setBasis((prev) => ({ ...prev, ...d }))
                    }
                    onNext={handleStep1Next}
                    errors={errors}
                  />
                )}

                {step === 2 && (
                  <Step2Onderhoudsstatus
                    data={onderhoud}
                    onChange={(d) =>
                      setOnderhoud((prev) => ({ ...prev, ...d }))
                    }
                    onNext={handleStep2Next}
                    onBack={handleStep2Back}
                    errors={errors}
                  />
                )}
              </div>
            )}

            {isCalculating && (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[#2E5E4E]/20" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#2E5E4E]">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                </div>
                <p className="mt-4 font-medium text-[#1a1a2e] sm:mt-5">
                  Berekening uitvoeren…
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  Een moment geduld
                </p>
              </div>
            )}

            {step === "result" && result && (
              <ResultScreen
                input={{ ...basis, ...onderhoud }}
                result={result}
                calculationId={calculationId}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
