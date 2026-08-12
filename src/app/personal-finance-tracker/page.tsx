import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import onboarding from "../images/pft/onboarding.png";
import homeFlow from "../images/pft/home-flow.png";
import stats from "../images/pft/stats.png";
import settings from "../images/pft/settings.png";
import uiKit from "../images/pft/ui-kit.png";

export const metadata: Metadata = {
  title: "Personal Finance Tracker — Evgeny Merzalov",
  description:
    "A concept for a mobile app focused on personal finance management.",
};

const bodyText = "text-[#6f6f6f] leading-relaxed";
const label = "font-[450] text-[#202020]";
const figmaUrl =
  "https://www.figma.com/design/9FZOIuHHzvMP9IpjJtnJGY/Valto-Finance-Tracker-%E2%80%94-Mobile-App---UI-UX?node-id=1-2&t=L7VWE3mjhVKMmLnK-1";

function CaseImage({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8]">
      <Image
        src={src}
        alt={alt}
        sizes="692px"
        quality={100}
        className="h-auto w-full"
      />
    </div>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className={label}>{title}</p>
      {children}
    </div>
  );
}

export default function PersonalFinanceTracker() {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <div className="mx-auto max-w-[43.25rem] px-6 py-12 sm:py-24">
        <header className="mb-16 flex w-full items-center justify-between sm:mb-24">
          <Link
            href="/"
            aria-label="Home"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#6f6f6f] transition-colors duration-200 ease-out hover:bg-[#e8e8e8] hover:text-[#202020]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Figma"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#6f6f6f] transition-colors duration-200 ease-out hover:bg-[#e8e8e8] hover:text-[#202020]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M6.46447 9.12169C8.4171 7.16907 11.5829 7.16907 13.5355 9.12169L13.8787 9.46484C14.695 10.2811 15.1709 11.3121 15.3042 12.3761C15.3729 12.9241 14.9843 13.424 14.4363 13.4926C13.8883 13.5613 13.3884 13.1727 13.3197 12.6247C13.2397 11.9862 12.9554 11.37 12.4645 10.8791L12.1213 10.5359C10.9498 9.36433 9.05026 9.36433 7.87869 10.5359L4.53554 13.8791C3.36397 15.0506 3.36397 16.9501 4.53554 18.1217L4.87869 18.4648C6.05026 19.6364 7.94976 19.6364 9.12133 18.4648L9.29287 18.2933C9.68338 17.9027 10.3165 17.9027 10.7071 18.2932C11.0976 18.6837 11.0976 19.3169 10.7071 19.7074L10.5356 19.879C8.58295 21.8316 5.41709 21.8317 3.46447 19.879L3.12133 19.5359C1.16871 17.5833 1.1687 14.4175 3.12133 12.4648L6.46447 9.12169Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M13.4644 5.12169C15.417 3.16907 18.5829 3.16907 20.5355 5.12169L20.8786 5.46484C22.8313 7.41746 22.8313 10.5833 20.8786 12.5359L17.5355 15.8791C15.5829 17.8317 12.417 17.8317 10.4644 15.879L10.1213 15.5359C9.30499 14.7196 8.82903 13.6887 8.69574 12.6247C8.62709 12.0767 9.01569 11.5768 9.56369 11.5081C10.1117 11.4395 10.6116 11.8281 10.6802 12.3761C10.7602 13.0146 11.0445 13.6307 11.5355 14.1217L11.8786 14.4648C13.0502 15.6364 14.9497 15.6364 16.1213 14.4648L19.4644 11.1217C20.636 9.95012 20.636 8.05062 19.4644 6.87905L19.1213 6.53591C17.9497 5.36436 16.0503 5.36433 14.8787 6.53581C14.8787 6.53584 14.8788 6.53578 14.8787 6.53581L14.7072 6.70738C14.3167 7.09796 13.6836 7.09804 13.293 6.70757C12.9024 6.31709 12.9023 5.68393 13.2928 5.29335L13.4644 5.12169Z"
              />
            </svg>
          </a>
        </header>

        <main>
          <div className="flex flex-col gap-1">
            <h1 className="font-[550] text-[#202020] leading-snug">
              Personal Finance Tracker
            </h1>
            <p className={`mt-4 ${bodyText}`}>
              In this case, I worked on a concept for a mobile app focused on
              personal finance management. My task was to simplify expense
              tracking and make the user&apos;s financial picture{" "}
              <span className="font-serif-accent">clear and understandable</span>{" "}
              through the interface and user flows.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12">
            <CaseImage
              src={onboarding}
              alt="Onboarding, sign-in, and notification permission screens"
            />

            <CaseSection title="Problem">
              <p className={bodyText}>
                Financial data is often presented in an overly complex way.
                Users have to spend time parsing numbers and tables instead
                of quickly understanding their situation and making a
                decision.
              </p>
            </CaseSection>

            <CaseSection title="Case Goal">
              <p className={bodyText}>
                Focus on the basic,{" "}
                <span className="font-semibold text-[#202020]">
                  most common scenarios
                </span>{" "}
                users rely on:
              </p>
              <ol className={`${bodyText} flex list-decimal flex-col gap-1 pl-5`}>
                <li>Viewing overall balance and current financial status</li>
                <li>Analyzing expenses by category</li>
                <li>
                  Visualizing the financial picture clearly, without
                  overloading the interface
                </li>
              </ol>
            </CaseSection>

            <CaseImage
              src={homeFlow}
              alt="Home balance screen and add operation flow"
            />

            <CaseSection title="Approach">
              <p className={bodyText}>
                This case was created as a concept. I worked on the interface
                logic and screen structure, drawing on existing product
                patterns and common user scenarios.
              </p>
            </CaseSection>

            <CaseImage src={stats} alt="Expense statistics screens" />
            <CaseImage src={settings} alt="Settings screen" />
            <CaseImage src={uiKit} alt="UI kit components" />
          </div>
        </main>
      </div>
    </div>
  );
}
