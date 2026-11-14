export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signIn");

  return (
    <section className="relative min-h-[70vh] overflow-hidden rounded-3xl border border-white/10 bg-[#080b12] p-8 text-white shadow-2xl sm:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          Cuenta personal
        </span>

        <h1 className="mb-8 mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Mi perfil
        </h1>

        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Foto de perfil"
              width={96}
              height={96}
              className="rounded-full border-2 border-blue-400/40 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-3xl font-bold text-blue-300">
              {(session.user?.name || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-white">
              {session.user?.name || "Usuario"}
            </h2>
            <p className="mt-2 break-all text-sm text-slate-300">
              {session.user?.email || "Correo no disponible"}
            </p>
            <span className="mt-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Cuenta autenticada
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Nombre
            </p>
            <p className="mt-2 break-words font-medium text-white">
              {session.user?.name || "No disponible"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Correo electrónico
            </p>
            <p className="mt-2 break-all font-medium text-white">
              {session.user?.email || "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
