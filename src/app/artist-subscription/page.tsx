import type { Metadata } from "next";
import Image from "next/image";
import { CaseGallery, GalleryImage } from "../components/CaseGallery";
import WorkTooltip from "../components/WorkTooltip";
import intro from "../images/artist-subscription/intro.png";
import solution from "../images/artist-subscription/solution.png";
import flow from "../images/artist-subscription/flow.png";
import yandexMusicIcon from "../images/artist-subscription/icons/yandex-music.svg";
import appleMusicIcon from "../images/artist-subscription/icons/apple-music.svg";
import spotifyIcon from "../images/artist-subscription/icons/spotify.svg";
import soundcloudIcon from "../images/artist-subscription/icons/soundcloud.svg";
import vkMusicIcon from "../images/artist-subscription/icons/vk-music.svg";

export const metadata: Metadata = {
  title: "Artist Subscription — Евгений Мерцалов",
  description:
    "Концепт подписки на артиста с уведомлениями о новых релизах.",
};

function CaseSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="flex w-full flex-col gap-4">
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
  { src: intro, alt: "Экраны профиля артиста и плеера трека" },
  {
    src: solution,
    alt: "Экраны шторки с предложением включить уведомления и тоста подтверждения",
  },
  {
    src: flow,
    alt: "Схема сценария от подписки до уведомления о релизе на экране блокировки",
  },
];

const benchmarkIcons = [
  {
    name: "yandex-music",
    icon: yandexMusicIcon,
    alt: "Яндекс Музыка",
    tip: "Удобно переходить к артистам прямо из трека, даже если их несколько. Но подписка никак не объясняется, а при нажатии меняется только иконка.",
  },
  {
    name: "apple-music",
    icon: appleMusicIcon,
    alt: "Apple Music",
    tip: "Перейти можно только к основному артисту трека. Подписка спрятана в маленькой иконке, без подтверждения и объяснения, что она даст.",
  },
  {
    name: "spotify",
    icon: spotifyIcon,
    alt: "Spotify",
    tip: "Если исполнителей несколько, выбрать нужного неудобно. Зато после подписки сразу появляется уведомление, что артист добавлен в библиотеку — понятно, что действие сработало.",
  },
  {
    name: "soundcloud",
    icon: soundcloudIcon,
    alt: "SoundCloud",
    tip: "Хорошо подсвечивает подписку и объясняет её ценность через уведомления о релизах. Но выбрать одного из нескольких исполнителей нельзя.",
  },
  {
    name: "vk-music",
    icon: vkMusicIcon,
    alt: "VK Музыка",
    tip: "Подписка на артиста есть, но живёт отдельно от трека: чтобы подписаться, нужно уйти на страницу исполнителя. Что даст подписка — не объясняется.",
  },
];

export default function ArtistSubscription() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-20">
      <div className="w-[480px] max-w-full">
        <CaseGallery images={images}>
          <div className="content flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-4">
              <h1 className="font-normal text-[#5c5c5c] leading-[1.3]">
                Artist Subscription
              </h1>
              <p className="text-[#5c5c5c]">
                Подписаться на артиста можно почти везде, но кнопка ничего не
                обещает: непонятно, что она даст. Из-за этого о новом релизе
                пользователь узнаёт со стороны, а приложение, где он этот трек
                и слушал, остаётся ни при чём.
              </p>
            </div>

            <GalleryImage index={0} {...images[0]} />

            <CaseSection
              title="Задача"
              paragraphs={[
                "Формально задачи не было, я нашёл её сам. Отталкивался от собственного наблюдения: подписываюсь на артистов, но о новых релизах узнаю из телеграм-каналов, а не из приложения.",
                "Проверил, что это не только моя история, и сформулировал так: сделать подписку понятным инструментом возврата, а не декоративной кнопкой.",
                "Критерий успеха: в момент подписки понятно, что получишь, уведомление привязано к событию, из него есть прямой путь к прослушиванию.",
                "Ограничения: концепт без доступа к метрикам, один сценарий без перестройки продукта, 3–5 экранов.",
              ]}
            />

            <CaseSection
              title="Исследование"
              paragraphs={[
                "Кейс концептуальный, поэтому вместо интервью я разбирал существующие решения и сценарии.",
                "Хотел понять две вещи: почему подписка не считывается как ценное действие и в какой момент теряется связь между прослушиванием и возвратом.",
                "Что сделал: Разобрал текущий сценарий подписки по шагам Посмотрел, как музыкальные сервисы объясняют (и объясняют ли) ценность подписки Нашёл точки, где пользователь принимает решение и где можно сформировать ожидание события",
              ]}
            />

            <div className="flex w-full flex-col gap-4">
              <p className="text-[#999]">Бенчмаркинг</p>
              <div className="flex w-full items-center justify-center gap-6 py-[66px]">
                {benchmarkIcons.map(({ name, icon, alt, tip }) => (
                  <WorkTooltip key={name} tip={tip} wrap>
                    <Image src={icon} alt={alt} className="size-12" />
                  </WorkTooltip>
                ))}
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-[#999]">Общий вывод</p>
                <p className="text-[#5c5c5c]">
                  Ни один сервис не объясняет, что даёт подписка,в большинстве
                  она просто переключает состояние кнопки. Там, где есть явная
                  обратная связь, действие ощущается осмысленным, но ожидания
                  будущего события всё равно не создаёт.
                </p>
                <p className="text-[#5c5c5c]">
                  Ближе всех SoundCloud: он единственный связывает подписку с
                  уведомлениями о релизах. Но и там ценность объясняется
                  постфактум, а не в момент решения.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <p className="text-[#999]">Гипотезы</p>
              <div className="flex w-full flex-col gap-2">
                <p className="text-[#5c5c5c]">
                  Если ничего не менять: подписка останется декоративной,  и
                  пользователи не начнут использовать её как способ
                  возвращаться к новому контенту.
                </p>
                <p className="text-[#5c5c5c]">Что можно проверить:</p>
                <p className="text-[#5c5c5c]">
                  Ценность в момент подписки. Если прямо на нажатии показать,
                  что будут приходить уведомления о релизах, подписка станет
                  понятным инструментом, а не абстракцией. Подтверждение
                  действия. Если после подписки пользователь видит явное
                  «готово, уведомления включены», действие ощущается
                  значимым. Событийные уведомления. Если уведомление
                  привязано к выходу трека, а не к общему потоку,
                  возвращаться будут чаще. Момент подписки. Если предлагать
                  подписку во время прослушивания, а не на странице артиста,
                  вероятность выше.
                </p>
                <p className="text-[#5c5c5c]">
                  Отрезал гипотезы, которые требуют перестройки многих
                  экранов или выходят за рамки сценария возврата.
                </p>
                <p className="text-[#5c5c5c]">
                  В работу взял две: пояснение ценности и событийное
                  уведомление, их можно проверить в одном сценарии.
                </p>
              </div>

              <CaseSection
                title="Решение"
                paragraphs={[
                  "Реакция на подписку зависит от того, включены ли у пользователя уведомления.",
                  "Уведомления выключены. При первой подписке на артиста открывается шторка: объясняем, что будем сообщать о новых релизах, и предлагаем включить. Это тот самый момент, где ценность становится понятной — до нажатия, а не после.",
                  "Уведомления уже включены. Шторка не нужна, показываем короткий тост «Будем сообщать о новых релизах». Действие подтверждено, но пользователя не дёргаем лишним экраном.",
                  "Так объяснение появляется ровно там, где оно нужно, и не повторяется каждый раз.",
                ]}
              />
            </div>

            <GalleryImage index={1} {...images[1]} />

            <GalleryImage index={2} {...images[2]} />

            <CaseSection
              title="Рефлексия"
              paragraphs={[
                "Кейс концептуальный, поэтому без интервью и количественных исследований. Опирался на разбор существующих решений и свои продуктовые предположения.",
                "Дальше можно посмотреть на реальное поведение, включают ли пользователи уведомления сразу или откладывают. и развивать решение в сторону персонализации, настраивая, о чём именно сообщать.",
              ]}
            />
          </div>
        </CaseGallery>
      </div>
    </div>
  );
}
