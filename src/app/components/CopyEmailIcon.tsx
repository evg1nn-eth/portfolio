"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmailIcon({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1700);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`icon ${copied ? "copied" : ""}`}
      title="Copy email"
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      <svg
        className="ic-copy"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6944 4.08301H5.63887C4.77942 4.08301 4.08331 4.77912 4.08331 5.63856V10.6941C4.08331 11.5536 4.77942 12.2497 5.63887 12.2497H10.6944C11.5539 12.2497 12.25 11.5536 12.25 10.6941V5.63856C12.25 4.77912 11.5539 4.08301 10.6944 4.08301Z"
          stroke="#212121"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.64538 2.13845C9.33504 1.60295 8.72285 1.28164 8.07333 1.37848L2.68801 2.1789C1.83868 2.30483 1.25224 3.0959 1.37824 3.94602L2.1389 9.06442"
          stroke="#212121"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="ic-check"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          pathLength="1"
          d="M2.13892 7.38889L5.05558 10.3056L11.8611 3.5"
          stroke="#212121"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
