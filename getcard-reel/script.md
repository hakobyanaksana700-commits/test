# GetCard.one — Instagram Reels (9:16, 15 сек)

Сценарий и раскадровка ролика о платёжной системе GetCard.one. Стиль — премиальная
финтех-реклама: прозрачная стеклянная карта с логотипом GetCard, ночной город,
холодно-тёплая (синий/оранжевый) цветокоррекция — по образцу приложенного референс-изображения.

## Референс дизайна
Стеклянная карта GetCard с логотипом Mastercard, парящая над ночным городом (в стиле
приложенного пользователем изображения) — сгенерирована как якорный кадр (first frame)
для видео, чтобы весь ролик был выдержан в едином визуальном языке:
https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/a4cd6f2c-eebb-4744-9f7f-3db91d55a004/A_hyper_realistic_transparent_glass_credit_card_floating_in_.png

(Ссылка на сгенерированный актив временная / хостится на стороне Runway. Файл недоступен
для скачивания напрямую из данной изолированной среды выполнения из-за сетевой политики
egress-прокси — см. примечание в конце файла.)

## Раскадровка

| # | Тайминг | Сцена | Описание |
|---|---------|-------|----------|
| 1 | 0–3с | **Хук** | Крупный план: человек ночью расстроенно смотрит в телефон. На экране — красный крестик и надпись «Платёж не принят» на странице оплаты зарубежного сервиса, рядом иконки популярных зарубежных сервисов (стриминг, AI-чат, облако, путешествия, покупки). |
| 2 | 3–6с | **Проблема** | Карта раз за разом «отскакивает» от светящегося глобуса с красным силовым барьером. Иконки сервисов вокруг глобуса гаснут красным одна за другой — карта не работает за границей. |
| 3 | 6–9с | **Решение** | Появляется прозрачная карта GetCard, «пробивает» барьер — он рассыпается на частицы света. Иконки сервисов один за другим загораются зелёным — оплата проходит. |
| 4 | 9–12с | **Пополнение через СБП** | Экран телефона: мгновенный перевод через СБП (иконка молнии/QR) прямо на баланс карты GetCard, счётчик баланса быстро растёт. |
| 5 | 12–15с | **CTA** | Карта плавно вращается на ярком градиентном (оранжево-синем) фоне, появляется лого GetCard.one, палец нажимает на пульсирующую кнопку «Оформить карту». |

## Примечание по брендам
В визуале намеренно использованы обобщённые иконки категорий сервисов (стриминг,
AI-чат, облако, путешествия, покупки), а не точные фирменные логотипы сторонних брендов
(Apple, OpenAI/ChatGPT, Google, Netflix, Airbnb и т.д.), чтобы избежать нарушения товарных
знаков и ложного впечатления об официальном партнёрстве. Смысл сцены — «карта не
принимается на популярных зарубежных сервисах» — сохранён без использования чужих
логотипов.

## Результат
Итоговый ролик сгенерирован (вертикальный формат 9:16, 15.04 сек, 1072×1928, со звуком)
через Runway Multi-Shot (5 связанных сцен по сценарию выше):

https://dnznrvs05pmza.cloudfront.net/kling-3-0-pro/920938922837549144/untitled.mp4

(Ссылка временная, хостится на стороне Runway — рекомендуется скачать и сохранить файл
как можно скорее. Скачать и закоммитить сам .mp4/.png в этот репозиторий не удалось:
сетевая политика egress-прокси данной изолированной среды блокирует прямые HTTPS-запросы
к домену `dnznrvs05pmza.cloudfront.net` (403 на CONNECT), поэтому бинарные файлы переданы
пользователю напрямую по ссылке в чате, а не как файлы в репозитории.)

## Промпты для генерации (для воспроизводимости)

**Общий сюжет:** A 15-second vertical Instagram Reel ad for the GetCard.one international
payment card: a person's card gets declined on foreign services at night, a barrier
symbolizes cards not working abroad, the transparent GetCard smashes through the barrier
and unlocks payments everywhere, instant SBP top-up fills the balance, ending with the
card rotating beside the GetCard.one logo and a call-to-action button. Premium fintech
advertising style, glass/holographic card aesthetic, cinematic blue-orange lighting,
consistent with the reference GetCard glass card design.

1. **Хук:** Vertical 9:16 cinematic close-up at night: a young man's face lit only by his
   smartphone screen glow, frustrated and disappointed expression, sitting in a dim room
   with a blurred city skyline through the window behind him. The phone screen shows a
   checkout page with a large red circle icon with an X inside and bold text "PAYMENT
   DECLINED", below it a row of small generic app icons (streaming play button, AI chat
   bubble, cloud icon, airplane travel icon, shopping bag icon) all shown in muted red.
   Slow push-in camera, moody blue-toned lighting, shallow depth of field.
2. **Проблема:** Vertical 9:16 dark tech background: a glossy translucent bank card
   repeatedly flies forward and bounces off a large glowing digital globe wrapped in red
   glowing barrier arcs and force-field energy lines. Icons around the globe flicker and
   dim to red one after another. Deep blue/navy background, particle dust, dramatic rim
   lighting.
3. **Решение:** Vertical 9:16: a transparent frosted-glass GetCard smashes directly
   through the glowing red energy barrier — it shatters into thousands of light particles
   that disperse outward. Icons around the globe light up bright green one by one. Camera
   orbits smoothly around the card, dynamic light flares.
4. **Пополнение СБП:** Vertical 9:16 close-up of a smartphone screen: clean banking app UI
   with blue/orange gradient accents, a glowing lightning-bolt/QR icon pulses an instant
   transfer, a large balance counter rapidly increases with rolling digit animation.
5. **CTA:** Vertical 9:16 studio shot: the GetCard glass card slowly rotates against a
   bright orange-to-blue gradient background; the GetCard.one logo fades in above it; a
   finger taps a pulsing glowing button reading "Get the Card".
