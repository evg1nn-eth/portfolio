import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import avatar from "./images/projects/avatar.jpg";
import ghostVpnIcon from "./images/projects/ghost-vpn-icon.svg";
import kringgaIcon from "./images/projects/kringga-icon.svg";
import newPeopleIcon from "./images/projects/newpeople-icon.svg";
import pftIcon from "./images/projects/pft-icon.svg";
import playgroundIcon from "./images/projects/playground-icon.svg";

type Project = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  href?: string;
};

type ExperienceItem = {
  title: string;
  role: string;
  dates: string;
  icon: StaticImageData;
};

const experience: ExperienceItem[] = [
  {
    title: "New People",
    role: "Designer",
    dates: "Aug 2026 - Current",
    icon: newPeopleIcon,
  },
  {
    title: "Digital Agency Kringga",
    role: "UI/UX Designer",
    dates: "Mar 2026 - Aug 2026",
    icon: kringgaIcon,
  },
];

const projects: Project[] = [
  { title: "Ghost VPN", subtitle: "Telegram Mini App", icon: ghostVpnIcon },
  {
    title: "Personal Finance Tracker",
    subtitle: "Concept",
    icon: pftIcon,
  },
  { title: "Playground", subtitle: "UI experiments", icon: playgroundIcon },
];

const font = "font-['iA_Writer_Quattro']";
const bodyText = `${font} text-[16px] leading-[20px] text-[#7f7a75]`;
const link = "text-[#1a5a8d]";

function ProjectRow({ project }: { project: Project }) {
  const inner = (
    <>
      <Image src={project.icon} alt="" width={24} height={24} />
      <span className={`${font} text-[16px] leading-[24px] text-white`}>
        {project.title}
      </span>
      <span
        className={`${font} text-[16px] leading-[20px] text-[#7f7a75]`}
      >
        {project.subtitle}
      </span>
    </>
  );

  if (project.href) {
    return (
      <Link href={project.href} className="flex items-center gap-4">
        {inner}
      </Link>
    );
  }

  return <div className="flex items-center gap-4">{inner}</div>;
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={item.icon} alt="" width={24} height={24} />
        <span className={`${font} text-[16px] leading-[24px] text-white`}>
          {item.title}
        </span>
        <span className={`${font} text-[16px] leading-[24px] text-[#7f7a75]`}>
          {item.role}
        </span>
      </div>
      <span className={`${font} text-[16px] leading-[20px] text-[#7f7a75]`}>
        {item.dates}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#191919]">
      <div className="mx-auto flex max-w-[700px] flex-col gap-12 px-4 py-24">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Image
              src={avatar}
              alt="Evgeny Merzalov"
              width={124}
              height={124}
              quality={100}
              className="h-[124px] w-[124px] rounded-[8px] object-cover"
            />
            <h1 className={`${font} text-[40px] leading-[48px] font-bold text-white`}>
              Evgeny Merzalov
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <p className={bodyText}>Hi there!</p>
            <p className={bodyText}>
              Before design, I spent most of my life playing football
              professionally. When that chapter ended, I went all in on
              design.
            </p>
            <p className={bodyText}>
              I currently work at the{" "}
              <a
                href="https://kringga.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                Digital Agency Kringga
              </a>
              , focused on mobile and product design. My last project was a
              Telegram Mini App, where I designed onboarding flows for every
              platform and built a referral program from scratch.
            </p>
            <p className={bodyText}>
              On the side, I&apos;m exploring design engineering, learning
              how to take designs from Figma straight into working code.
              Lately I&apos;ve also been getting into typography and
              lettering.
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
              , or reach me via{" "}
              <a href="mailto:evgeny1merzalov@yandex.ru" className={link}>
                email
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className={`${font} text-[20px] leading-[26px] font-bold text-white`}>
            Projects
          </p>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className={`${font} text-[20px] leading-[26px] font-bold text-white`}>
            Design Approach
          </p>
          <p className={bodyText}>
            I believe good design starts with understanding the problem and
            ends with attention to detail. I lean toward thinking about the
            whole product, not just the interface.
          </p>
          <p className={bodyText}>
            I try to make decisions deliberately and be able to explain
            them, not just &quot;it looks better this way.&quot; It matters
            to me to understand why each element is where it is and how it
            affects the person using it.
          </p>
          <p className={bodyText}>
            Lately I&apos;ve been drawn to staying closer to engineering,
            understanding how what I design actually gets built, and where
            design ends and engineering begins. I think that&apos;s where
            the profession is heading, and I want to grow there.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className={`${font} text-[20px] leading-[26px] font-bold text-white`}>
            Experience
          </p>
          <div className="flex flex-col gap-4">
            {experience.map((item) => (
              <ExperienceRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
