'use client';

import {
  ArrowRight, Building2, Check, CheckCircle2, ChevronRight,
  CircleDollarSign, Copy, MailX, MapPin, Network, Plus,
  Search, Sparkles, Store, Target, UserRound, Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Segment = {
  id: string; icon: typeof Building2; name: string; fit: string;
  trigger: string; buyer: string; pain: string; offer: string; message: string;
};

const nav = [
  ['focus', 'Фокус'], ['product', 'Продукт'], ['segments', 'Клиенты'],
  ['signals', 'Где искать'], ['funnel', 'Воронка'], ['search', 'Спрос'], ['price', 'Цена'],
];

const tasks = [
  'Поднять 10 тёплых контактов из CRM и знакомых',
  'Добавить 10 компаний с новым офисом, филиалом или быстрым наймом',
  'Найти одного партнёра: fit-out, брокера, HR или AV-интегратора',
  'Отправить 12 личных сообщений от человека, а не массовую рассылку',
];

const segments: Segment[] = [
  {
    id: 'office', icon: Building2, name: 'Открывают новый офис',
    fit: '40–300 сотрудников · один новый офис · решение без тендера',
    trigger: 'переезд, fit-out, объединение команд, новый региональный офис',
    buyer: 'собственник · HRD · административный директор · office manager',
    pain: 'Офис уже сделали красивым, но правила, новости и онбординг всё равно живут в почте и чатах.',
    offer: 'Запустить живую газету нового офиса за 10 рабочих дней на 1–3 существующих экранах.',
    message: 'Поздравляю с новым офисом. Обычно после переезда остаётся один незакрытый вопрос: как быстро познакомить людей с пространством, правилами и друг с другом — без ещё одной рассылки. Мы в Pike запускаем живую газету на офисных экранах: новости, люди, онбординг и полезные ссылки. Можно проверить за четыре недели на уже имеющихся экранах. Покажу три примера именно под ваш офис за 20 минут?',
  },
  {
    id: 'network', icon: Store, name: 'Растут до нескольких точек',
    fit: '3–20 филиалов · клиники, фитнес, образование, сервис, HoReCa',
    trigger: 'новый филиал, новый город, франшиза, изменение стандартов',
    buyer: 'собственник · операционный директор · директор сети · HR/обучение',
    pain: 'Головной офис меняет сообщение один раз, а каждая точка пересказывает его по-своему.',
    offer: 'Единый канал для всех точек плюс локальный блок филиала — без нового портала.',
    message: 'Увидела, что вы открыли новый филиал. В растущей сети быстро возникает разрыв: головной офис обновил правило или новость, а каждая точка пересказала по-своему. Мы запускаем на экранах единый визуальный канал: центральный контент меняется один раз, у филиала остаётся локальный блок. Пилот — четыре недели на трёх точках. Если покажете одну типичную задачу, мы соберём три экрана под неё и покажем на короткой встрече.',
  },
  {
    id: 'hiring', icon: Users, name: 'Быстро нанимают без зрелого HR',
    fit: '50–250 сотрудников · один HR-generalist · несколько вакансий',
    trigger: '5+ вакансий, новая HR-роль, стажёры, массовый найм, текучесть',
    buyer: 'собственник · CEO · HRD · руководитель подбора и адаптации',
    pain: 'Первая неделя новичка держится на менеджере, одинаковые вопросы и объяснения повторяются.',
    offer: 'Визуальный маршрут первой недели: люди, правила, ссылки и следующие шаги прямо в офисе.',
    message: 'Вижу, что вы активно расширяете команду. Мы делаем визуальный онбординг внутри офиса: кто есть кто, как устроена первая неделя, правила, полезные ссылки и ответы на повторяющиеся вопросы — на экране, мимо которого человек всё равно проходит. Это не замена HR и не новый портал: Pike сам собирает и обновляет контент. Предлагаю 20 минут: разберём, где сейчас теряется время руководителей, и покажу формат под ваш офис.',
  },
];

const channels = [
  { level: '01', title: 'Настоящее тепло', icon: UserRound, items: ['Клиенты Pike/СТВ по видео и брендингу', 'Знакомые собственников и команды', 'Текущие подрядчики клиентов по офису и HR'], action: '10 контактов сегодня' },
  { level: '02', title: 'Событие покупки', icon: MapPin, items: ['Новости «открыли офис/филиал/точку»', 'Портфолио архитекторов и fit-out студий', 'hh.ru: массовый найм и новые HR-роли'], action: '10 компаний за день' },
  { level: '03', title: 'Партнёрский вход', icon: Network, items: ['Офисные брокеры и сервисные офисы', 'AV-интеграторы и продавцы экранов', 'HR-агентства и франчайзинговые консультанты'], action: '3 партнёрских разговора' },
  { level: '04', title: 'Контент и поиск', icon: Search, items: ['Telegram и микроблоги основателей', 'VC.ru, TenChat, VK, локальные бизнес-медиа', 'Статьи про онбординг и новый офис, не про «ТВ»'], action: 'Поддерживает, не заменяет продажи' },
];

const funnelGoal = [20, 12, 8, 4, 2, 1];
const funnelLabels = ['Подходящие компании', 'Личные входы', 'Разговоры', 'Персональные показы', 'Пилот обсуждается', 'Оплата / обязательство'];
const queryGroups = [
  ['Боль HR', 'адаптация персонала · онбординг сотрудников · снизить текучесть · информирование сотрудников'],
  ['Канал', 'внутренние коммуникации · новости компании для сотрудников · альтернатива email рассылке'],
  ['Экран', 'информационный экран в офис · контент для экранов · digital signage для офиса'],
  ['Событие', 'открытие нового офиса · коммуникация между филиалами · единые стандарты для филиалов'],
];

function CopyButton({ text, label = 'Скопировать сообщение' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1500); };
  return <Button onClick={copy} variant="outline" size="lg" className="h-10 border-white/15 bg-white/5 px-4 text-white hover:bg-white/10">{copied ? <Check /> : <Copy />}{copied ? 'Готово' : label}</Button>;
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mb-7 grid gap-4 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="mb-3 text-[11px] font-black uppercase tracking-[.2em] text-primary">{eyebrow}</p><h2 className="text-3xl font-black tracking-[-.04em] sm:text-5xl">{title}</h2></div><p className="text-sm leading-6 text-zinc-400">{text}</p></div>;
}

export default function Home() {
  const [done, setDone] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('pike-first-sale-v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [active, setActive] = useState('office');
  const [funnel, setFunnel] = useState([20, 0, 0, 0, 0, 0]);

  useEffect(() => { window.localStorage.setItem('pike-first-sale-v2', JSON.stringify(done)); }, [done]);

  const segment = segments.find((item) => item.id === active) ?? segments[0];
  const progress = Math.round((done.length / tasks.length) * 100);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 lg:px-8"><a href="#focus" className="flex items-center gap-3"><span className="h-3 w-3 bg-primary" /><span className="text-sm font-black tracking-[.18em]">PIKE MEDIA LAB</span></a><span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Первая продажа · v2</span></div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 lg:hidden">{nav.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-zinc-400 hover:bg-primary hover:text-black">{label}</a>)}</nav>
      </header>

      <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block"><div className="sticky top-24"><p className="mb-4 text-[11px] font-black uppercase tracking-[.18em] text-zinc-600">Навигация</p><nav className="space-y-1 text-sm">{nav.map(([id, label], index) => <a key={id} href={`#${id}`} className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition ${index === 0 ? 'bg-primary font-black text-black' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}><span>{label}</span><ChevronRight size={14} className="opacity-0 transition group-hover:opacity-100" /></a>)}</nav><div className="mt-8 rounded-2xl border border-white/10 bg-card p-4"><div className="mb-3 flex items-center justify-between text-xs"><span className="text-zinc-500">Запуск</span><strong>{progress}%</strong></div><Progress value={progress} /><p className="mt-3 text-xs leading-5 text-zinc-500">Четыре действия до первой волны.</p></div></div></aside>

        <div className="min-w-0 space-y-24 pb-20">
          <section id="focus" className="scroll-mt-28">
            <div className="mb-8 grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end"><div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-primary">Не исследование по кругу · идём в продажу</p><h1 className="max-w-5xl text-4xl font-black leading-[.94] tracking-[-.06em] sm:text-6xl xl:text-7xl">Небольшие компании.<br /><span className="text-zinc-600">Свежий повод. Две встречи до пилота.</span></h1></div><p className="text-sm leading-6 text-zinc-400">Фокус: 30–300 сотрудников, 2–20 точек или один новый офис. Покупатель рядом, инфраструктура простая, запуск можно согласовать без корпоративного марафона.</p></div>
            <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
              <article className="rounded-3xl bg-primary p-6 text-black sm:p-8"><div className="mb-10 flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-black uppercase tracking-[.16em]">Следующие 24 часа</span><span className="rounded-full bg-black/10 px-3 py-1 text-xs font-black">20 компаний</span></div><h2 className="max-w-2xl text-2xl font-black tracking-tight sm:text-4xl">10 тёплых контактов + 10 компаний со свежим событием</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-black/65">Не ждать агентство и SEO. Поднять клиентов Pike/СТВ, знакомых и партнёров; добавить тех, кто прямо сейчас открыл офис, филиал или быстро нанимает.</p><a href="#signals" className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-black px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black/80">Где их находить <ArrowRight size={16} /></a></article>
              <article className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-[11px] font-black uppercase tracking-[.16em] text-zinc-500">Чек-лист запуска</p><div className="mt-3 text-5xl font-black">{done.length}<span className="text-zinc-700"> / {tasks.length}</span></div></div><Target className="text-primary" /></div><div className="mt-6">{tasks.map((task, index) => <button key={task} onClick={() => setDone(done.includes(index) ? done.filter((item) => item !== index) : [...done, index])} className="group flex w-full items-start gap-3 border-t border-white/10 py-3 text-left"><CheckCircle2 size={19} className={`mt-0.5 shrink-0 ${done.includes(index) ? 'fill-primary text-primary' : 'text-zinc-700 group-hover:text-primary'}`} /><span className={`text-sm font-bold leading-5 ${done.includes(index) ? 'text-zinc-500 line-through' : 'text-white'}`}>{task}</span></button>)}</div></article>
            </div>
          </section>

          <section id="product" className="scroll-mt-28">
            <Heading eyebrow="Что продаём" title="Живая газета, а не телевизор" text="Pike берёт на себя запуск и редакцию. Софт и оборудование — отдельная прозрачная строка; основная ценность в том, что канал не умирает через месяц." />
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]"><article className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"><Sparkles className="text-primary" /><h3 className="mt-10 max-w-2xl text-3xl font-black leading-tight">Новости, люди, правила и онбординг — на экране, который сотрудник видит сам.</h3><div className="mt-8 grid gap-3 sm:grid-cols-2">{['1–3 существующих экрана', 'Готовая визуальная система', '12–16 материалов за пилот', 'QR и измеримое действие', 'Центральный + локальный блок', 'Pike ведёт редакцию'].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl bg-black p-4 text-sm font-bold"><Check size={16} className="text-primary" />{item}</div>)}</div></article><article className="rounded-3xl bg-white p-6 text-black sm:p-8"><MailX /><h3 className="mt-10 text-2xl font-black">Не заменяет почту, Telegram и портал</h3><p className="mt-3 text-sm leading-6 text-zinc-600">Экран выносит 3–5 вещей, которые нельзя потерять в потоке, и ведёт по QR к деталям. Это видимый слой приоритета, а не новая библиотека документов.</p><div className="mt-8 border-t border-black/10 pt-5 text-sm font-bold">Критерий успеха: человек сделал нужное действие, а не просто прошёл мимо красивого ролика.</div></article></div>
          </section>

          <section id="segments" className="scroll-mt-28">
            <Heading eyebrow="Три покупаемые ситуации" title="Клиент определяется событием" text="Отрасль вторична. Нам важнее момент, когда у компании уже есть бюджет, внимание руководства и необходимость быстро объяснить что-то людям." />
            <div className="grid gap-3 md:grid-cols-3">{segments.map(({ id, icon: Icon, name }) => <button key={id} onClick={() => setActive(id)} className={`rounded-2xl border p-5 text-left transition ${active === id ? 'border-primary bg-primary text-black' : 'border-white/10 bg-card hover:border-primary/50'}`}><Icon size={22} /><strong className="mt-8 block text-lg leading-tight">{name}</strong></button>)}</div>
            <article className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-card"><div className="grid lg:grid-cols-[.95fr_1.05fr]"><div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-8"><p className="text-[11px] font-black uppercase tracking-[.16em] text-primary">Кого берём</p><p className="mt-3 text-sm font-bold leading-6">{segment.fit}</p><div className="mt-7 space-y-5 text-sm leading-6"><div><span className="text-zinc-600">Триггер</span><p className="text-zinc-300">{segment.trigger}</p></div><div><span className="text-zinc-600">Кто решает</span><p className="text-zinc-300">{segment.buyer}</p></div><div><span className="text-zinc-600">Боль</span><p className="text-xl font-black leading-snug text-white">{segment.pain}</p></div></div></div><div className="p-6 lg:p-8"><p className="text-[11px] font-black uppercase tracking-[.16em] text-primary">Оффер</p><p className="mt-3 text-xl font-black leading-snug">{segment.offer}</p><div className="mt-8 flex items-center justify-between gap-3"><p className="text-[11px] font-black uppercase tracking-[.16em] text-zinc-600">Первое сообщение</p><CopyButton text={segment.message} /></div><p className="mt-5 text-sm leading-6 text-zinc-400">«{segment.message}»</p></div></div></article>
          </section>

          <section id="signals" className="scroll-mt-28">
            <Heading eyebrow="Каналы входа" title="Тепло создаёт событие" text="Соцсети и микроблоги нужны не для массового охвата, а чтобы заметить рост компании и написать в контексте конкретного события." />
            <div className="grid gap-4 md:grid-cols-2">{channels.map(({ level, title, icon: Icon, items, action }) => <article key={title} className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"><div className="flex items-center justify-between"><span className="font-mono text-xs text-primary">{level}</span><Icon className="text-primary" /></div><h3 className="mt-8 text-2xl font-black">{title}</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item} className="flex gap-2"><Check size={15} className="mt-1 shrink-0 text-primary" />{item}</li>)}</ul><div className="mt-6 rounded-xl bg-black px-4 py-3 text-xs font-black text-zinc-300">{action}</div></article>)}</div>
          </section>

          <section id="funnel" className="scroll-mt-28">
            <Heading eyebrow="10 рабочих дней" title="Воронка до сделки" text="Каждая стадия требует факта. «Интересно» и «пришлите презентацию» не считаются — нужен следующий шаг клиента." />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{funnel.map((value, index) => <article key={funnelLabels[index]} className="rounded-2xl border border-white/10 bg-card p-4"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-zinc-600">Цель {funnelGoal[index]}</span><button aria-label={`Увеличить ${funnelLabels[index]}`} onClick={() => setFunnel((values) => values.map((item, i) => i === index ? item + 1 : item))} className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-primary"><Plus size={14} /></button></div><div className="mt-5 text-3xl font-black">{value}<span className="text-base text-zinc-700"> / {funnelGoal[index]}</span></div><p className="mt-2 min-h-10 text-xs font-bold leading-4 text-zinc-400">{funnelLabels[index]}</p></article>)}</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2"><article className="rounded-3xl border border-white/10 p-6"><p className="text-xs font-black uppercase tracking-[.16em] text-primary">Встреча 1 · 20 минут</p><h3 className="mt-4 text-xl font-black">Недавняя потеря информации</h3><p className="mt-3 text-sm leading-6 text-zinc-500">Как сейчас сообщают новости и правила? Что недавно пришлось повторять? Что происходит с новичком? Кто владеет процессом и бюджетом?</p></article><article className="rounded-3xl bg-primary p-6 text-black"><p className="text-xs font-black uppercase tracking-[.16em]">Встреча 2 · 35 минут</p><h3 className="mt-4 text-xl font-black">Три экрана именно под клиента</h3><p className="mt-3 text-sm leading-6 text-black/65">Один onboarding-сценарий, один операционный сценарий, площадка, цена и метрика. Одностраничное предложение — в тот же день.</p></article></div>
          </section>

          <section id="search" className="scroll-mt-28">
            <Heading eyebrow="Поиск и география" title="Люди ищут боль, не «Стенгазету»" text="Проверка Google Trends по России за последние 12 месяцев: точные продуктовые формулировки слишком редкие для устойчивой региональной картины." />
            <div className="grid gap-4 lg:grid-cols-[.75fr_1.25fr]"><article className="rounded-3xl bg-primary p-6 text-black sm:p-8"><p className="text-xs font-black uppercase tracking-[.16em]">Средний относительный индекс</p><div className="mt-8 space-y-5">{[['внутренние коммуникации', '4'], ['онбординг сотрудников', '1'], ['корпоративное телевидение', '0'], ['информирование персонала', '0'], ['экраны в офис', '0']].map(([label, value]) => <div key={label} className="flex items-end justify-between border-b border-black/15 pb-3"><span className="text-sm font-bold">{label}</span><strong className="text-3xl">{value}</strong></div>)}</div><p className="mt-6 text-xs leading-5 text-black/60">Относительная, не абсолютная частота. По низкочастотным фразам региональные выводы ненадёжны.</p></article><article className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"><h3 className="text-2xl font-black">Четыре семейства запросов</h3><div className="mt-6 space-y-5">{queryGroups.map(([title, text]) => <div key={title} className="border-t border-white/10 pt-4"><span className="text-xs font-black text-primary">{title}</span><p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p></div>)}</div><div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs leading-5 text-amber-200">Яндекс Вордстат требует авторизацию. Количественные частоты и геоиндекс не подменяем догадкой; для замера подготовлены фразы и список городов.</div></article></div>
          </section>

          <section id="price" className="scroll-mt-28">
            <Heading eyebrow="Ценовая гипотеза" title="Цена за готовый запуск" text="Российский софт для экранов стоит от 943 ₽ в месяц или 19 900 ₽ бессрочно за экран. Поэтому Pike продаёт не плеер, а редакцию, контент и работающий сценарий." />
            <div className="grid gap-4 lg:grid-cols-2">{[{name:'Новый офис',price:'69 000 ₽',scope:'1 офис · до 3 экранов · 4 недели',items:['визуальная система и рубрики','до 12 материалов','онбординг + новости + QR','итоговый отчёт']},{name:'Небольшая сеть',price:'99 000 ₽',scope:'3 филиала · до 6 экранов · 4 недели',items:['центральный и локальные блоки','до 16 материалов','onboarding + операционный сценарий','расчёт тиражирования']}].map((plan) => <article key={plan.name} className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"><CircleDollarSign className="text-primary" /><p className="mt-8 text-sm font-black text-zinc-500">{plan.name}</p><div className="mt-2 text-4xl font-black tracking-tight text-primary">{plan.price}</div><p className="mt-2 text-sm text-zinc-400">{plan.scope}</p><ul className="mt-6 space-y-3 text-sm text-zinc-300">{plan.items.map((item) => <li key={item} className="flex gap-2"><Check size={16} className="text-primary" />{item}</li>)}</ul></article>)}</div>
            <div className="mt-4 rounded-2xl border border-white/10 p-5 text-sm leading-6 text-zinc-400"><strong className="text-white">Оборудование и софт — отдельно.</strong> Если экранов нет, сначала считаем аренду/покупку и монтаж; не прячем железо в цену контента. После первых 6–8 разговоров тестируем верхнюю вилку 89/129 тыс. ₽.</div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between"><span>PIKE MEDIA LAB · Стенгазета 2.0</span><span>Обновлено 2 сентября 2026</span></footer>
        </div>
      </div>
    </main>
  );
}
