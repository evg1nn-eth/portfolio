import type { Metadata } from "next";
import { CaseGallery, GalleryImage } from "../components/CaseGallery";
import onboarding from "../images/pft/onboarding.png";
import homeFlow from "../images/pft/home-flow.png";
import stats from "../images/pft/stats.png";
import settings from "../images/pft/settings.png";
import uiKit from "../images/pft/ui-kit.png";

export const metadata: Metadata = {
  title: "Personal Finance Tracker — Евгений Мерцалов",
  description:
    "Концепт мобильного приложения для личных финансов.",
};

function CaseSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
      <p className="text-[#999]">{title}</p>
      <div className="flex w-full flex-col gap-2">
        {paragraphs.map((text) => (
          <p key={text} className="text-[#5c5c5c]">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

const images = [
  {
    src: onboarding,
    alt: "Экраны входа через Apple и Google и уведомление-напоминание",
  },
  {
    src: homeFlow,
    alt: "Экран баланса, добавление операции и выбор категории",
  },
  { src: stats, alt: "Экраны статистики расходов: диаграмма и график" },
  { src: settings, alt: "Экран профиля и настроек приложения" },
  { src: uiKit, alt: "Компоненты UI-кита" },
];

export default function PersonalFinanceTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-20">
      <div className="w-[480px] max-w-full">
        <CaseGallery images={images}>
          <div className="content flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
              <h1 className="font-normal text-[#999] leading-[1.3]">
                Personal Finance Tracker
              </h1>
              <p className="text-[#5c5c5c]">
                Концепт мобильного приложения для личных финансов. Хотел
                упростить контроль расходов и сделать так, чтобы картина по
                деньгам считывалась с первого взгляда.
              </p>
            </div>

            <GalleryImage index={0} {...images[0]} />

            <CaseSection
              title="Контекст и роль"
              paragraphs={[
                "Финансовые приложения любят вывалить на тебя всё сразу. Чтобы понять, что происходит с деньгами, приходится разбираться в цифрах и таблицах, хотя вопрос обычно простой. Сколько у меня есть и куда всё ушло.",
                "Я решил убрать этот порог и собрать интерфейс вокруг того, зачем человек реально заходит в приложение каждый день.",
              ]}
            />

            <CaseSection
              title="Как делал"
              paragraphs={[
                "Кейс концептуальный, поэтому вместо интервью разбирал существующие решения и типовые сценарии.",
                "Начал со структуры, что выносить на первый экран, а что прятать глубже. Главным был вопрос, сколько информации показать, чтобы человек понял ситуацию и не утонул в деталях. Дольше всего разбирался, сколько данных оставить на виду, а сколько убрать.",
              ]}
            />

            <CaseSection
              title="Результаты"
              paragraphs={[
                "Получился интерфейс, где состояние финансов считывается сразу, а не собирается по кускам из таблиц. Концепт показывает, как снизить порог входа в управление деньгами и сделать рутинную проверку расходов быстрой.",
                "Дальше стоило бы потестить флоу на реальных людях и добавить персонализацию под разные привычки.",
              ]}
            />

            <GalleryImage index={1} {...images[1]} />
            <GalleryImage index={2} {...images[2]} />
            <GalleryImage index={3} {...images[3]} />
            <GalleryImage index={4} {...images[4]} />
          </div>
        </CaseGallery>
      </div>
    </div>
  );
}
