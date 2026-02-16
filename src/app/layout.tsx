import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z0VMDW8LDS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z0VMDW8LDS');
          `}
        </Script>
        <Script id="gtag-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-989714763/jb0HCLbQ9s8bEMuy99cD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
