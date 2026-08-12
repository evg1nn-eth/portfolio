"use client";

import { useState } from "react";

const EMAIL = "evgeny1merzalov@yandex.ru";

export default function EmailCopyButton({ className }: { className: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permission denied or unavailable — nothing to recover to.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={copied}
      className={`inline-block w-[6ch] cursor-pointer p-0 text-left disabled:cursor-default ${className}`}
    >
      {copied ? "copied" : "email"}
    </button>
  );
}
