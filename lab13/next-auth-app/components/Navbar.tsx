"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          KQ<span className="text-blue-500">.</span>
          <span className="ml-2 text-xs font-normal text-neutral-500">AUTH PLATFORM</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link href="/" className="hidden text-neutral-400 transition hover:text-white sm:block">Inicio</Link>

          {status === "loading" ? (
            <span className="text-neutral-500">Cargando...</span>
          ) : session ? (
            <>
              <Link href="/dashboard" className="text-neutral-300 hover:text-white">Dashboard</Link>
              <Link href="/profile" className="text-neutral-300 hover:text-white">Perfil</Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/signIn" className="rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-neutral-200">
              Iniciar sesión ↗
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
