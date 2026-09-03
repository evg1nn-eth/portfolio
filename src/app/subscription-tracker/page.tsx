import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Tracker — Евгений Мерцалов",
  description:
    "Небольшая тулза для учёта подписок: AI-сервисы, экосистемы вроде Яндекса или Сбера, стриминги.",
};

export default function SubscriptionTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-4">
      <div className="w-[700px] max-w-full">
        <div className="content flex w-full flex-col items-center gap-6">
          <div className="flex w-[480px] max-w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
            <h1 className="font-normal text-[#999] leading-[1.3]">
              Subscription Tracker
            </h1>
            <p className="text-[#5c5c5c]">
              Небольшая тулза для учёта подписок: AI-сервисы, экосистемы вроде
              Яндекса или Сбера, стриминги. Показывает все активные подписки в
              одном месте и сколько в сумме набегает на них за месяц, а новую
              подписку можно добавить вручную в пару кликов.
            </p>
          </div>

          <iframe
            src="/demos/subscription-tracker/index.html"
            title="Subscription Tracker — интерактивное демо"
            loading="lazy"
            className="h-[900px] w-full rounded-[4px] border-0"
          />
        </div>
      </div>
    </div>
  );
}
