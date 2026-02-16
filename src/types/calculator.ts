export type DakType = "plat" | "schuin";
export type Conditie = "goed" | "gemiddeld" | "slecht";

export interface Basisgegevens {
  apartments: number;
  bouwjaar: number;
  oppervlakte: number;
  lift: boolean;
  dak_type: DakType;
  balkons: boolean;
}

export interface Onderhoudsstatus {
  dak_conditie: Conditie;
  gevel_conditie: Conditie;
  schilderjaar: number | null;
}

export interface CalculationInput extends Basisgegevens, Onderhoudsstatus {}

export interface CalculationResult {
  total_estimate: number;
  yearly_reserve: number;
  monthly_per_unit: number;
}

export interface VveCalculationRecord {
  id?: string;
  created_at?: string;
  session_id?: string;
  apartments: number;
  bouwjaar: number;
  oppervlakte: number;
  lift: boolean;
  dak_type: DakType;
  balkons: boolean;
  dak_conditie: Conditie;
  gevel_conditie: Conditie;
  schilderjaar: number | null;
  total_estimate: number;
  yearly_reserve: number;
  monthly_per_unit: number;
  email?: string | null;
}
