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
    default: "The Mortgage Fellas | South Florida Mortgage Experts",
    template: "%s | The Mortgage Fellas",
  },
  description:
    "The Mortgage Fellas - Your trusted mortgage team in Pembroke Pines, FL. Expert mortgage lending in South Florida. FHA, VA, Conventional, Investment, ITIN, DSCR loans. DBA of 1st Financial Mortgage.",
  keywords: [
    "mortgage",
    "home loan",
    "first time home buyer",
    "FHA loan",
    "VA loan",
    "refinance",
    "The Mortgage Fellas",
    "1st Financial Mortgage",
    "Pembroke Pines mortgage",
    "Miramar mortgage",
    "South Florida mortgage",
    "Florida mortgage lender",
    "bank statement loans",
    "investment loans",
    "DSCR loans",
    "ITIN loans",
    "jumbo loans",
  ],
  authors: [{ name: "The Mortgage Fellas" }],
  creator: "The Mortgage Fellas",
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
    url: "https://mortgagefellas.com",
    siteName: "The Mortgage Fellas",
    title: "The Mortgage Fellas | South Florida Mortgage Experts",
    description:
      "Expert mortgage lending in Pembroke Pines & South Florida. FHA, VA, Conventional, Investment, ITIN, DSCR loans.",
    images: [
      {
        url: "https://mortgagefellas.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Mortgage Fellas - South Florida Mortgage Experts",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mortgage Fellas | South Florida Mortgage Experts",
    description:
      "Expert mortgage lending in South Florida. FHA, VA, Conventional, Investment, ITIN, DSCR loans.",
    images: [
      {
        url: "https://mortgagefellas.com/og-image.jpg",
        alt: "The Mortgage Fellas",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://mortgagefellas.com"),
  alternates: {
    canonical: "https://mortgagefellas.com",
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1619010186014540');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1619010186014540&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
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
