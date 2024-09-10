import { Metadata } from "next";
import config from "../../../../../config/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Política de Cookies | ${config.appName}`,
  description: `Política de cookies de ${config.appName}. Información detallada sobre cómo utilizamos las cookies en nuestra plataforma.`,
};

export default function PoliticaCookies() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Política de Cookies</h1>

      <p className="mb-4">Última actualización: 07 de septiembre de 2024</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
        <p>
          Bienvenido a {config.appName}. Esta Política de Cookies explica cómo utilizamos las cookies y tecnologías similares en nuestra plataforma. Nos comprometemos a proteger su privacidad y a cumplir con la legislación española y europea, incluyendo la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE) y el Reglamento General de Protección de Datos (RGPD) de la UE 2016/679.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Estas se utilizan para recordar sus preferencias y proporcionar una experiencia de usuario mejorada.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Tipos de cookies que utilizamos</h2>
        <p>En {config.appName}, utilizamos los siguientes tipos de cookies:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Cookies estrictamente necesarias:</strong> Estas cookies son esenciales para el funcionamiento de nuestra plataforma y no pueden ser desactivadas en nuestros sistemas. Se utilizan principalmente para mantener su sesión activa y garantizar la seguridad de su cuenta. Estas cookies son creadas por NextAuth y se utilizan exclusivamente para el proceso de inicio de sesión y autenticación.
          </li>
        </ul>
        <p>
          No utilizamos cookies de marketing, análisis o preferencias.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Cómo gestionamos las cookies</h2>
        <p>
          Las cookies estrictamente necesarias que utilizamos son esenciales para el funcionamiento de nuestra plataforma y se establecen automáticamente cuando inicia sesión. Estas cookies no almacenan ninguna información personal identificable y se eliminan cuando cierra su sesión o su navegador.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cómo controlar las cookies</h2>
        <p>
          La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la configuración del navegador. Para obtener más información sobre las cookies, incluido cómo ver qué cookies se han establecido y cómo gestionarlas y eliminarlas, visite www.aboutcookies.org o www.allaboutcookies.org.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Cambios en nuestra política de cookies</h2>
        <p>
          Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras prácticas o por razones operativas, legales o regulatorias. Le notificaremos cualquier cambio significativo a través de un aviso prominente en nuestra plataforma.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
        <p>
          Si tiene preguntas o comentarios sobre nuestra política de cookies, por favor contáctenos en:
        </p>
        <p className="mt-2">
          [Nombre de la empresa]<br />
          Attn: Política de Cookies<br />
          [Dirección completa]<br />
          [Correo electrónico de contacto]
        </p>
      </section>
    </div>
  );
}