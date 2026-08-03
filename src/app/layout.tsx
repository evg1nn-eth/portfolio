import type { Metadata } from "next";
import "@fontsource/ia-writer-quattro/400.css";
import "@fontsource/ia-writer-quattro/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evgeny Merzalov — Interface Designer",
  description:
    "Interface designer working on product and mobile design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
