"use client";

import { useEmojiBurst } from "./EmojiBurst";

export default function CVLink() {
  const { trigger, portal } = useEmojiBurst();

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(pointer: fine)").matches) {
      trigger(e);
    }
  }

  return (
    <>
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        className="hover:text-zinc-500"
      >
        CV
      </a>
      {portal}
    </>
  );
}
