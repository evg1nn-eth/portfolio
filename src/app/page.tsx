import Link from "next/link";
import CopyEmailIcon from "./components/CopyEmailIcon";
import WorkTooltip from "./components/WorkTooltip";

type ProjectItem = {
  name: string;
  role: string;
  href?: string;
};

const projects: ProjectItem[] = [
  {
    name: "Personal Finance Tracker",
    role: "Концепт",
    href: "/personal-finance-tracker",
  },
  { name: "Artist Subscription", role: "Исследование" },
  { name: "Subscription Tracker", role: "Вайб-код" },
];

const EMAIL = "evgeny1merzalov@yandex.ru";

function ProjectRow({ name, role, href }: ProjectItem) {
  const inner = (
    <>
      <span className="text-[#5c5c5c]">{name}</span>
      <span className="role text-[#999]">{role}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="work linkable">
        {inner}
      </Link>
    );
  }

  return <div className="work">{inner}</div>;
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-4">
      <div className="w-[480px] max-w-full">
        <div className="content flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
            <div className="flex flex-col gap-1">
              <p className="text-[#5c5c5c]">Евгений Мерцалов</p>
              <p className="text-[#999]">Продуктовый дизайнер</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#5c5c5c]">
                Привет! Я Евгений, продуктовый дизайнер, создаю понятные,
                интуитивные мобильные интерфейсы для цифровых продуктов.
              </p>
              <p className="text-[#5c5c5c]">
                Опираюсь на логику продукта и пользовательские сценарии, а не
                только на картинку. Сейчас всё больше ухожу в
                дизайн-инженерию, проектирую интерфейсы и собираю их в коде.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
            <p className="text-[#999]">Проекты</p>
            <div className="flex w-full items-center justify-between whitespace-nowrap">
              <span className="text-[#5c5c5c]">Ghost VPN</span>
              <WorkTooltip
                label="Q3 2026"
                tip="В разработке"
                className="text-[#999]"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
            <p className="text-[#999]">Работы</p>
            <div className="rows">
              {projects.map((project) => (
                <ProjectRow key={project.name} {...project} />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <p className="text-[#999]">Контакты</p>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center justify-between whitespace-nowrap">
                <span className="text-[#5c5c5c]">Email</span>
                <span className="flex items-center gap-1.5">
                  <a href={`mailto:${EMAIL}`} className="ulink text-[#5c5c5c]">
                    {EMAIL}
                  </a>
                  <CopyEmailIcon email={EMAIL} />
                </span>
              </div>
              <div className="flex w-full items-center justify-between whitespace-nowrap">
                <span className="text-[#5c5c5c]">Telegram</span>
                <a
                  href="https://t.me/evg1nn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ulink text-[#5c5c5c]"
                >
                  @evg1nn
                </a>
              </div>
              <div className="flex w-full items-center justify-between whitespace-nowrap">
                <span className="text-[#5c5c5c]">Linkedin</span>
                <a
                  href="https://www.linkedin.com/in/evgeny-merzalov-4923403b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ulink text-[#5c5c5c]"
                >
                  evgenymerzalov
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
