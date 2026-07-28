"use client";

import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "case-goal", label: "Case Goal" },
  { id: "approach", label: "Approach" },
];

const linkClass =
  "text-[14px] leading-[20px] tracking-normal transition-colors duration-200";

export default function CaseIndex() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        const current = sections.find((section) => visible.has(section.id));
        setActiveId(current?.id ?? null);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-20 left-20 hidden w-40 flex-col gap-3 xl:flex">
      <Link
        href="/"
        className={`${linkClass} inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200`}
      >
        <CornerUpLeft size={14} strokeWidth={2} aria-hidden="true" /> Index
      </Link>
      <div className="flex flex-col gap-2 pt-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`${linkClass} ${
              activeId === section.id
                ? "text-zinc-800 dark:text-zinc-200"
                : "text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
