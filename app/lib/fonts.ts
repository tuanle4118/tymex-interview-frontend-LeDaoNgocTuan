import { Bebas_Neue, Inter, Inter_Tight, Teko } from "next/font/google";

export const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const InterTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const bebasNeueSans = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
});

export const tekoSans = Teko({
  variable: "--font-teko-sans",
  subsets: ["latin"],
});
