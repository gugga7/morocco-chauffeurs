import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Morocco Chauffeurs",
  description: "Premium chauffeur services across Morocco",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
