# Mjopberekenen.nl

Onderhoudsreserve Calculator voor kleine VvE's (2–8 appartementen). Bereken in 2 minuten hoeveel uw VvE maandelijks moet reserveren voor toekomstig onderhoud.

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- TailwindCSS
- Supabase

## Setup

1. Kopieer `.env.example` naar `.env.local`
2. Vul de Supabase-URL en anon key in
3. `npm install` (indien nodig)
4. `npm run dev`

## Productie

- `npm run build`
- `npm start`

## Supabase

De `vve_calculations`-tabel is aanwezig op het gekoppelde project. Berekeningen worden automatisch opgeslagen.

Voor PDF/e-mail: de MVP simuleert het versturen. Voeg een Supabase Edge Function of e-mailprovider (Resend, SendGrid) toe voor productiegebruik.
