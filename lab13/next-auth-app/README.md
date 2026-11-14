
# KQ Auth Platform — Lab 13

Aplicación web desarrollada con Next.js y NextAuth.js para implementar diferentes métodos de autenticación, gestión de sesiones y protección de rutas.

## Descripción

Este proyecto corresponde al Laboratorio 13 del curso Desarrollo de Aplicaciones Web Avanzado de TECSUP.

Permite iniciar sesión mediante Google, GitHub y credenciales tradicionales (correo y contraseña). También incorpora un formulario de registro, validación de contraseñas y bloqueo temporal después de varios intentos fallidos.

## Funcionalidades

- Inicio de sesión con Google OAuth.
- Inicio de sesión con GitHub OAuth.
- Registro de usuarios mediante correo y contraseña.
- Autenticación con CredentialsProvider de NextAuth.js.
- Hash de contraseñas mediante bcryptjs.
- Bloqueo temporal después de 5 intentos fallidos durante 15 minutos.
- Gestión de sesiones con NextAuth.js.
- Protección de rutas privadas como Dashboard y Perfil.
- Interfaz responsive con tema oscuro.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- NextAuth.js 4
- Tailwind CSS 4
- bcryptjs
- React Icons
- Google OAuth 2.0
- GitHub OAuth

## Requisitos

- Node.js 20 o superior.
- npm.
- Credenciales OAuth de Google y GitHub.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Chanok18/LAB13_WEB.git
cd LAB13_WEB
```

Instala las dependencias:

```bash
npm install
```

Crea el archivo `.env.local` en la raíz del proyecto y configura las variables indicadas en `.env.example`.

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre:

http://localhost:3000

## Variables de entorno

El proyecto utiliza las siguientes variables:

| Variable | Descripción |
|---|---|
| NEXTAUTH_URL | URL base de la aplicación |
| NEXTAUTH_SECRET | Clave secreta para NextAuth |
| GOOGLE_CLIENT_ID | ID de cliente OAuth de Google |
| GOOGLE_CLIENT_SECRET | Secreto OAuth de Google |
| GITHUB_CLIENT_ID | ID de cliente OAuth de GitHub |
| GITHUB_CLIENT_SECRET | Secreto OAuth de GitHub |

No publiques el archivo `.env.local` ni compartas tus secretos.

## Configuración OAuth

Configura las siguientes URLs de callback en las aplicaciones OAuth:

Google:

`https://TU-DOMINIO/api/auth/callback/google`

GitHub:

`https://TU-DOMINIO/api/auth/callback/github`

Para desarrollo local utiliza:

`http://localhost:3000/api/auth/callback/google`

`http://localhost:3000/api/auth/callback/github`

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página principal |
| `/signIn` | Inicio de sesión |
| `/register` | Registro de usuarios |
| `/dashboard` | Panel privado |
| `/profile` | Perfil del usuario |
| `/api/auth/*` | Endpoints de NextAuth |
| `/api/register` | API de registro |

## Seguridad

Las contraseñas de los usuarios registrados se procesan mediante bcryptjs antes de almacenarse.

Después de cinco intentos fallidos de autenticación, la cuenta se bloquea temporalmente durante quince minutos.

Las rutas privadas requieren una sesión válida.

## Almacenamiento temporal

Para este laboratorio, los usuarios registrados y sus intentos de inicio de sesión se almacenan temporalmente en memoria mediante un `Map`.

Por esta razón, los registros y bloqueos se pierden al reiniciar el servidor. Este mecanismo es únicamente para pruebas locales y no es adecuado para producción ni para un despliegue serverless como Vercel. Para producción se debe integrar una base de datos persistente.

## Despliegue

El proyecto puede importarse desde GitHub en Vercel.

Antes del despliegue:

1. Configura las variables de entorno en Vercel.
2. Actualiza `NEXTAUTH_URL` con el dominio de producción.
3. Registra las URLs de callback de Google y GitHub con el dominio de Vercel.
4. Genera un nuevo `NEXTAUTH_SECRET` para producción.
5. Integra almacenamiento persistente antes de utilizar el registro y CredentialsProvider en producción.

## Autor

Kevin Quispe Ccolque

TECSUP — Desarrollo de Aplicaciones Web Avanzado

Laboratorio 13 — Autenticación y Seguridad.