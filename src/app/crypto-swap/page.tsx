import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Swap — Евгений Мерцалов",
  description:
    "Простой обменник криптовалюты. Выбираешь, что продать и что купить, вводишь сумму, и происходит обмен по текущему курсу.",
};

export default function CryptoSwap() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 pt-20 pb-4">
      <div className="w-[480px] max-w-full">
        <div className="content flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4 border-b border-[#f5f5f5] pb-6">
            <h1 className="font-normal text-[#999] leading-[1.3]">
              Crypto Swap
            </h1>
            <p className="text-[#5c5c5c]">
              Простой обменник криптовалюты. Выбираешь, что продать и что
              купить, вводишь сумму, и происходит обмен по текущему курсу.
            </p>
          </div>

          <iframe
            src="/demos/crypto-swap/index.html"
            title="Crypto Swap — интерактивное демо"
            loading="lazy"
            className="h-[600px] w-full rounded-[4px] border-0"
          />
        </div>
      </div>
    </div>
  );
}
