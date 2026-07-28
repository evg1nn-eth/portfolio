"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";

export default function ZoomableImage({
  src,
  alt,
  className = "",
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in ${className}`}
      />

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-6 opacity-100 transition-opacity duration-300 ease-out motion-reduce:transition-none starting:opacity-0 dark:bg-[#0a0a0a]/95"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="fixed top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[18px] text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)] hover:text-zinc-500 dark:bg-zinc-900 dark:text-zinc-200 dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.4)] dark:hover:text-zinc-400"
            >
              ✕
            </button>
            <Image
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="relative z-0 max-h-[90vh] max-w-[90vw] scale-100 object-contain transition-transform duration-300 ease-out motion-reduce:transition-none starting:scale-95"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
