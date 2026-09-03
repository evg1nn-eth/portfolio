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
    "Концепт мобильного приложения для управления личными финансами.",
};

function CaseSection({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-[#999]">{title}</p>
      <p className="text-[#5c5c5c]">{text}</p>
    </div>
  );
}

const images = [
  {
    src: onboarding,
    alt: "Экраны входа, ввода кода и разрешения на уведомления",
  },
  { src: homeFlow, alt: "Экран баланса и добавление операции" },
  { src: stats, alt: "Экраны статистики расходов" },
  { src: settings, alt: "Экран настроек" },
  { src: uiKit, alt: "Компоненты UI-кита" },
];

export default function PersonalFinanceTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-4">
      <div className="w-[480px] max-w-full">
        <CaseGallery images={images}>
          <div className="content flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-4">
              <h1 className="font-normal text-[#5c5c5c] leading-[1.3]">
                Personal Finance Tracker
              </h1>
              <p className="text-[#5c5c5c]">
                Концепт мобильного приложения для управления личными
                финансами. Задача упростить контроль расходов и сделать
                финансовую картину понятной с первого взгляда.
              </p>
            </div>

            <GalleryImage index={0} {...images[0]} />

            <CaseSection
              title="Контекст и роль"
              text="Финансовые приложения часто перегружают пользователя: чтобы понять, что происходит с деньгами, приходится разбираться в цифрах и таблицах. Я поставил себе цель убрать этот порог и собрать интерфейс вокруг самых частых задач, с которыми человек заходит в приложение каждый день, не заставляя его вникать в лишнее."
            />

            <CaseSection
              title="Проблема"
              text="Кейс делал как концепт, поэтому опирался на анализ существующих решений и типовых пользовательских сценариев. Сначала выстроил логику и структуру экранов, определив, что выносить на первый план, а что убирать вглубь. Дальше собрал ключевые флоу: просмотр баланса, добавление операции и разбивку расходов по категориям, следя за тем, чтобы на каждом шаге пользователь видел ровно столько информации, сколько нужно для решения."
            />

            <CaseSection
              title="Результаты"
              text="Получился чистый интерфейс, где состояние финансов считывается с первого взгляда, а не прячется в таблицах. Концепт показывает, как можно снизить порог входа в управление деньгами и сделать рутинный контроль расходов простым. Следующим шагом было бы протестировать флоу на реальных пользователях и добавить персонализацию под разные финансовые привычки."
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
