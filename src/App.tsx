import { profile, stack, experience } from "./data/profile";
import { projects } from "./data/projects";
import { useEffect, useState, type ReactNode } from "react";

type ThemePreference = "system" | "light" | "dark";

const navItems = [
  { id: "projetos", label: "Projetos" },
  { id: "stack", label: "Stack" },
  { id: "experiencia", label: "Experiência" },
  { id: "contato", label: "Contato" },
];

const Section = ({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24"
  >
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Tag = ({
  children,
  strong,
}: {
  children: ReactNode;
  strong?: boolean;
}) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      strong
        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
        : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
    }`}
  >
    {children}
  </span>
);

function ThemeSelector() {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    const saved = localStorage.getItem("theme") as ThemePreference | null;
    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark =
        preference === "dark" || (preference === "system" && media.matches);
      document.documentElement.classList.toggle("dark", isDark);
    };

    applyTheme();

    if (preference === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [preference]);

  const changeTheme = (value: ThemePreference) => {
    setPreference(value);
    localStorage.setItem("theme", value);
  };

  return (
    <div
      role="group"
      aria-label="Selecionar tema"
      className="flex items-center rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
    >
      <button
        type="button"
        onClick={() => changeTheme("light")}
        title="Modo Claro"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          preference === "light"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => changeTheme("system")}
        title="Tema do Sistema"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          preference === "system"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => changeTheme("dark")}
        title="Modo Escuro"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          preference === "dark"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanEmail = profile.links.email.replace(/^mailto:/, "");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      {/* Header Melhorado */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#"
            className="group flex items-center font-mono text-base font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <span className="text-slate-400 transition-colors group-hover:text-emerald-500">~/</span>
            Matheuscrz
            <span className="text-emerald-500">.</span>
          </a>

          {/* Links Desktop - Estilo Pill Flutuante */}
          <div className="hidden items-center gap-1 rounded-full border border-slate-200/90 bg-white/80 p-1.5 shadow-sm backdrop-blur-md md:flex dark:border-slate-800 dark:bg-slate-900/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeSelector />

            {/* Botão Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menu Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Seção Hero */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:pb-24">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300">
              {profile.location}
            </p>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-5 text-xl font-medium text-emerald-600 dark:text-emerald-400 sm:text-2xl">
              {profile.title}
            </p>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              {profile.subtitle}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {profile.about}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projetos"
                className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
              >
                Ver projetos
              </a>
              <a
                href="#contato"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
              >
                Entrar em contato
              </a>
            </div>
          </div>

          <div className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/20 lg:block">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Atualmente trabalhando com
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              Java + Spring Boot
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag strong>FullStack</Tag>
              <Tag strong>APIs REST</Tag>
              <Tag strong>Docker</Tag>
              <Tag strong>React</Tag>
              <Tag strong>Jenkins</Tag>
            </div>
          </div>
        </section>

        {/* Projetos */}
        <Section id="projetos" eyebrow="Trabalho" title="Projetos em destaque">
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-700 dark:text-amber-300">
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {project.summary}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="text-emerald-500">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-7 flex gap-5 text-sm">
                  {project.repo && (
                    <a
                      className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Código →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Stack */}
        <Section id="stack" eyebrow="Tecnologias" title="Minha stack">
          <div className="grid gap-6 md:grid-cols-3">
            {stack.map((group) => (
              <div
                key={group.group}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                  {group.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item} strong={group.main}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experiência */}
        <Section
          id="experiencia"
          eyebrow="Carreira"
          title="Experiência profissional"
        >
          <ol className="relative border-l border-slate-300 dark:border-slate-700">
            {experience.map((item) => (
              <li key={item.role + item.period} className="mb-10 ml-6">
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-8 ring-slate-50 dark:ring-slate-950" />
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {item.period}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.org}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        {/* Seção Contato Reformulada */}
        <Section
          id="contato"
          eyebrow="Conexão"
          title="Vamos conversar?"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/60">
            {/* Status Disponibilidade */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Disponível para novos projetos e oportunidades
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                  Tem uma ideia ou oportunidade em mente?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Fique à vontade para me mandar uma mensagem para falar sobre desenvolvimento backend, arquitetura de sistemas ou cooperação técnica.
                </p>
              </div>

              {/* Botão Copiar Email Rápido */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar e-mail</span>
                  </>
                )}
              </button>
            </div>

            {/* Grid de Canais de Contato */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* Card E-mail */}
              <a
                href={profile.links.email}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-emerald-500/30"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    E-mail
                  </h4>
                  <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                    {cleanEmail}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-emerald-600 group-hover:underline dark:text-emerald-400">
                  Escrever mensagem →
                </span>
              </a>

              {/* Card LinkedIn */}
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-emerald-500/30"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    LinkedIn
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Rede profissional e conexões
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-emerald-600 group-hover:underline dark:text-emerald-400">
                  Conectar perfil →
                </span>
              </a>

              {/* Card GitHub */}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-emerald-500/30"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    GitHub
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Repositórios e contribuições
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-emerald-600 group-hover:underline dark:text-emerald-400">
                  Explorar código →
                </span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}