import {
  InterTight,
  tekoSans,
  bebasNeueSans,
  interSans,
} from "@/app/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";

export const metadata: Metadata = {
  title: "Tymex MarketPlace",
  description: "Tymex interview frontend test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${InterTight.variable} ${bebasNeueSans.variable} ${tekoSans.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
