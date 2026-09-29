import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const body = Geist({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Verdict | Indian AI lawyer",
  description: "Ask about the Constitution of India, BNS, BNSS and BSA. Get answers with citations you can check.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} dark`}>
      <body className="min-h-screen antialiased ">
        {children}
      </body>
    </html>
  );
}
