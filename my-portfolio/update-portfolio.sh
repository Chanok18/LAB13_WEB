#!/usr/bin/env bash
# Actualiza el portafolio con los datos de Kevin Quispe + formulario de contacto + SEO
# Ejecutar DENTRO de ~/my-portfolio:   bash update-portfolio.sh
set -e
cd ~/my-portfolio

# ---------- types: agregar "highlights" ----------
cat > src/types/index.ts <<'EOF'
export interface Project {
  slug: string;
  title: string;
  description: string;
  highlights?: string[];
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
}
EOF

# ---------- data.ts con la info del CV ----------
cat > src/lib/data.ts <<'EOF'
import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'aloja',
    title: 'Aloja',
    description:
      'Plataforma web de reservas y publicación de alojamientos.',
    highlights: [
      'Desarrollo de módulos de autenticación, hospedajes, reservas, pagos y reseñas.',
      'Implementación de operaciones CRUD y gestión de usuarios por roles.',
      'Uso de Git y GitHub para el control de versiones y el trabajo colaborativo.',
    ],
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    technologies: ['Autenticación', 'Reservas', 'Pagos', 'CRUD', 'Roles', 'Git'],
    featured: true,
  },
  {
    slug: 'liga-1-pro',
    title: 'Liga 1 Pro',
    description:
      'Plataforma web full-stack sobre la Liga 1 del Perú, con chat en tiempo real y predicciones con IA.',
    highlights: [
      'API REST con arquitectura en capas, autenticación JWT y control de roles.',
      'Chat en tiempo real y predicciones de partidos integrando IA.',
      'Manejo de Git para el trabajo colaborativo.',
    ],
    image:
      'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    technologies: ['API REST', 'JWT', 'Tiempo real', 'IA', 'Full-stack', 'Git'],
    featured: true,
  },
  {
    slug: 'ivera-inventario',
    title: 'IVERA - Inventario centralizado',
    description:
      'Proyecto de tesis: sistema de inventario centralizado para las ferreterías Romel y Todopernos.',
    highlights: [
      'Aplicación web y aplicación móvil en la nube para centralizar y gestionar el inventario de dos ferreterías con RUC independientes que comparten un almacén central.',
      'Integra la información de ambas tiendas y del almacén, permitiendo consultar y actualizar el stock en tiempo casi real.',
      'Funcionalidad diferenciadora: control de inventario móvil mediante lectura de códigos de barras para registrar, consultar y actualizar productos.',
    ],
    image:
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    technologies: ['App web', 'App móvil', 'Nube', 'Códigos de barras', 'Inventario'],
    featured: true,
  },
];

export const personalInfo = {
  name: 'Kevin Quispe Ccolque',
  title: 'Estudiante de Diseño y Desarrollo de Software',
  description:
    'Estudiante de Diseño y Desarrollo de Software con interés en el desarrollo backend de aplicaciones web y móviles. Experiencia en proyectos académicos con Java, Laravel, PHP, Kotlin, MySQL y Firebase.',
  email: 'kevquispecc@gmail.com',
  phone: '950 353 972',
  location: 'Cieneguilla, Lima, Perú',
  github: 'https://github.com/Chanok18',
  linkedin: 'https://linkedin.com/in/kevin-quispe-0131b1354',
  // En Vercel define la variable NEXT_PUBLIC_SITE_URL con tu dominio final (sin "/" al final)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  avatar:
    'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
EOF

# ---------- detalle de proyecto: mostrar highlights ----------
python3 - <<'PY'
p = 'src/app/projects/[slug]/page.tsx'
s = open(p, encoding='utf8').read()
old = '<p className="text-lg text-gray-700 mb-6">{project.description}</p>'
new = old + '''

        {project.highlights && (
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}'''
if 'project.highlights' not in s:
    s = s.replace(old, new)
open(p, 'w', encoding='utf8').write(s)

# layout: keywords, locale y quitar placeholders
p = 'src/app/layout.tsx'
s = open(p, encoding='utf8').read()
import re
if "'laravel'" not in s:
    s = s.replace("'portafolio',", "'portafolio',\n    'laravel',\n    'java',\n    'kotlin',\n    'desarrollador backend',\n    'Lima',")
s = s.replace("'full stack',", "'desarrollo de software',")
s = s.replace("locale: 'es_ES'", "locale: 'es_PE'")
s = re.sub(r"\n\s*creator: '@tuusuario',", "", s)
s = re.sub(r"\n  verification: \{.*?\n  \},", "", s, flags=re.S)
open(p, 'w', encoding='utf8').write(s)
PY

# ---------- About con el CV ----------
cat > src/app/about/page.tsx <<'EOF'
import { Metadata } from 'next';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: `Conoce más sobre ${personalInfo.name}, ${personalInfo.title}`,
};

export default function AboutPage() {
  const skills = [
    'Java',
    'Laravel & PHP',
    'Kotlin',
    'MySQL',
    'Firebase',
    'API REST & JWT',
    'Git & GitHub',
    'Trabajo en equipo',
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre Mí</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Hola! Soy {personalInfo.name}
            </h2>
            <div className="prose text-gray-700 space-y-4">
              <p>{personalInfo.description}</p>
              <p>
                Me enfoco en aplicar buenas prácticas de programación, el trabajo
                en equipo y la resolución de problemas. Actualmente fortalezco mis
                habilidades técnicas con proyectos personales y académicos
                colaborativos.
              </p>
              <p>
                <strong>Educación:</strong> TECSUP - Diseño y Desarrollo de
                Software (2024 - Actualidad).
              </p>
              <p>
                <strong>Idiomas:</strong> Inglés nivel intermedio - Británico (en
                curso).
              </p>
              <p>
                <strong>Ubicación:</strong> {personalInfo.location}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Habilidades Técnicas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-gray-800">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Habilidades Blandas
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Trabajo en equipo', 'Comunicación efectiva', 'Adaptabilidad', 'Aprendizaje continuo'].map(
              (s) => (
                <span key={s} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {s}
                </span>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
EOF

# ---------- Formulario de contacto (cliente, con validación) ----------
cat > src/components/ContactForm.tsx <<'EOF'
'use client';

import { useState } from 'react';

interface Props {
  toEmail: string;
}

type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

export default function ContactForm({ toEmail }: Props) {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const MAX = 500;

  function validate(): Errors {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = 'Ingresa tu nombre (mínimo 2 caracteres).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Ingresa un correo válido.';
    if (values.subject.trim().length < 3) e.subject = 'Ingresa un asunto (mínimo 3 caracteres).';
    if (values.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres.';
    return e;
  }

  function handleChange(
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = ev.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    setSent(false);
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const body = `Nombre: ${values.name}\nCorreo: ${values.email}\n\n${values.message}`;
    const url = `mailto:${toEmail}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  const input =
    'w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white p-6 rounded-lg shadow-md space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={input}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={input}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-1">
          Asunto
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={input}
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-red-600 mt-1">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={input}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p id="message-error" className="text-sm text-red-600">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-500">{values.message.length}/{MAX}</span>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar mensaje
      </button>

      {sent && (
        <p role="status" className="text-sm text-green-700">
          Se abrió tu aplicación de correo con el mensaje listo para enviar.
          Si no se abrió, escríbeme a {toEmail}.
        </p>
      )}
    </form>
  );
}
EOF

cat > src/app/contact/page.tsx <<'EOF'
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contacta con ${personalInfo.name}. Escríbeme para colaborar en proyectos de desarrollo de software.`,
  openGraph: {
    title: `Contacto | ${personalInfo.name}`,
    description: 'Escríbeme para colaborar en proyectos de desarrollo de software',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
        <p className="text-lg text-gray-600 mb-8">
          ¿Tienes un proyecto en mente o quieres conversar? Escríbeme.
        </p>

        <ContactForm toEmail={personalInfo.email} />

        <ul className="mt-8 space-y-2 text-gray-700">
          <li>📧 <a className="text-blue-600 hover:underline" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></li>
          <li>📞 {personalInfo.phone}</li>
          <li>📍 {personalInfo.location}</li>
          <li>🔗 <a className="text-blue-600 hover:underline" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li>💻 <a className="text-blue-600 hover:underline" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </div>
    </div>
  );
}
EOF

rm -rf .next
echo ""
echo "✅ Portafolio actualizado. Prueba con:  npm run dev -- -p 8080"
