"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GAP = 10;

export default function WorkTooltip({
  children,
  tip,
  className,
  wrap,
}: {
  children: React.ReactNode;
  tip: string;
  className?: string;
  wrap?: boolean;
}) {
  const metaRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"idle" | "show" | "leaving">("idle");
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  function position() {
    const r = metaRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ left: r.left + r.width / 2, top: r.top - GAP });
  }

  function handleEnter() {
    clearTimeout(leaveTimer.current);
    position();
    setState("show");
  }

  function handleLeave() {
    setState("leaving");
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setState("idle"), 260);
  }

  useEffect(() => {
    if (state !== "show") return;
    function onScrollOrResize() {
      position();
    }
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [state]);

  return (
    <>
      <span
        ref={metaRef}
        className={`cursor-pointer ${className ?? ""}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </span>
      {state !== "idle" &&
        createPortal(
          <div
            className={`tip ${state === "show" ? "show" : "leaving"}`}
            style={{ left: pos.left, top: pos.top }}
            role="tooltip"
          >
            <span className={`tip-pill${wrap ? " wrap" : ""}`}>
              {tip}
              <span className="tip-tail" />
            </span>
          </div>,
          document.body,
        )}
    </>
  );
}
