import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Bekada Med Oussama — Dentiste à Sidi Bel Abbès",
  description:
    "Cabinet dentaire du Dr. Bekada Med Oussama, chirurgien-dentiste à Sidi Bel Abbès : soins dentaires, esthétique du sourire, implantologie, urgences. Ouvert 24h/24. Note 4,8/5 sur Google. Prenez rendez-vous au 0780 30 89 63.",
  alternates: { canonical: "https://[domaine].dz" },
  openGraph: {
    title: "Dr. Bekada Med Oussama — Dentiste à Sidi Bel Abbès",
    description: "Des soins dentaires modernes et personnalisés à Sidi Bel Abbès. Ouvert 24h/24 · 4,8/5 sur Google.",
    url: "https://[domaine].dz",
    siteName: "Cabinet Dr. Bekada Med Oussama",
    locale: "fr_DZ",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dr. Bekada Med Oussama — Cabinet dentaire",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Boulevard Soummam",
    postalCode: "22002",
    addressLocality: "Sidi Bel Abbès",
    addressCountry: "DZ",
  },
  telephone: "+213780308963",
  openingHours: "Mo-Su 00:00-24:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "55",
  },
  url: "https://[domaine].dz",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
