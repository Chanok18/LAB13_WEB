export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signIn");

  return (
    <section className="rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold">Mi perfil</h1>
      {session.user?.image && (
        <Image
          src={session.user.image}
          alt="Foto de perfil"
          width={100}
          height={100}
          className="mb-4 rounded-full"
        />
      )}
      <p><strong>Nombre:</strong> {session.user?.name}</p>
      <p><strong>Correo:</strong> {session.user?.email}</p>
    </section>
  );
}
