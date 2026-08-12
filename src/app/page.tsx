import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import EmailCopyButton from "./components/EmailCopyButton";
import ghostIcon from "./images/ghost.svg";
import conceptIcon from "./images/concept.svg";

type Project = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  href?: string;
};

const projects: Project[] = [
  {
    title: "Ghost VPN",
    subtitle: "A VPN app built for Telegram.",
    icon: ghostIcon,
    href: "/ghost-vpn",
  },
  {
    title: "Personal Finance Tracker",
    subtitle: "A concept for expense tracking.",
    icon: conceptIcon,
    href: "/personal-finance-tracker",
  },
];

const bodyText = "text-[#6f6f6f] leading-relaxed";
const link =
  "font-[450] text-[#202020] underline decoration-[#d9d9d9] underline-offset-[3px] transition-colors duration-200 ease-out hover:decoration-[#202020]";

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[#e8e8e8] bg-white transition-colors duration-200 ease-out group-hover:border-[#e0e0e0]">
      <div className="flex aspect-[192/100] w-full items-center justify-center">
        <Image src={project.icon} alt="" className="h-12 w-auto" />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-0.5 px-4 py-3">
        <span className="flex w-full items-center justify-between gap-1">
          <span className="font-[450] text-[#202020] leading-snug">
            {project.title}
          </span>
          {project.href && (
            <span className="flex shrink-0 -translate-x-0.5 scale-75 items-center justify-center text-[#6f6f6f] opacity-0 transition-[opacity,translate,scale] duration-300 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </span>
        <span className="w-full truncate text-[#6f6f6f] leading-snug">
          {project.subtitle}
        </span>
      </div>
    </div>
  );

  const className =
    "card-shadow group flex items-center justify-center overflow-hidden rounded-2xl p-1";

  if (project.href) {
    return (
      <Link href={project.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <div className="mx-auto max-w-[43.25rem] px-6 py-12 sm:py-24">
        <main>
          <div className="mb-6 flex flex-col">
            <h1 className="font-medium text-[#202020] leading-snug">
              Evgeny Merzalov
            </h1>
            <span className="whitespace-nowrap font-[450] text-[#6f6f6f] leading-snug">
              Product Designer
            </span>
          </div>

          <p className={`mb-4 ${bodyText}`}>
            Before design, I spent most of my life playing football
            professionally. When that chapter ended, I found the same focus
            in building products, and went{" "}
            <span className="font-serif-accent">all in</span>.
          </p>
          <p className={`mb-4 ${bodyText}`}>
            I care about the balance of beauty and usability, and I like
            understanding the whole product, not just the interface. The
            small details, the ones people rarely notice, are usually what I
            spend the most time on.
          </p>
          <p className={`mb-4 ${bodyText}`}>
            Lately I&apos;ve been exploring design engineering, learning how
            to bring my designs to life in code, and getting into typography
            and lettering along the way.
          </p>
          <p className={bodyText}>
            You can find me on{" "}
            <a
              href="https://t.me/evg1nn"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Telegram
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.linkedin.com/in/evgeny-merzalov-4923403b8/"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              LinkedIn
            </a>
            , check out my{" "}
            <a
              href="https://drive.google.com/file/d/1UKT7WVxkx7lI7VfSlhsgCyqRDuPtMbV9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              CV
            </a>
            , or reach me via <EmailCopyButton className={link} />.
          </p>

          <div className="mt-16 w-full sm:mt-32">
            <h2 className="mb-5 font-medium text-[#202020]">Projects</h2>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>

          <div className="mt-16 w-full sm:mt-32">
            <h2 className="mb-3 font-medium text-[#202020]">
              Design Approach
            </h2>
            <div className="flex flex-col gap-4">
              <p className={bodyText}>
                I believe good design starts with understanding the problem
                and ends with{" "}
                <span className="font-serif-accent">attention to detail</span>
                . I lean toward thinking about the whole product, not just
                the interface.
              </p>
              <p className={bodyText}>
                I try to make decisions deliberately and be able to explain
                them, not just &quot;it looks better this way.&quot; It
                matters to me to understand why each element is where it is
                and how it affects the person using it.
              </p>
              <p className={bodyText}>
                Lately I&apos;ve been drawn to staying closer to engineering,
                understanding how what I design actually gets built, and
                where design ends and engineering begins. I think
                that&apos;s where the profession is heading, and I want to
                grow there.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
