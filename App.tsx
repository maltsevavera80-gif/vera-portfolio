import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const TG = "https://t.me/VeraMalceva";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`btn-arrow ${className}`} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function Label({ n, children, dark = false }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] ${dark ? "text-white/60" : "text-ink/60"}`}>
      <span className={`${dark ? "text-white" : "text-ink"} text-base tracking-normal font-display`}>{n}</span>
      <span className="opacity-50">/ 06</span>
      <span className={`h-px w-10 ${dark ? "bg-white/30" : "bg-ink/30"}`} />
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* header                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  const [p, setP] = useState(0);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
      setSolid(h.scrollTop > 40);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-ivory/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.25em]">
          <Star className="spin-star h-3.5 w-3.5 text-accent" />
          Вера <span className="hidden text-ink/40 sm:inline">/ content creator</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#services" className="link-sweep">Услуги</a>
          <a href="#process" className="link-sweep">Как работаем</a>
          <a href="#faq" className="link-sweep">Вопросы</a>
        </nav>
        <a
          href={TG}
          target="_blank"
          rel="noreferrer"
          className="btn flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-ivory transition-colors hover:bg-accent hover:text-ink"
        >
          Написать <Arrow />
        </a>
      </div>
      <div className="h-[2px] w-full bg-transparent">
        <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${p})` }} />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

function HeroCard() {
  const items = [
    { t: "Тексты и сценарии", w: 0.92 },
    { t: "Reels и видео", w: 0.7 },
    { t: "Упаковка аккаунта", w: 0.85 },
    { t: "Сайт-визитка", w: 0.55 },
  ];
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* rotating badge */}
      <div className="absolute -left-6 -top-10 z-20 h-28 w-28 sm:-left-12 sm:h-32 sm:w-32">
        <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
          <defs>
            <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fontSize="10.5" letterSpacing="3.2" fill="#252525" fontFamily="Inter" fontWeight="500">
            <textPath href="#circ">CONTENT · DESIGN · STRATEGY · </textPath>
          </text>
        </svg>
        <Star className="spin-star absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-accent" />
      </div>

      {/* main dark card */}
      <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-ivory shadow-[0_40px_80px_-30px_rgba(37,37,37,0.55)] sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
        <div className="scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/50">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <span>content-plan.ai</span>
        </div>

        <div className="relative mt-8 font-display text-3xl leading-tight sm:text-4xl">
          Контент-план
          <span className="blink ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.1em] bg-accent" />
          <div className="mt-1 text-lg text-white/50 sm:text-xl">на месяц · 30 дней</div>
        </div>

        <ul className="relative mt-8 space-y-5">
          {items.map((it, i) => (
            <li key={it.t} className="check-in" style={{ "--d": `${1.1 + i * 0.25}s` } as CSSProperties}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-ink">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  </span>
                  {it.t}
                </span>
                <span className="font-mono text-xs text-white/40">0{i + 1}</span>
              </div>
              <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div
                  className="bar h-full rounded-full bg-accent"
                  style={{ "--w": it.w, "--d": `${1.3 + i * 0.25}s` } as CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* floating reels chip */}
      <div className="float absolute -bottom-8 -right-3 z-20 flex items-center gap-3 rounded-2xl border border-ink/10 bg-ivory px-4 py-3 shadow-xl sm:-right-10" style={{ "--d": "0.4s" } as CSSProperties}>
        <span className="pulse-ring flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink">
          <svg viewBox="0 0 16 16" className="h-4 w-4 translate-x-[1px]" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Reels</div>
          <div className="font-mono text-[11px] text-grey">9:16 · 0:15</div>
        </div>
      </div>

      {/* handwritten */}
      <div className="fade-up absolute -bottom-16 left-0 hidden rotate-[-6deg] sm:block" style={{ "--d": "2s" } as CSSProperties}>
        <span className="font-hand text-3xl text-accent">просто и по делу</span>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - r.left - 200}px, ${e.clientY - r.top - 200}px)`;
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-bg absolute inset-0" />
      <div
        ref={glow}
        className="pointer-events-none absolute left-0 top-0 hidden h-[400px] w-[400px] rounded-full bg-accent/25 blur-3xl transition-transform duration-[900ms] ease-out md:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-5 pb-28 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:pb-36">
        <div>
          <div className="fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-ivory/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent pulse-ring" />
            Открыта запись на пилот
          </div>

          <h1 className="font-display text-[clamp(2.9rem,8.4vw,7.2rem)] uppercase leading-[0.95] tracking-tight">
            <span className="mask-line"><span style={{ "--d": "100ms" } as CSSProperties}>Контент</span></span>
            <span className="mask-line"><span style={{ "--d": "220ms" } as CSSProperties}>для вашего</span></span>
            <span className="mask-line text-accent">
              <span style={{ "--d": "340ms" } as CSSProperties}>
                бизнеса<span className="text-ink">.</span>
              </span>
            </span>
          </h1>

          <p className="fade-up mt-10 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg" style={{ "--d": "800ms" } as CSSProperties}>
            Тексты, Reels, упаковка аккаунта и сайты для кафе, шоурумов, студий красоты и мастерских.{" "}
            <span className="text-ink">Делаю с помощью ИИ, объясняю простыми словами.</span>
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={{ "--d": "1000ms" } as CSSProperties}>
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="btn group flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all hover:bg-ink hover:text-ivory"
            >
              Написать <Arrow />
            </a>
            <a
              href="#services"
              className="rounded-full border border-ink/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] transition-all hover:border-ink hover:bg-ink hover:text-ivory"
            >
              Посмотреть услуги
            </a>
          </div>

          {/* scribble */}
          <svg viewBox="0 0 200 60" className="mt-8 hidden h-14 w-44 text-accent sm:block" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="draw" style={{ "--d": "1.6s" } as CSSProperties} d="M4 8c40 4 90 10 110 30 8 8-10 14-14 2s30-22 70 4M170 28l16 12-4-20" />
          </svg>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* marquee                                                             */
/* ------------------------------------------------------------------ */

function Marquee() {
  const words = ["Тексты", "Reels", "Упаковка аккаунта", "Сайты", "Контент-план", "Визуал"];
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <div key={w} className="flex items-center">
          <span className="px-8 font-display text-2xl uppercase tracking-wide sm:text-3xl">{w}</span>
          <Star className="h-4 w-4 text-accent" />
        </div>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden bg-ink py-5 text-ivory">
      <div className="marquee flex w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* pain                                                                */
/* ------------------------------------------------------------------ */

function Pain() {
  const pains = [
    "Некогда вести аккаунт: то клиенты, то поставки, то смена",
    "Не знаете, о чём писать, и пост висит в черновиках неделю",
    "Профиль выглядит как собранный из разных миров",
    "Страшно выглядеть непрофессионально",
  ];
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="grid-bg-dark absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal><Label n="01" dark>Знакомо?</Label></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 max-w-4xl font-display text-4xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Когда соцсети съедают <span className="text-accent">время,</span> нужное делу
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {pains.map((p, i) => (
            <Reveal key={p} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/70 hover:bg-white/[0.06] sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-white/20 transition-colors group-hover:bg-accent" />
                </div>
                <p className="mt-10 text-lg leading-snug sm:text-xl">{p}</p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="relative mt-4 overflow-hidden rounded-2xl bg-accent p-8 text-ink sm:p-12">
            <Star className="spin-star absolute -right-6 -top-6 h-28 w-28 text-ink/10" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <p className="font-display text-3xl uppercase leading-tight sm:text-5xl">Это решаемо.</p>
              <p className="max-w-md text-lg leading-snug sm:text-xl">
                И не требует превращаться в блогера.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* services                                                            */
/* ------------------------------------------------------------------ */

type Service = {
  name: string;
  price: string;
  desc: string;
  tone: "accent" | "light" | "dark";
  badge?: string;
  span?: boolean;
};

const services: Service[] = [
  {
    name: "Пилот",
    price: "2–5 тыс. ₽",
    desc: "Контент-план на месяц и 4 готовых поста с визуалом. Для первых проектов: взамен прошу честный отзыв и разрешение показать результат.",
    tone: "accent",
    badge: "3 места",
    span: true,
  },
  {
    name: "Упаковка аккаунта",
    price: "7–15 тыс. ₽",
    desc: "Шапка профиля, описание, хайлайты, обложки, единый стиль.",
    tone: "light",
  },
  {
    name: "Контент на месяц",
    price: "15–25 тыс. ₽",
    desc: "8 публикаций: карусели и Reels. Тексты, визуал, подписи.",
    tone: "light",
  },
  {
    name: "Под ключ",
    price: "от 30 тыс. ₽/мес",
    desc: "Упаковка, контент-план, публикации, базовая аналитика.",
    tone: "dark",
  },
  {
    name: "Сайт-визитка",
    price: "10–20 тыс. ₽",
    desc: "Простой одностраничный сайт на ИИ-инструментах.",
    tone: "light",
  },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const tones = {
    accent: "bg-accent text-ink border-accent",
    light: "bg-white/60 text-ink border-ink/10 hover:border-ink/40",
    dark: "bg-ink text-ivory border-ink",
  };
  return (
    <Reveal delay={i * 90} className={s.span ? "lg:col-span-2" : ""}>
      <article
        className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,37,37,0.4)] sm:p-9 ${tones[s.tone]}`}
      >
        {s.tone === "accent" && (
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-ink/20 transition-transform duration-700 group-hover:scale-125" />
        )}
        {s.tone === "dark" && <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-accent/30 blur-3xl" />}

        <div className="relative flex items-start justify-between">
          <span className="font-mono text-xs opacity-60">0{i + 1} / 05</span>
          {s.badge && (
            <span className="flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-ivory">
              <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-accent" />
              {s.badge}
            </span>
          )}
        </div>

        <div className="relative mt-12">
          <h3 className="font-display text-3xl leading-tight sm:text-4xl">{s.name}</h3>
          <div className={`mt-3 text-xl font-semibold tracking-tight ${s.tone === "dark" ? "text-accent" : ""}`}>{s.price}</div>
          <p className={`mt-5 max-w-xl text-[15px] leading-relaxed ${s.tone === "dark" ? "text-white/70" : "text-ink/70"}`}>{s.desc}</p>
        </div>
      </article>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal><Label n="02">Услуги</Label></Reveal>
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
              Выберите, <br className="hidden sm:block" />
              с чего <span className="text-accent">начать</span>
            </h2>
            <span className="font-hand -rotate-3 text-3xl text-accent sm:text-4xl">один стиль — много возможностей</span>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.name} s={s} i={i} />
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 flex items-center gap-3 text-sm text-ink/60">
            <Star className="h-3 w-3 text-accent" />
            Цены ориентировочные: точная сумма зависит от задачи.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* process                                                             */
/* ------------------------------------------------------------------ */

const steps = [
  { t: "Знакомство", d: "Вы рассказываете о деле и пожеланиях." },
  { t: "План", d: "Предлагаю форматы и темы, согласуем." },
  { t: "Создание", d: "Готовлю тексты и визуал." },
  { t: "Правки", d: "Дорабатываем, пока вам не станет приятно это публиковать." },
  { t: "Публикация", d: "В пакетах, где она включена." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.65 - r.top) / r.height;
      setP(Math.min(1, Math.max(0, v)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <section id="process" className="relative border-y border-ink/10 bg-warm/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal><Label n="03">Как работаем</Label></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-4xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Пять <span className="text-accent">шагов</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 md:ml-[8%]">
          <div className="absolute bottom-6 left-[19px] top-6 w-px bg-ink/15 md:left-[27px]" />
          <div
            className="absolute left-[19px] top-6 w-px origin-top bg-accent md:left-[27px]"
            style={{ height: "calc(100% - 3rem)", transform: `scaleY(${p})` }}
          />

          <ol className="space-y-2">
            {steps.map((s, i) => {
              const active = p >= (i + 0.2) / steps.length;
              return (
                <li key={s.t}>
                  <Reveal delay={i * 60}>
                    <div className="group flex items-start gap-5 py-5 md:gap-10 md:py-7">
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500 md:h-14 md:w-14 md:text-sm ${
                          active ? "border-accent bg-accent text-ink" : "border-ink/20 bg-ivory text-ink/50"
                        }`}
                      >
                        0{i + 1}
                      </div>
                      <div className="grid flex-1 gap-2 pt-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-10 md:pt-3">
                        <h3 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl md:text-4xl">
                          {s.t}
                        </h3>
                        <p className="text-base text-ink/70 sm:text-lg">{s.d}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* faq                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Вы гарантируете рост подписчиков?",
    a: "Нет, и никто честно не может. Я делаю контент, который помогает выглядеть профессионально и объяснять, чем вы полезны. Рост зависит от многих факторов.",
  },
  {
    q: "Что нужно от меня?",
    a: "Рассказать о деле, показать, как всё выглядит (фото, меню, ассортимент), и сказать, что нравится, а что нет.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal><Label n="04">Частые вопросы</Label></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-8 font-display text-4xl uppercase leading-[1.05] sm:text-6xl">
              Честно <br />
              <span className="text-accent">отвечаю</span>
            </h2>
          </Reveal>
        </div>

        <div className="border-t border-ink/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 100}>
                <div className="border-b border-ink/15">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-display text-xl leading-snug sm:text-2xl">{f.q}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-accent bg-accent" : "border-ink/25 group-hover:border-ink"
                      }`}
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2v12M2 8h12" /></svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 text-base leading-relaxed text-ink/70 sm:text-lg">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* cta                                                                 */
/* ------------------------------------------------------------------ */

function CTA() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-24 text-ivory sm:px-12 sm:py-32">
        <div className="grid-bg-dark absolute inset-0" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
        <Star className="spin-star absolute right-[8%] top-[14%] h-8 w-8 text-accent sm:h-12 sm:w-12" />
        <Star className="float absolute bottom-[18%] left-[7%] h-5 w-5 text-accent/70" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white/50">05 / 06 — Контакт</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
              Давайте создадим <span className="text-accent">ваш контент</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-md text-lg text-white/70">
              Напишите, расскажу, что подойдёт, и задам пару вопросов.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="btn pulse-ring mt-12 inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all hover:scale-105 hover:bg-ivory"
            >
              Написать в Телеграм
              <svg viewBox="0 0 24 24" className="btn-arrow h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
                <path d="M21 3 3 10.5l6 2.5 2.5 6L21 3ZM9 13l6-4" />
              </svg>
            </a>
          </Reveal>
          <Reveal delay={400}>
            <div className="font-hand mt-10 -rotate-2 text-3xl text-accent sm:text-4xl">хороший контент — сильный бизнес</div>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-3 py-8 text-[11px] uppercase tracking-[0.2em] text-ink/50 sm:flex-row">
        <span className="flex items-center gap-2"><Star className="h-3 w-3 text-accent" /> Вера · контент-креатор</span>
        <a href={TG} target="_blank" rel="noreferrer" className="link-sweep">t.me/VeraMalceva</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Pain />
        <Services />
        <Process />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
}
