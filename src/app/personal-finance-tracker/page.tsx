import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import CaseIndex from "../components/CaseIndex";
import ZoomableImage from "../components/ZoomableImage";
import onboarding from "../images/pft/onboarding.png";
import homeFlow from "../images/pft/home-flow.png";
import stats from "../images/pft/stats.png";
import settings from "../images/pft/settings.png";
import uiKit from "../images/pft/ui-kit.png";

const textClass =
  "text-[14px] leading-[20px] tracking-normal text-[#111111] dark:text-zinc-100";

const indexLinkClass =
  "text-[14px] leading-[20px] tracking-normal text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200";

function staggerStyle(i: number) {
  return { "--stagger-i": Math.min(i, 8) } as React.CSSProperties;
}

function CaseImage({
  src,
  alt,
  className = "mt-8",
  index,
}: {
  src: typeof onboarding;
  alt: string;
  className?: string;
  index: number;
}) {
  return (
    <div
      className={`${className} stagger-item`}
      style={staggerStyle(index)}
    >
      <div className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none pointer-fine:hover:scale-[0.97]">
        <ZoomableImage
          src={src}
          alt={alt}
          sizes="550px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function CaseSection({
  id,
  title,
  children,
  index,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      id={id}
      className="stagger-item mt-8 flex scroll-mt-24 flex-col gap-4"
      style={staggerStyle(index)}
    >
      <p className={`${textClass} font-medium`}>{title}</p>
      {children}
    </div>
  );
}

export default function PersonalFinanceTracker() {
  return (
    <div className="flex-1 bg-[#FDFDFC] transition-colors duration-300 dark:bg-[#0a0a0a]">
      <CaseIndex />
      <div className="mx-auto max-w-[582px] px-4 pt-16 pb-24">
        <Link
          href="/"
          className={`${indexLinkClass} mb-6 inline-flex items-center gap-1 xl:hidden`}
        >
          <CornerUpLeft size={14} strokeWidth={2} aria-hidden="true" /> Back
        </Link>

        <header className="flex flex-col items-start text-left">
          <div className="stagger-item flex flex-col" style={staggerStyle(0)}>
            <p className={`${textClass} font-medium`}>
              Personal Finance Tracker
            </p>
            <span className="text-[14px] leading-[20px] tracking-normal text-zinc-400">
              2025
            </span>
          </div>

          <p
            className={`${textClass} stagger-item mt-6 font-normal`}
            style={staggerStyle(1)}
          >
            In this case, I worked on a concept for a mobile app focused on
            personal finance management. My task was to simplify expense
            tracking and make the user&apos;s financial picture clear and
            understandable through the interface and user flows.
          </p>
        </header>

        <div className="mt-12 flex flex-col">
          <CaseImage
            src={onboarding}
            alt="Onboarding, sign-in, and notification permission screens"
            className=""
            index={2}
          />

          <CaseSection id="problem" title="Problem" index={3}>
            <p className={`${textClass} font-normal`}>
              Financial data is often presented in an overly complex way.
              Users have to spend time parsing numbers and tables instead of
              quickly understanding their situation and making a decision.
            </p>
          </CaseSection>

          <CaseSection id="case-goal" title="Case Goal" index={4}>
            <p className={`${textClass} font-normal`}>
              Focus on the basic, most common scenarios users rely on:
            </p>
            <ol className={`${textClass} flex list-decimal flex-col gap-1 pl-5 font-normal`}>
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
            index={5}
          />

          <CaseSection id="approach" title="Approach" index={6}>
            <p className={`${textClass} font-normal`}>
              This case was created as a concept. I worked on the interface
              logic and screen structure, drawing on existing product
              patterns and common user scenarios.
            </p>
          </CaseSection>

          <CaseImage src={stats} alt="Expense statistics screens" index={7} />
          <CaseImage
            src={settings}
            alt="Settings screen"
            className="mt-4"
            index={8}
          />
          <CaseImage
            src={uiKit}
            alt="UI kit components"
            className="mt-4"
            index={9}
          />
        </div>
      </div>
    </div>
  );
}
