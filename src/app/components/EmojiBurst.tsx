"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Particle = {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  emoji: string;
};

const EMOJIS = ["🔗", "🖐🏻", "🦄", "✨"];
const COUNT = 10;

function Piece({
  particle,
  onDone,
}: {
  particle: Particle;
  onDone: (id: number) => void;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(true));
    const timeout = setTimeout(() => onDone(particle.id), 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dx = Math.cos((particle.angle * Math.PI) / 180) * particle.distance;
  const dy = Math.sin((particle.angle * Math.PI) / 180) * particle.distance;

  return (
    <span
      className="absolute text-[20px] transition-[transform,opacity] duration-700 ease-out motion-reduce:hidden"
      style={{
        left: particle.x,
        top: particle.y,
        transform: active
          ? `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${particle.angle}deg)`
          : "translate(-50%, -50%) translate(0, 0) rotate(0deg)",
        opacity: active ? 0 : 1,
      }}
    >
      {particle.emoji}
    </span>
  );
}

export function useEmojiBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const trigger = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const next: Particle[] = Array.from({ length: COUNT }, () => ({
      id: nextId.current++,
      x,
      y,
      angle: Math.random() * 360,
      distance: 50 + Math.random() * 50,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles((prev) => [...prev, ...next]);
  }, []);

  const handleDone = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const portal =
    particles.length > 0
      ? createPortal(
          <div className="pointer-events-none fixed inset-0 z-[60]">
            {particles.map((p) => (
              <Piece key={p.id} particle={p} onDone={handleDone} />
            ))}
          </div>,
          document.body,
        )
      : null;

  return { trigger, portal };
}
