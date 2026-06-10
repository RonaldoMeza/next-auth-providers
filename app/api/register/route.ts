import { createUser } from "@/lib/users"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return Response.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    const user = createUser(name, email, password)

    return Response.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al registrar usuario"
    return Response.json({ error: message }, { status: 400 })
  }
}
