import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab 13 - NextAuth",
  description: "Autenticación y seguridad con NextAuth.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <AuthSessionProvider>
          <Navbar />
          <main className="mx-auto max-w-4xl p-6">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
