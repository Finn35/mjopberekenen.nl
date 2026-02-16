import type { CalculationInput, Conditie } from "@/types/calculator";

/**
 * Deterministic Onderhoudsreserve calculation for small VvE (2-8 apartments).
 * Base assumptions (MVP):
 * - Dak vervanging: every 25 years
 * - Gevel onderhoud: every 10 years
 * - Schilderwerk: every 7 years
 * - Lift onderhoud: yearly if exists
 * - Balkons inspectie: every 10 years
 */

const COST_PER_M2 = {
  dak_vervanging: 180, // €/m² voor plat
  dak_vervanging_schuin: 220,
  gevel_onderhoud: 45,
  schilderwerk: 35,
  lift_jaar: 3500,
  balkon_per_eenheid_10jaar: 800, // indicatief per appartement
} as const;

const CONDITIE_MULTIPLIER: Record<Conditie, number> = {
  goed: 0.7,   // minder spoedig nodig
  gemiddeld: 1.0,
  slecht: 1.4,  // eerder nodig, hogere kosten
};

export function calculateOnderhoudsreserve(input: CalculationInput) {
  const currentYear = new Date().getFullYear();
  const bouwLeeftijd = currentYear - input.bouwjaar;

  // Dak: vervanging every 25 years — prorated for 10-year period
  const dakCostPerM2 =
    input.dak_type === "plat"
      ? COST_PER_M2.dak_vervanging
      : COST_PER_M2.dak_vervanging_schuin;
  const dakKosten10Jaar =
    input.oppervlakte *
    dakCostPerM2 *
    CONDITIE_MULTIPLIER[input.dak_conditie] *
    (10 / 25);

  // Gevel: every 10 years
  const gevelKosten10Jaar =
    input.oppervlakte *
    COST_PER_M2.gevel_onderhoud *
    CONDITIE_MULTIPLIER[input.gevel_conditie];

  // Schilderwerk: every 7 years
  const schilderJaren = input.schilderjaar
    ? currentYear - input.schilderjaar
    : Math.min(7, bouwLeeftijd);
  const jarenTotSchilderwerk = Math.max(0, 7 - schilderJaren);
  const schilderMultiplier =
    jarenTotSchilderwerk <= 2
      ? CONDITIE_MULTIPLIER[input.gevel_conditie]
      : 1.0;
  const schilderKosten10Jaar =
    input.oppervlakte *
    COST_PER_M2.schilderwerk *
    schilderMultiplier *
    (10 / 7);

  // Lift: yearly if exists
  const liftKosten10Jaar = input.lift
    ? COST_PER_M2.lift_jaar * 10
    : 0;

  // Balkons: inspection/onderhoud every 10 years (simplified)
  const balkonKosten10Jaar = input.balkons
    ? input.apartments * COST_PER_M2.balkon_per_eenheid_10jaar
    : 0;

  const total_estimate =
    dakKosten10Jaar +
    gevelKosten10Jaar +
    schilderKosten10Jaar +
    liftKosten10Jaar +
    balkonKosten10Jaar;

  const yearly_reserve = total_estimate / 10;
  const monthly_per_unit = yearly_reserve / 12 / input.apartments;

  return {
    total_estimate: Math.round(total_estimate),
    yearly_reserve: Math.round(yearly_reserve),
    monthly_per_unit: Math.round(monthly_per_unit),
  };
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
