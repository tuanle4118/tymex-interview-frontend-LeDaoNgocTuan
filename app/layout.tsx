import {
  InterTight,
  bebasNeueSans,
  interSans,
  tekoSans,
} from "@/app/lib/fonts";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
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
    <html
      lang="en"
      className={`${interSans.variable} ${InterTight.variable} ${bebasNeueSans.variable} ${tekoSans.variable}`}
    >
      <ConfigProvider
        theme={{ token: { fontFamily: "var(--font-inter-sans)" } }}
      >
        <body className="font-interSans antialiased">
          <Header />
          {children}
        </body>
      </ConfigProvider>
    </html>
  );
}
