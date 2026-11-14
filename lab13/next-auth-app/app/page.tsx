import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Acceso seguro",
    description: "Autenticación mediante proveedores confiables y protección de tus sesiones.",
  },
  {
    number: "02",
    title: "Control de sesiones",
    description: "Consulta tu perfil y administra tu acceso desde un espacio centralizado.",
  },
  {
    number: "03",
    title: "Múltiples proveedores",
    description: "Conecta tu cuenta utilizando Google, GitHub y correo electrónico.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-black text-white">
      <section className="relative px-6 pb-20 pt-24 md:px-12 md:pt-32">
        <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_15px_#0070f3]" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              NextAuth · Authentication Platform
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-7xl md:text-8xl">
            Tu acceso.<br />
            Tu espacio.<br />
            <span className="text-neutral-500">Tu control.</span>
          </h1>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base leading-7 text-neutral-400">
              Una experiencia de autenticación moderna, segura y centralizada.
              Accede a tu plataforma con total confianza.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/signIn" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200">
                Empezar ahora ↗
              </Link>
              <a href="#detalles" className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm text-white transition hover:bg-white/10">
                Explorar plataforma
              </a>
            </div>
          </div>

          <div className="relative mt-20 rounded-2xl border border-white/10 bg-[#111] p-2 shadow-[0_0_100px_rgba(0,112,243,0.12)] md:mt-24">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-neutral-500">secure-platform / dashboard</span>
              <span className="text-xs text-blue-400">● Online</span>
            </div>

            <div className="grid min-h-[390px] md:grid-cols-[190px_1fr]">
              <aside className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                <p className="mb-8 text-sm font-semibold tracking-wide">
                  KQ. <span className="text-blue-500">AUTH</span>
                </p>
                <p className="mb-3 text-[10px] uppercase tracking-widest text-neutral-600">Workspace</p>
                <div className="space-y-2 text-sm">
                  <div className="rounded-lg bg-white/10 px-3 py-2 text-white">◈ Overview</div>
                  <div className="px-3 py-2 text-neutral-500">◉ Security</div>
                  <div className="px-3 py-2 text-neutral-500">◷ Sessions</div>
                  <div className="px-3 py-2 text-neutral-500">◌ Profile</div>
                </div>
              </aside>

              <div className="grid-pattern p-5 md:p-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-neutral-500">WORKSPACE / OVERVIEW</p>
                    <h2 className="mt-2 text-2xl font-semibold">Panel de control</h2>
                  </div>
                  <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-400">
                    Sistema protegido
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Autenticación", "Activa"],
                    ["02", "Sesiones", "Protegidas"],
                    ["03", "Proveedores", "Conectados"],
                  ].map(([number, title, status]) => (
                    <div key={number} className="glass-card rounded-xl p-5">
                      <p className="text-xs text-neutral-600">{number}</p>
                      <p className="mt-5 text-sm text-neutral-300">{title}</p>
                      <p className="mt-2 text-lg font-medium">{status}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card mt-4 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Estado de seguridad</p>
                    <span className="text-xs text-blue-400">En línea</span>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[85%] rounded-full bg-blue-500 shadow-[0_0_15px_#0070f3]" />
                  </div>
                  <p className="mt-3 text-xs text-neutral-500">Vista demostrativa de la plataforma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="detalles" className="border-t border-white/10 px-6 py-28 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">Diseñado para proteger</p>
          <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
            La seguridad está en los detalles.
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-neutral-500">
            Una plataforma que integra autenticación, gestión de sesiones y diferentes métodos de acceso en una experiencia sencilla.
          </p>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.number} className="glass-card rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40">
                <span className="text-sm text-blue-400">/ {feature.number}</span>
                <h3 className="mt-10 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-500">{feature.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-sm text-neutral-500">Lab 13 · Desarrollo Web Avanzado</p>
            <Link href="/signIn" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">
              Acceder a la plataforma ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
