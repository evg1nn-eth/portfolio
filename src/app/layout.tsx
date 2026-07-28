import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnimatedThemeToggler from "./components/AnimatedThemeToggler";
import "./globals.css";

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="fixed top-4 right-4 z-50">
          <AnimatedThemeToggler />
        </div>
        {children}
      </body>
    </html>
  );
}
