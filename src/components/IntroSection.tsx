"use client";

const trustItems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    text: "Klaar in 2 minuten",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    text: "Geen registratie nodig",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    text: "100% gratis",
  },
];

export function IntroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] via-white to-white px-4 pt-24 pb-16 sm:px-6 sm:pt-36 sm:pb-28">
      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2E5E4E]/[0.03] blur-3xl" />
        <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-[#2E5E4E]/[0.02] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2E5E4E]/[0.015] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-[#2E5E4E]/5 px-3.5 py-1.5 text-xs font-medium text-[#2E5E4E] sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E5E4E]/40"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E5E4E]"></span>
          </span>
          Speciaal voor kleine VvE&apos;s (2–8 appartementen)
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-100 text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1a1a2e] sm:text-4xl md:text-5xl lg:text-6xl">
          Bereken hoeveel jouw VvE{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#2E5E4E]">maandelijks</span>
            <span className="absolute -bottom-0.5 left-0 z-0 h-2.5 w-full rounded bg-[#2E5E4E]/10 sm:-bottom-1 sm:h-3" />
          </span>{" "}
          moet reserveren
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#64748b] sm:mt-6 sm:text-lg md:text-xl">
          Direct inzicht in onderhoudskosten en benodigde reserve.
          Geen ingewikkelde rapporten, geen registratie.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-300 mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onStart}
            className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#2E5E4E] px-8 text-base font-semibold text-white shadow-lg shadow-[#2E5E4E]/20 transition-all duration-200 hover:bg-[#234a3d] hover:shadow-xl hover:shadow-[#2E5E4E]/25 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:ring-offset-2 active:scale-[0.98] sm:h-14 sm:w-auto sm:px-10"
          >
            Start berekening
            <svg className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-in-up animation-delay-400 mx-auto mt-10 flex flex-col items-center gap-3 sm:mt-14 sm:flex-row sm:justify-center sm:gap-x-8">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#64748b]">
              <span className="text-[#2E5E4E]/70">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
