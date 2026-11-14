"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.ok) {
        window.location.href = "/dashboard";
      } else {
        setError(
          "No se pudo iniciar sesión. Verifica tus datos o comprueba si tu cuenta está bloqueada temporalmente."
        );
      }
    } catch {
      setError("Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black px-5 py-16 text-white">
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 block text-center text-sm text-neutral-400 hover:text-white">
          ← Volver al inicio
        </Link>

        <div className="glass-card rounded-3xl p-8 shadow-[0_0_80px_rgba(0,112,243,0.08)] sm:p-10">
          <div className="mb-8">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl text-blue-400">
              ◈
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-blue-400">
              Welcome back
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Inicia sesión.
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Accede a tu espacio personal de forma segura.
            </p>
          </div>

          <form onSubmit={handleCredentials} className="space-y-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs leading-5 text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Ingresar con correo"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-neutral-400">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
              Regístrate aquí
            </Link>
          </p>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-neutral-500">O CONTINÚA CON</span>
            <div className="h-px flex-1 bg-white/10" />
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

          <p className="mt-7 text-center text-xs leading-6 text-neutral-500">
            Autenticación protegida mediante NextAuth.js.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          LAB 13 · NEXTAUTH.JS · AUTHENTICATION
        </p>
      </div>
    </main>
  );
}
