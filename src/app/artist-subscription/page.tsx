import type { Metadata } from "next";
import { CaseGallery, GalleryImage } from "../components/CaseGallery";
import intro from "../images/artist-subscription/intro.png";
import statsCard from "../images/artist-subscription/stats-card.png";
import benchmark from "../images/artist-subscription/benchmark.png";
import hypothesesTable from "../images/artist-subscription/hypotheses-table.png";
import solution from "../images/artist-subscription/solution.png";
import hookLoop from "../images/artist-subscription/hook-loop.png";

export const metadata: Metadata = {
  title: "Artist Subscription — Евгений Мерцалов",
  description:
    "Концепт подписки на артиста с уведомлениями о новых релизах.",
};

const images = [
  { src: intro, alt: "Экраны профиля артиста и плеера трека" },
  {
    src: statsCard,
    alt: "35% узнают о новой музыке через алгоритмы сервиса, 49% находят её в соцсетях",
  },
  {
    src: benchmark,
    alt: "Карточки сравнения Яндекс Музыки, Spotify, VK Музыки и SoundCloud",
  },
  {
    src: hypothesesTable,
    alt: "Таблица гипотез с оценкой ценности, сложности и решением, что берём в работу",
  },
  {
    src: solution,
    alt: "Экраны шторки с предложением включить уведомления, тоста подтверждения и уведомления на экране блокировки",
  },
  {
    src: hookLoop,
    alt: "Схема цикла триггер — действие — награда — инвестиция",
  },
];

export default function ArtistSubscription() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-20">
      <div className="w-[480px] max-w-full">
        <CaseGallery images={images}>
          <div className="content flex w-full flex-col gap-6">
            {/* Intro: title + hero, both bordered (nested divider, matches Figma) */}
            <div className="flex w-full flex-col gap-6 border-b border-[#f5f5f5] pb-6">
              <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
                <h1 className="font-normal text-[#999] leading-[1.3]">
                  Artist Subscription
                </h1>
                <p className="text-[#5c5c5c]">
                  Концепт для музыкального приложения. Хотел разобраться, почему кнопка «подписаться» никого не возвращает в приложение, и что с этим можно сделать.
                </p>
              </div>
              <GalleryImage index={0} {...images[0]} />
            </div>

            {/* Откуда взялась задача */}
            <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
              <p className="text-[#999]">Откуда взялась задача</p>
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-2">
                  <p className="text-[#5c5c5c]">
                    Подписался на десяток артистов и продолжаю узнавать о новых альбомах из телеграма. Странная история, я же нажал кнопку, приложение знает, кого я слушаю, но связь всё равно рвётся где‑то по дороге.
                  </p>
                  <p className="text-[#5c5c5c]">
                    Стал копать, оказалось, что это не только моя беда. Только треть людей узнаёт о музыке через сам сервис, зато половина находит её в соцсетях. А релизов за год стало на 54% больше. Уследить руками уже невозможно, а продукт не помогает.
                  </p>
                  <p className="text-[#5c5c5c]">
                    Отсюда и задача. Сделать так, чтобы подписка перестала быть кнопкой ради кнопки и начала работать на возврат.
                  </p>
                </div>
                <GalleryImage index={1} {...images[1]} />
                <p className="text-[#5c5c5c]">
                  Ограничения простые. Кейс концептуальный, метрик и доступа к командам сервисов нет. Менять всё приложение нельзя, только один сценарий и несколько экранов.
                </p>
              </div>
            </div>

            {/* Как разбирался */}
            <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
              <p className="text-[#999]">Как разбирался</p>
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-2">
                  <p className="text-[#5c5c5c]">
                    Пошёл смотреть, как эту штуку сделали другие. Взял пять сервисов и проверил три вещи. Можно ли подписаться прямо из трека, объясняют ли, зачем это нужно, и связана ли подписка с уведомлениями о релизах.
                  </p>
                  <p className="text-[#5c5c5c]">
                    Картина получилась унылая. Подписка есть у всех, но что она даёт, не говорит почти никто. Нажал кнопку, она перекрасилась, и всё. Никакого обещания, никакого ожидания.
                  </p>
                </div>
                <GalleryImage index={2} {...images[2]} />
                <p className="text-[#5c5c5c]">
                  Там, где после нажатия хоть что‑то происходит, действие сразу ощущается по‑другому. А единственный, кто прямо связал подписку с уведомлениями о релизах, это SoundCloud. Но и он объясняет уже постфактум, когда решение принято.
                </p>
              </div>
            </div>

            {/* Гипотезы */}
            <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
              <p className="text-[#999]">Гипотезы</p>
              <div className="flex w-full flex-col gap-2">
                <p className="text-[#5c5c5c]">Накидал четыре штуки.</p>
                <div className="flex w-full flex-col gap-6">
                  <div className="flex w-full flex-col gap-2">
                    <p className="text-[#5c5c5c]">
                      Ценность в момент нажатия. Если сразу сказать, что будут приходить уведомления о релизах, подписка перестанет быть абстракцией.
                    </p>
                    <p className="text-[#5c5c5c]">
                      Событийные уведомления. Если пуш привязан к конкретному релизу, а не к общему потоку, возвращаться будут чаще.
                    </p>
                    <p className="text-[#5c5c5c]">
                      Подтверждение действия. Если после нажатия что‑то происходит, действие ощущается значимым, а не как переключатель.
                    </p>
                    <p className="text-[#5c5c5c]">
                      Момент предложения. Если звать подписаться во время прослушивания, а не на странице артиста, вероятность выше.
                    </p>
                  </div>
                  <p className="text-[#5c5c5c]">
                    Дальше прикинул, что из этого реально брать в работу. Смотрел на две вещи, сколько пользы приносит гипотеза и сколько всего придётся перекроить.
                  </p>
                </div>
              </div>
              <GalleryImage index={3} {...images[3]} />
              <p className="text-[#5c5c5c]">
                Момент предложения пришлось отрезать, хотя гипотеза сильная. Чтобы её проверить, нужно трогать плеер, страницу артиста и всё, что между ними, а это уже другой масштаб задачи. Подтверждение действия оставил как приятный бонус к основному сценарию, отдельно проверять его смысла мало.
              </p>
              <p className="text-[#5c5c5c]">
                В итоге взял две верхние. Они закрывают главный вопрос, понимает ли человек, что получит, и есть ли у него повод вернуться.
              </p>
            </div>

            {/* Решение */}
            <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
              <p className="text-[#999]">Решение</p>
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-2">
                  <p className="text-[#5c5c5c]">
                    Реакция зависит от того, включены ли уведомления.
                  </p>
                  <p className="text-[#5c5c5c]">
                    Если выключены, при первой подписке открывается шторка. Говорим прямо, что будем сообщать о новых релизах, и предлагаем включить. Ценность становится понятной до нажатия, а не после.
                  </p>
                  <p className="text-[#5c5c5c]">
                    Если уведомления уже есть, шторка не нужна. Показываем короткий тост «будем сообщать о новых релизах». Подтвердили и не мешаем.
                  </p>
                </div>
                <GalleryImage index={4} {...images[4]} />
              </div>

              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4">
                  <p className="text-[#999]">Почему это работает</p>
                  <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                      <p className="text-[#5c5c5c]">
                        Смотрел на retention. Задача была не напихать уведомлений, а дать повод вернуться.
                      </p>
                      <p className="text-[#5c5c5c]">
                        Разбирал сценарий по модели хука Нира Эяля. Она про то, как продукт формирует привычку через четыре шага, которые крутятся по кругу.
                      </p>
                    </div>
                    <GalleryImage index={5} {...images[5]} />
                  </div>
                </div>
                <p className="text-[#5c5c5c]">
                  Три шага работают нормально. Триггер есть, действие простое, награда понятная и приходит быстро.
                </p>
                <p className="text-[#5c5c5c]">
                  А вот с инвестицией сложнее. Формально она есть, человек включает уведомления и говорит приложению, кого ждать. Но это происходит один раз и дальше не накапливается. Он просто получает пуши, ничего больше не вкладывая. А без накопления привычка толком не формируется.
                </p>
                <p className="text-[#5c5c5c]">
                  Получается, у меня не петля привычки, а рабочий сценарий возврата. Для задачи этого достаточно, подписка перестаёт быть формальностью и начинает приводить человека обратно. Но называть это полноценным хуком было бы враньём.
                </p>
              </div>
            </div>

            {/* Что понял — last block, no divider */}
            <div className="flex w-full flex-col gap-2">
              <p className="text-[#999]">Что понял</p>
              <p className="text-[#5c5c5c]">
                Кейс концептуальный, поэтому без интервью и цифр с прода. Опирался на разбор сервисов и открытые данные.
              </p>
              <p className="text-[#5c5c5c]">
                Больше всего времени ушло не на экраны, а на вопрос, в какой момент объяснять ценность. Если сказать слишком рано, человек ещё не понял, зачем ему этот артист. Если поздно, решение уже принято и объяснять нечего.
              </p>
              <p className="text-[#5c5c5c]">
                Если развивать дальше, первым делом достроил бы инвестицию. Например, чем больше артистов человек отслеживает, тем точнее подборка новинок. Тогда каждая подписка делает продукт полезнее лично для него, и цикл начнёт работать по‑настоящему.
              </p>
            </div>
          </div>
        </CaseGallery>
      </div>
    </div>
  );
}
