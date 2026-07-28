import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import PayButton from "./components/PayButton";
import ghostVpnImage from "./images/ghost-vpn.png";
import personalFinanceTrackerImage from "./images/personal-finance-tracker.png";

type CaseRow = {
  title: string;
  dates: string;
  year: string;
  soon?: boolean;
  image: StaticImageData;
  href?: string;
};

const cases: CaseRow[] = [
  {
    title: "Ghost VPN",
    dates: "Telegram Mini App",
    year: "2026",
    soon: true,
    image: ghostVpnImage,
  },
  {
    title: "Personal Finance Tracker",
    dates: "Concept",
    year: "2025",
    image: personalFinanceTrackerImage,
    href: "/personal-finance-tracker",
  },
];

const textClass =
  "text-[14px] leading-[20px] tracking-normal text-[#111111] dark:text-zinc-100";

const linkUnderline =
  "relative inline before:absolute before:inset-x-0 before:bottom-0 before:h-px before:rounded-sm before:bg-[#d9d9d9] before:transition-colors before:duration-200 hover:before:bg-[#666] dark:before:bg-zinc-600 dark:hover:before:bg-zinc-300";

const caseFrameClass =
  "relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none pointer-fine:hover:scale-[0.97] dark:bg-zinc-900";

const caseFrameStyle = { height: "300px" };

function staggerStyle(i: number) {
  return { "--stagger-i": i } as React.CSSProperties;
}

export default function Home() {
  return (
    <div className="flex-1 bg-[#FDFDFC] transition-colors duration-300 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-[582px] px-4 pt-16 pb-24">
        <header className="flex flex-col items-start text-left">
          <div className="stagger-item flex flex-col" style={staggerStyle(0)}>
            <h1 className={`${textClass} font-medium`}>Evgeny Merzalov</h1>
            <span className="text-[14px] leading-[20px] tracking-normal text-zinc-400">
              Updated Jul 27, 2026
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p
              className={`${textClass} stagger-item font-normal`}
              style={staggerStyle(1)}
            >
              I&apos;m Evgeny, an interface designer.
            </p>
            <p
              className={`${textClass} stagger-item font-normal`}
              style={staggerStyle(2)}
            >
              Before design, I spent most of my life playing football
              professionally. When that chapter ended, I went all in on
              design.
            </p>
            <p
              className={`${textClass} stagger-item font-normal`}
              style={staggerStyle(3)}
            >
              I currently work at the{" "}
              <a
                href="https://kringga.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkUnderline}
              >
                Digital Agency Kringga
              </a>
              , focused on mobile and product design. My last project was
              a Telegram Mini App, where I designed onboarding flows for
              every platform and built a referral program from scratch.
            </p>
            <p
              className={`${textClass} stagger-item font-normal`}
              style={staggerStyle(4)}
            >
              On the side, I&apos;m exploring design engineering, learning
              how to take designs from Figma straight into working code.
              Lately I&apos;ve also been getting into typography and
              lettering.
            </p>
            <p
              className={`${textClass} stagger-item font-normal`}
              style={staggerStyle(5)}
            >
              You can find me on{" "}
              <a
                href="https://t.me/evg1nn"
                target="_blank"
                rel="noopener noreferrer"
                className={linkUnderline}
              >
                Telegram
              </a>{" "}
              &amp;{" "}
              <a
                href="https://www.linkedin.com/in/evgeny-merzalov-4923403b8/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkUnderline}
              >
                LinkedIn
              </a>
              , check out my{" "}
              <a href="#" className={linkUnderline}>
                CV
              </a>
              , or reach me via{" "}
              <a
                href="mailto:evgeny1merzalov@yandex.ru"
                className={linkUnderline}
              >
                email
              </a>
              .
            </p>
          </div>
        </header>

        <section className="mt-12 flex flex-col gap-[36px]">
          {cases.map((c, i) => {
            const cover = (
              <Image
                src={c.image}
                alt={c.title}
                sizes="550px"
                className="h-full w-full object-cover"
              />
            );

            return (
              <div
                key={c.title}
                className="stagger-item flex flex-col items-center gap-2"
                style={staggerStyle(6 + i)}
              >
                {c.href ? (
                  <Link
                    href={c.href}
                    className={caseFrameClass}
                    style={caseFrameStyle}
                  >
                    {cover}
                  </Link>
                ) : (
                  <div
                    className={`${caseFrameClass} cursor-default`}
                    style={caseFrameStyle}
                  >
                    {cover}
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <span className={`${textClass} font-medium`}>{c.title}</span>
                  <span className="text-[14px] leading-[20px] tracking-normal font-normal text-zinc-400">
                    {c.dates} • {c.year}
                    {c.soon ? " • Soon" : ""}
                  </span>
                </div>
              </div>
            );
          })}

          <div
            className="stagger-item flex flex-col items-center gap-2"
            style={staggerStyle(8)}
          >
            <div
              className={`${caseFrameClass} cursor-default`}
              style={caseFrameStyle}
            >
              <PayButton />
            </div>
            <span className="text-[14px] leading-[20px] tracking-normal text-zinc-400">
              Interactive button
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
