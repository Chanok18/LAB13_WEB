"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black px-5 py-16 text-white">
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 block text-center text-sm text-neutral-500 hover:text-white">
          ← Volver al inicio
        </Link>

        <div className="glass-card rounded-3xl p-8 shadow-[0_0_80px_rgba(0,112,243,0.08)] sm:p-10">
          <div className="mb-8">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl text-blue-400">◈</div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Inicia sesión.</h1>
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Accede a tu espacio personal de forma segura.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              <FaGoogle /> Continuar con Google
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FaGithub size={18} /> Continuar con GitHub
            </button>
          </div>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-neutral-600">ACCESO SEGURO</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-xs leading-6 text-neutral-500">
            Al continuar, utilizarás un proveedor de autenticación para proteger tu cuenta y tu sesión.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-600">
          LAB 13 · NEXTAUTH.JS · AUTHENTICATION
        </p>
      </div>
    </main>
  );
}
