import type { Metadata } from "next";
import { Anton, Manrope, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PerspectiveProvider } from "@/components/ui/SystemsPerspectiveToggle";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Ramakrishnan — Web Developer & Logistics Strategist",
  description: "Web developer, systems architect and logistics strategist from Bengaluru.",
  keywords: [
    "Ben Ramakrishnan",
    "Web Developer",
    "Systems Architect",
    "Logistics Strategist",
    "Bengaluru",
    "Supply Chain Optimization",
    "Next.js 16",
  ],
  authors: [{ name: "Ben Ramakrishnan" }],
  openGraph: {
    title: "Ben Ramakrishnan — Web Developer & Logistics Strategist",
    description: "Web developer and logistics strategist from Bengaluru.",
    type: "website",
    url: "https://benramakrishnan.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${anton.variable} ${manrope.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="font-sans bg-[#080808] text-[#f4f4f1] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col relative overflow-x-hidden">
        <PerspectiveProvider>
          <main className="flex-1 relative z-10 w-full">{children}</main>
        </PerspectiveProvider>
      </body>
    </html>
  );
}
