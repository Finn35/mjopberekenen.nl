import { LogoFull } from "./Logo";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-100 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Top row: brand + disclaimer + contact */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <LogoFull />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#64748b]">
              Gratis onderhoudsreserve calculator voor kleine VvE&apos;s.
              Snel inzicht in benodigde reserves zonder registratie.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-[#64748b]">
            <p className="font-medium text-[#1a1a2e]">Disclaimer</p>
            <p className="mt-2 max-w-xs leading-relaxed">
              Deze tool biedt een indicatieve berekening en vervangt geen
              officieel bouwkundig MJOP. Raadpleeg altijd een professional
              voor definitief advies.
            </p>
          </div>

          {/* Contact form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-10">
          <p className="text-center text-xs text-[#94a3b8]">
            &copy; {currentYear} mjopberekenen.nl — Alle rechten voorbehouden
          </p>
        </div>
      </div>
    </footer>
  );
}
