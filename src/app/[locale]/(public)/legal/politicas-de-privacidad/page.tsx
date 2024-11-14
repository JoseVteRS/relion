import { Metadata } from "next";
import Link from "next/link";
import config from "../../../../../../config/config";

export const metadata: Metadata = {
  title: `Política de Privacidad | ${config.appName}`,
  description: `Política de privacidad de ${config.appName}. Información detallada sobre cómo recopilamos, usamos y protegemos sus datos personales en nuestra plataforma.`,
};

export default function PoliticaPrivacidad() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Política de Privacidad</h1>

      <p className="mb-4">Última actualización: 07 de septiembre de 2024</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
        <p>
          Bienvenido a {config.appName}. Nos tomamos muy en serio la privacidad
          de nuestros usuarios y nos comprometemos a proteger sus datos
          personales de acuerdo con la legislación española y europea,
          incluyendo el Reglamento General de Protección de Datos (RGPD) de la UE 2016/679.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Responsable del tratamiento
        </h2>
        <p>
          {config.appName}, es el responsable del tratamiento de los datos personales
          que nos proporcione. Puede contactarnos en este{" "}
          <Link
            href="mailto:jvrs.90@gmail.com"
            className="font-semibold text-blue-500 hover:underline"
          >
            email
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Datos que recopilamos
        </h2>
        <p>Recopilamos los siguientes datos personales:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Información de registro: nombre completo, dirección de correo electrónico,
            contraseña encriptada.
          </li>
          <li>
            Información de uso: datos sobre cómo utiliza nuestra plataforma, incluyendo
            páginas visitadas, tiempo de sesión, interacciones con la interfaz y errores encontrados.
          </li>
          <li>
            Información técnica: dirección IP, tipo de dispositivo, sistema operativo,
            tipo de navegador y versión.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Finalidad del tratamiento
        </h2>
        <p>Utilizamos sus datos personales para:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Gestionar su cuenta y proporcionar nuestros servicios de creación de listas de regalos.</li>
          <li>Enviar comunicaciones relacionadas con el servicio, como actualizaciones de la plataforma o cambios en los términos.</li>
          <li>Mejorar y personalizar su experiencia en nuestra plataforma, analizando patrones de uso y preferencias.</li>
          <li>Prevenir fraudes y garantizar la seguridad de nuestra plataforma.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Base legal para el tratamiento
        </h2>
        <p>El tratamiento de sus datos se basa en:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>La ejecución del contrato de servicios cuando utiliza nuestra plataforma.</li>
          <li>Su consentimiento explícito para el envío de boletines informativos y comunicaciones promocionales.</li>
          <li>Nuestro interés legítimo en mejorar nuestros servicios, prevenir fraudes y garantizar la seguridad de la plataforma.</li>
          <li>El cumplimiento de obligaciones legales, como la conservación de datos fiscales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Almacenamiento y procesamiento de datos
        </h2>
        <p>
          Sus datos personales se almacenan de forma segura en bases de datos proporcionadas
          por Neon.tech (
          <Link
            href="https://neon.tech/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://neon.tech/
          </Link>
          ), una plataforma de base de datos serverless PostgreSQL. Nuestros servidores
          de aplicaciones están alojados en Vercel (
          <Link
            href="https://vercel.com/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://vercel.com/
          </Link>
          ), una plataforma de despliegue y hosting para aplicaciones web.
        </p>
        <p className="mt-4">
          Para la gestión de nuestros boletines informativos y comunicaciones por correo electrónico,
          utilizamos los servicios de ConvertKit (
          <Link
            href="https://convertkit.com/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://convertkit.com/
          </Link>
          ), una plataforma de marketing por correo electrónico.
        </p>
        <p className="mt-4">
          Todos estos proveedores cumplen con las normativas de protección de datos
          aplicables y han implementado medidas de seguridad adecuadas para proteger sus datos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Compartir datos</h2>
        <p>
          No vendemos ni compartimos sus datos personales con terceros para fines de marketing, excepto:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Con proveedores de servicios que nos ayudan a operar nuestra plataforma:
            <ul className="list-disc pl-6 mt-2">
              <li>Neon.tech para almacenamiento de datos en bases de datos PostgreSQL.</li>
              <li>Vercel para el alojamiento y despliegue de nuestra aplicación web.</li>
              <li>ConvertKit para la gestión y envío de boletines informativos.</li>
            </ul>
          </li>
          <li>
            Cuando sea requerido por ley, en respuesta a procesos legales o para
            proteger nuestros derechos legales.
          </li>
          <li>
            Con su consentimiento explícito o bajo su dirección.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Sus derechos</h2>
        <p>De acuerdo con el RGPD, usted tiene derecho a:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Acceder a sus datos personales y obtener una copia de los mismos.</li>
          <li>Rectificar datos inexactos o incompletos.</li>
          <li>Solicitar la supresión de sus datos cuando ya no sean necesarios para los fines para los que fueron recogidos.</li>
          <li>Oponerse al tratamiento de sus datos para fines de marketing directo o basado en intereses legítimos.</li>
          <li>Solicitar la limitación del tratamiento en ciertas circunstancias.</li>
          <li>Solicitar la portabilidad de sus datos a otro proveedor de servicios.</li>
          <li>Retirar su consentimiento en cualquier momento para aquellos tratamientos basados en el mismo.</li>
        </ul>
        <p>
          Para ejercer estos derechos, póngase en contacto con nosotros a través
          de [correo electrónico de contacto]. Responderemos a su solicitud en un plazo máximo de un mes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          9. Seguridad de los datos
        </h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para
          proteger sus datos personales, incluyendo:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Encriptación de datos en tránsito y en reposo.</li>
          <li>Acceso restringido a los datos personales.</li>
          <li>Monitorización continua de nuestros sistemas para detectar posibles vulnerabilidades.</li>
          <li>Formación regular de nuestro personal en materia de protección de datos y seguridad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          10. Cambios en la política de privacidad
        </h2>
        <p>
          Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas
          o por razones operativas, legales o regulatorias. Le notificaremos cualquier cambio significativo
          a través de un aviso prominente en nuestra plataforma o por correo electrónico.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          11. Autoridad de control
        </h2>
        <p>
          Si considera que el tratamiento de sus datos personales infringe la
          normativa de protección de datos, tiene derecho a presentar una reclamación ante la
          Agencia Española de Protección de Datos (AEPD), la autoridad de control en materia
          de protección de datos en España. Puede contactar con la AEPD a través de su sitio web
          (
          <Link
            href="https://www.aepd.es"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            www.aepd.es
          </Link>
          ) o en su dirección postal: C/ Jorge Juan, 6, 28001 Madrid.
        </p>
      </section>
    </div>
  );
}
