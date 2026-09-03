import type { Metadata } from "next";
import { Geist, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Евгений Мерцалов — Продуктовый дизайнер",
  description:
    "Продуктовый дизайнер, создаю понятные, интуитивные мобильные интерфейсы для цифровых продуктов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${libreBaskerville.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
