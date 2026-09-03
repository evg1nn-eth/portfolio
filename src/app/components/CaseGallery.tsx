"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { createPortal } from "react-dom";

type GalleryImg = { src: StaticImageData; alt: string };

type Rect = { left: number; top: number; width: number; height: number };

function setRect(el: HTMLElement, r: Rect) {
  el.style.top = `${r.top}px`;
  el.style.left = `${r.left}px`;
  el.style.width = `${r.width}px`;
  el.style.height = `${r.height}px`;
}

function targetRect(w0: number, h0: number): Rect {
  const maxW = window.innerWidth * 0.675;
  const maxH = window.innerHeight * 0.675;
  const scale = Math.min(maxW / w0, maxH / h0);
  const width = w0 * scale;
  const height = h0 * scale;
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

const GalleryContext = createContext<{
  registerRef: (index: number, el: HTMLDivElement | null) => void;
  open: (index: number) => void;
} | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("GalleryImage must be used inside CaseGallery");
  return ctx;
}

export function GalleryImage({ index, src, alt }: { index: number } & GalleryImg) {
  const { registerRef, open } = useGallery();
  return (
    <div
      ref={(el) => registerRef(index, el)}
      role="button"
      tabIndex={0}
      aria-label="Открыть изображение"
      onClick={() => open(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(index);
        }
      }}
      className="cursor-zoom-in overflow-hidden rounded-[4px]"
    >
      <Image
        src={src}
        alt={alt}
        sizes="480px"
        quality={100}
        className="block h-auto w-full"
      />
    </div>
  );
}

function LightboxOverlay({
  images,
  index,
  sourceRefs,
  onClose,
  onNav,
}: {
  images: GalleryImg[];
  index: number;
  sourceRefs: React.RefObject<(HTMLDivElement | null)[]>;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);
  const openedIndexRef = useRef<number | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  function positionNav(to: Rect, animate: boolean) {
    const gap = 32;
    const margin = 8;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!prevBtn || !nextBtn) return;
    const prevLeft = Math.max(margin, to.left - gap - 40);
    const nextLeft = Math.min(window.innerWidth - margin - 40, to.left + to.width + gap);
    if (!animate) {
      prevBtn.style.transition = nextBtn.style.transition = "none";
    }
    prevBtn.style.left = `${prevLeft}px`;
    nextBtn.style.left = `${nextLeft}px`;
    if (!animate) {
      void prevBtn.offsetWidth;
      prevBtn.style.transition = nextBtn.style.transition = "";
    }
  }

  useEffect(() => {
    const source = sourceRefs.current[index];
    const item = itemRef.current;
    if (!source || !item) return;

    const isNav = openedIndexRef.current !== null;
    openedIndexRef.current = index;

    setFade(isNav);

    const r = source.getBoundingClientRect();
    if (!isNav) setRect(item, r);

    const to = targetRect(r.width, r.height);
    positionNav(to, isNav);

    if (reduceRef.current) {
      setRect(item, to);
      setVisible(true);
      return;
    }

    item.getBoundingClientRect();
    requestAnimationFrame(() => {
      setRect(item, to);
      setVisible(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleClose() {
    const source = sourceRefs.current[index];
    const item = itemRef.current;
    if (!source || !item) {
      onClose();
      return;
    }
    const r = source.getBoundingClientRect();
    setVisible(false);
    if (reduceRef.current) {
      onClose();
      return;
    }
    item.getBoundingClientRect();
    requestAnimationFrame(() => setRect(item, r));
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onClose();
    };
    const timer = setTimeout(finish, 500);
    const onEnd = (e: React.TransitionEvent) => {
      if (e.propertyName !== "width" && e.propertyName !== "top") return;
      clearTimeout(timer);
      finish();
    };
    item.addEventListener("transitionend", onEnd as unknown as EventListener, {
      once: true,
    });
  }

  useEffect(() => {
    function onResize() {
      const source = sourceRefs.current[index];
      const item = itemRef.current;
      if (!source || !item) return;
      const r = source.getBoundingClientRect();
      const to = targetRect(r.width, r.height);
      setRect(item, to);
      positionNav(to, false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, sourceRefs]);

  const img = images[index];

  return (
    <div
      className={`lb ${visible ? "open" : ""}`}
      aria-hidden={!visible}
      onClick={handleClose}
    >
      {images.length > 1 && (
        <button
          ref={prevBtnRef}
          type="button"
          className="lb-nav lb-prev"
          aria-label="Предыдущее изображение"
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.25 10.25L8.5 6L4.25 1.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div ref={itemRef} className="lb-item">
        <Image
          key={index}
          src={img.src}
          alt={img.alt}
          fill
          sizes="70vw"
          quality={100}
          className={fade ? "lb-img lb-img-fade" : "lb-img"}
        />
      </div>
      {images.length > 1 && (
        <button
          ref={nextBtnRef}
          type="button"
          className="lb-nav lb-next"
          aria-label="Следующее изображение"
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.25 10.25L8.5 6L4.25 1.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export function CaseGallery({
  images,
  children,
}: {
  images: GalleryImg[];
  children: React.ReactNode;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const registerRef = useCallback((index: number, el: HTMLDivElement | null) => {
    refs.current[index] = el;
  }, []);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (dir: number) => {
      setOpenIndex((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, go]);

  return (
    <GalleryContext.Provider value={{ registerRef, open }}>
      {children}
      {openIndex !== null &&
        createPortal(
          <LightboxOverlay
            images={images}
            index={openIndex}
            sourceRefs={refs}
            onClose={close}
            onNav={go}
          />,
          document.body,
        )}
    </GalleryContext.Provider>
  );
}
