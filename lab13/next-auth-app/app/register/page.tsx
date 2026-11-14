"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push("/signIn?registered=1");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black px-5 py-12 text-white">
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative w-full max-w-md">
        <Link href="/signIn" className="mb-8 block text-center text-sm text-neutral-400 hover:text-white">
          ← Volver al inicio de sesión
        </Link>

        <div className="glass-card rounded-3xl p-8 shadow-[0_0_80px_rgba(0,112,243,0.08)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">
            Create account
          </p>

          <h1 className="mt-3 text-3xl font-semibold">Crea tu cuenta.</h1>

          <p className="mt-3 text-sm text-neutral-400">
            Regístrate para acceder a tu espacio personal.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />

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
              placeholder="Contraseña (mínimo 8 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
