export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signIn");

  return (
    <section className="rounded-xl bg-white p-8 shadow">
      <h1 className="mb-3 text-3xl font-bold">Dashboard</h1>
      <p>¡Bienvenido, {session.user?.name}!</p>
      <p className="mt-2 text-slate-600">
        Has iniciado sesión correctamente con Google.
      </p>
    </section>
  );
}
