import { InterTight, interSans } from "@/app/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

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
        className={`${interSans.variable} ${InterTight.variable} antialiased`}
      >
        <div className="relative h-[200vh]">
          <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
          <div className="relative z-10 flex h-screen items-center justify-center text-4xl text-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
