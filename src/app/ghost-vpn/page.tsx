import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ghost VPN — Evgeny Merzalov",
  description: "A VPN service built as a Telegram Mini App.",
};

export default function GhostVpn() {
  return (
    <div className="relative min-h-screen bg-[#fcfcfc]">
      <div className="mx-auto max-w-[43.25rem] px-6 py-12 sm:py-24">
        <header className="flex w-full items-center">
          <Link
            href="/"
            aria-label="Home"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#6f6f6f] transition-colors duration-200 ease-out hover:bg-[#e8e8e8] hover:text-[#202020]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </header>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <p className="font-serif-accent max-w-[43.25rem] text-center text-[#6f6f6f] leading-relaxed">
          This case is under NDA, and part of the product hasn&apos;t shipped
          yet.
        </p>
      </div>
    </div>
  );
}
