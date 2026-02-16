import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2E5E4E",
};

export const metadata: Metadata = {
  title: "Mjopberekenen.nl – Onderhoudsreserve Calculator voor kleine VvE",
  description:
    "Bereken in 2 minuten hoeveel jouw VvE maandelijks moet reserveren voor toekomstig onderhoud. Speciaal voor kleine VvE's (2–8 appartementen).",
  openGraph: {
    title: "Mjopberekenen.nl – VvE Onderhoudsreserve Calculator",
    description:
      "Gratis calculator voor kleine VvE's. Direct inzicht in onderhoudskosten en benodigde reserves.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
