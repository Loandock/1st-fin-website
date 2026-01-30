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
    default: "1st Financial Mortgage | Miramar Branch",
    template: "%s | 1st Financial Mortgage",
  },
  description:
    "1st Financial Mortgage - Miramar Branch in Pembroke Pines, FL. Expert mortgage lending in South Florida. FHA, VA, Conventional, Investment loans. Branch NMLS #1620197.",
  keywords: [
    "mortgage",
    "home loan",
    "first time home buyer",
    "FHA loan",
    "VA loan",
    "refinance",
    "1st Financial Mortgage",
    "Pembroke Pines mortgage",
    "Miramar mortgage",
    "South Florida mortgage",
    "Florida mortgage lender",
    "down payment assistance",
    "investment loans",
    "DSCR loans",
    "jumbo loans",
  ],
  authors: [{ name: "1st Financial Mortgage - Miramar Branch" }],
  creator: "1st Financial Mortgage",
  publisher: "1st Financial Mortgage",
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
    url: "https://1stfinmiramar.com",
    siteName: "1st Financial Mortgage",
    title: "1st Financial Mortgage | Miramar Branch",
    description:
      "Expert mortgage lending in Pembroke Pines & South Florida. FHA, VA, Conventional, Investment loans. Branch NMLS #1620197.",
    images: [
      {
        url: "https://1stfinmiramar.com/team.jpg",
        width: 1200,
        height: 630,
        alt: "1st Financial Mortgage - Miramar Branch Team",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1st Financial Mortgage | Miramar Branch",
    description:
      "Expert mortgage lending in South Florida. FHA, VA, Conventional, Investment loans. Branch NMLS #1620197.",
    images: [
      {
        url: "https://1stfinmiramar.com/team.jpg",
        alt: "1st Financial Mortgage - Miramar Branch",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://1stfinmiramar.com"),
  alternates: {
    canonical: "https://1stfinmiramar.com",
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
        <meta name="theme-color" content="#0D3F72" />
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
