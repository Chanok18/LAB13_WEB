import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { users } from "../../../lib/users";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return NextResponse.json(
        { message: "Completa los campos. La contraseña debe tener al menos 8 caracteres." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (users.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "Este correo ya está registrado." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    users.set(normalizedEmail, {
      id: randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      failedAttempts: 0,
      lockedUntil: null,
    });

    return NextResponse.json(
      { message: "Cuenta creada correctamente." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "No se pudo completar el registro." },
      { status: 500 }
    );
  }
}
