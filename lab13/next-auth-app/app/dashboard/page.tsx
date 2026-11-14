export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signIn");

  return (
    <section className="relative min-h-[75vh] overflow-hidden rounded-3xl border border-white/10 bg-[#080b12] p-8 text-white shadow-2xl sm:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          Panel de usuario
        </span>

        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-5xl">
          ¡Bienvenido,
          <span className="mt-2 block break-words text-blue-400">
            {session.user?.name || "usuario"}!
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
          Has iniciado sesión correctamente. Desde aquí puedes acceder a tu
          espacio personal y administrar tu perfil.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Sesión activa
          </p>
          <p className="mt-2 break-all text-sm text-white sm:text-base">
            {session.user?.email || "Correo no disponible"}
          </p>
          <p className="mt-3 text-sm text-emerald-400">
            ● Autenticación correcta
          </p>
        </div>
      </div>
    </section>
  );
}
