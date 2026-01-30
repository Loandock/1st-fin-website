import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "IR Mortgages | More Than A Mortgage",
    template: "%s | IR Mortgages",
  },
  description:
    "Ivan Ramirez - VP of Mortgage Lending at Certainty Home Lending. $100M+ loans funded. Specializing in ITIN, DSCR, Bank Statement & Investor loans. Bilingual (Español/English). Serving Gwinnett County & Metro Atlanta. NMLS #2059278.",
  keywords: [
    "mortgage",
    "home loan",
    "ITIN loan",
    "DSCR loan",
    "bank statement loan",
    "HELOC",
    "investor loans",
    "first time home buyer",
    "FHA loan",
    "VA loan",
    "refinance",
    "Ivan Ramirez",
    "IR Mortgages",
    "Lawrenceville GA mortgage",
    "Gwinnett County mortgage",
    "Atlanta mortgage",
    "bilingual mortgage",
    "Spanish mortgage lender",
    "Hispanic homeownership",
    "Certainty Home Lending",
    "down payment assistance",
  ],
  authors: [{ name: "Ivan Ramirez - IR Mortgages" }],
  creator: "IR Mortgages",
  publisher: "IR Mortgages",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://irmortgages.com",
    siteName: "IR Mortgages",
    title: "IR Mortgages | More Than A Mortgage",
    description:
      "Bilingual Mortgage Expert in Lawrenceville, GA. Specializing in ITIN, DSCR, Bank Statement & Investor loans. 500+ families helped. Español/English. NMLS #2059278.",
    images: [
      {
        url: "https://irmortgages.com/ivan.jpg",
        width: 1200,
        height: 630,
        alt: "Ivan Ramirez - IR Mortgages - Bilingual Mortgage Loan Officer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IR Mortgages | Ivan Ramirez - Bilingual Mortgage Expert",
    description:
      "$100M+ loans funded. ITIN, DSCR, Bank Statement & Investor loans. Español/English. Serving Metro Atlanta.",
    images: [
      {
        url: "https://irmortgages.com/ivan.jpg",
        alt: "Ivan Ramirez - IR Mortgages",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/IR Mortgage logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/IR Mortgage logo.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://irmortgages.com"),
  alternates: {
    canonical: "https://irmortgages.com",
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/IR Mortgage logo.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/IR Mortgage logo.png" sizes="180x180" />
        <meta name="theme-color" content="#194080" />
        {/* EmailJS SDK */}
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          async
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
