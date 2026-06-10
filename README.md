# NextAuth App

Aplicación de autenticación con Next.js 16 y NextAuth.js v5. Soporta inicio de sesión con **Google**, **GitHub** y **credenciales** (email/contraseña) con cifrado bcrypt y bloqueo por intentos fallidos.

## Tecnologías

- **Next.js 16** — App Router, Server Components, Turbopack
- **NextAuth.js v5** — Autenticación multi-proveedor
- **Tailwind CSS v4** — Estilos
- **bcryptjs** — Cifrado de contraseñas
- **TypeScript**

## Características

- Inicio de sesión con Google OAuth
- Inicio de sesión con GitHub OAuth
- Registro e inicio de sesión con credenciales (email y contraseña)
- Contraseñas cifradas con bcrypt (10 rondas de sal)
- Bloqueo automático tras 3 intentos fallidos (15 minutos)
- Protección de rutas (`/dashboard`, `/profile`)
- Perfil de usuario con imagen y datos de sesión

## Requisitos

- Node.js 18+
- npm

## Clonar y ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/RonaldoMeza/next-auth-providers.git
cd next-auth-providers

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar el archivo de ejemplo y completar los valores
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:

```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret

NEXTAUTH_SECRET=una_clave_secreta_aleatoria
NEXTAUTH_URL=http://localhost:3000
```

```bash
# Iniciar en modo desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Obtener credenciales

### Google
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un proyecto → APIs & Services → Credentials
3. Crear OAuth 2.0 Client ID (tipo: Web application)
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### GitHub
1. Ir a **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copiar Client ID y generar un Client Secret

## Estructura del proyecto

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # Ruta de NextAuth
│   │   └── register/route.ts              # API de registro
│   ├── dashboard/page.tsx                 # Dashboard protegido
│   ├── profile/page.tsx                   # Perfil protegido
│   ├── register/page.tsx                  # Formulario de registro
│   ├── signIn/page.tsx                    # Página de inicio de sesión
│   ├── layout.tsx                         # Layout principal con nav
│   └── page.tsx                           # Redirección a /dashboard
├── components/
│   ├── LogoutButton.tsx                   # Botón de cerrar sesión
│   └── SessionProvider.tsx                # Provider de sesión cliente
├── lib/
│   └── users.ts                           # Store en memoria, bcrypt, rate limiting
├── auth.ts                                # Configuración de NextAuth
├── proxy.ts                               # Middleware de protección
└── next.config.ts                         # Configuración de Next.js
```

## Despliegue en Vercel

Conectar el repositorio a Vercel y configurar las mismas variables de entorno del `.env.local` en el dashboard de Vercel (actualizar `NEXTAUTH_URL` a la URL de producción).
