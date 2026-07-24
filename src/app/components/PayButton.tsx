"use client";

import { useRef, useState } from "react";

type Status = "idle" | "loading" | "success";

const WIDTH: Record<Status, string> = {
  idle: "w-40",
  loading: "w-44",
  success: "w-36",
};

export default function PayButton() {
  const [status, setStatus] = useState<Status>("idle");
  const audioCtxRef = useRef<AudioContext | null>(null);

  function playClickSound() {
    const AudioCtxClass = window.AudioContext;
    if (!AudioCtxClass) return;
    const ctx = audioCtxRef.current ?? new AudioCtxClass();
    audioCtxRef.current = ctx;

    const now = ctx.currentTime;

    // Short filtered noise burst — the "click" transient
    const noiseDuration = 0.03;
    const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 1200;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);

    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start(now);

    // Low thump — gives the click its dull, muted body
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(oscGain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  function playSuccessSound() {
    const AudioCtxClass = window.AudioContext;
    if (!AudioCtxClass) return;
    const ctx = audioCtxRef.current ?? new AudioCtxClass();
    audioCtxRef.current = ctx;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 — major triad

    notes.forEach((freq, i) => {
      const start = now + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.36);
    });
  }

  function handleClick() {
    if (status !== "idle") return;
    playClickSound();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      playSuccessSound();
      setTimeout(() => setStatus("idle"), 2000);
    }, 1400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status !== "idle"}
      className={`relative flex h-14 items-center justify-center rounded-full border text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_-2px_rgba(0,0,0,0.25)] transition-[width,background-color,border-color] duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] enabled:cursor-pointer enabled:active:scale-[0.97] motion-reduce:transition-[background-color,border-color] motion-reduce:duration-200 ${
        WIDTH[status]
      } ${
        status === "success"
          ? "border-emerald-400/50 bg-gradient-to-b from-emerald-500 to-emerald-600"
          : "border-blue-400/50 bg-gradient-to-b from-blue-500 to-blue-600"
      }`}
    >
      <span
        className={`absolute transition-opacity duration-150 ease-out ${
          status === "idle" ? "opacity-100 delay-150" : "opacity-0"
        }`}
      >
        Pay $4,99
      </span>

      <span
        className={`absolute flex items-center gap-2 transition-opacity duration-150 ease-out ${
          status === "loading" ? "opacity-100 delay-150" : "opacity-0"
        }`}
      >
        <svg
          className="h-4 w-4 animate-spin motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-90"
            d="M22 12a10 10 0 0 0-10-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        Processing
      </span>

      <span
        className={`absolute flex items-center gap-1.5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:duration-150 motion-reduce:ease-out ${
          status === "success"
            ? "opacity-100 scale-100 delay-150"
            : "opacity-0 scale-50"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Paid
      </span>
    </button>
  );
}
