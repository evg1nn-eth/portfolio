import CaseCard, { type CaseStudy } from "./components/CaseCard";
import PayButton from "./components/PayButton";
import ghostVpn from "./images/ghost-vpn.png";
import personalFinanceTracker from "./images/personal-finance-tracker.png";

const columns: CaseStudy[][] = [
  [
    {
      title: "Ghost VPN",
      dates: "Telegram Mini App",
      image: ghostVpn,
      aspectRatio: "628 / 400",
      clickable: false,
    },
  ],
  [
    {
      title: "Personal Finance Tracker",
      dates: "Concept",
      image: personalFinanceTracker,
      aspectRatio: "628 / 300",
    },
  ],
];

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-24 sm:px-[70px] sm:pt-[70px]">
        <header>
          <h1 className="text-[20px] leading-[24px] font-normal text-zinc-800">
            Evgeny Merzalov
          </h1>

          <div className="mt-8 text-pretty text-[20px] leading-[24px] font-normal text-zinc-800">
            <p>
              Interface designer and former professional footballer ⚽️, now
              fully into design. See full experience in 🔗{" "}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-500"
              >
                CV
              </a>
              .
            </p>
            <p className="mt-5">
              On the side, I&apos;m exploring design engineering 🛠️, learning
              how to take designs from Figma straight into working code.
              <br />
              Lately I&apos;ve also been getting into typography and
              lettering ✍️.
            </p>
            <p className="mt-5">
              Always happy to meet new people, whether to work together or
              just chat. Email me at{" "}
              <a
                href="mailto:evgeny1merzalov@yandex.ru"
                className="hover:text-zinc-500"
              >
                evgeny1merzalov@yandex.ru
              </a>
            </p>
          </div>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start">
          {columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-6">
              {column.map((project) => (
                <CaseCard key={project.title} project={project} />
              ))}
              {i === 1 && (
                <div
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none pointer-fine:hover:scale-[0.97]"
                  style={{ aspectRatio: "628 / 400" }}
                >
                  <PayButton />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100">
                    <span className="rounded-lg bg-white px-4 py-2.5 text-[14px] font-normal text-zinc-800">
                      Action Button
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
