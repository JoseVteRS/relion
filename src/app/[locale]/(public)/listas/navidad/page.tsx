import markdownStyles from "@/app/[locale]/blog/markdown-styles.module.css";
import { Button } from "@/components/ui/button";
import markdownToHtml from "@/lib/markdown-to-html";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Lista de Deseos de Boda",
  description:
    "Organiza regalos únicos y facilita la elección a tus invitados con Relion.",
};

export default async function ListasNavidadPage() {
  const content =
    await markdownToHtml(`# Cómo crear lista de regalos de navidad y hacer que esta festividad sea mágica

¿También crees que la Navidad es la época más especial del año? Desde hornear galletas y decorar el árbol hasta intercambiar regalos, estos momentos se convierten en recuerdos inolvidables. Para que estas fiestas sean perfectas, es fundamental elegir regalos que realmente emocionen a tus seres queridos. Descubre cómo **crear lista de regalos de Navidad** con herramientas online como **Relion**, simplificando las compras y asegurando que cada regalo sea especial.

---

## Ventajas de crear lista de regalos de navidad online con Relion

1. **Comunica tus deseos de forma clara**  
   La tradición de las listas navideñas no es solo para niños. Los adultos también pueden beneficiarse de una **lista de regalos online**, incluyendo artículos como libros, gadgets, decoración o experiencias inolvidables. Con **Relion**, enlaza los productos directamente para que los regalos lleguen con solo unos clics.

2. **Simplifica las compras para tus amigos y familiares**  
   Al centralizar tus deseos en una lista, tus seres queridos ahorrarán tiempo y esfuerzo, evitando desplazamientos innecesarios y seleccionando exactamente lo que deseas.

3. **Evita duplicados y errores**  
   Una **lista de regalos navideña online** permite que tus familiares vean qué regalos ya han sido elegidos, evitando duplicados y devoluciones. Además, pueden consultar detalles específicos como tallas o colores, sin necesidad de hacer preguntas repetitivas.

---

## Beneficios de las listas de regalos para familias

1. **Acceso rápido y sencillo**  
   Con una lista de deseos online, los abuelos, tíos y otros familiares pueden conocer los regalos ideales para cada miembro de la familia. Incluso puedes asignar nombres a los regalos para que sepan quién desea cada cosa.

2. **Actualización en tiempo real**  
   ¿Cambiaron los intereses de alguien? Sin problema. Las listas en **Relion** pueden modificarse en cualquier momento, añadiendo o eliminando elementos según las necesidades de última hora.

3. **Diseño personalizado y compartible**  
   Comparte tu lista fácilmente a través de WhatsApp, correo electrónico, SMS o redes sociales. Con Relion, incluso puedes diseñarla con motivos navideños como copos de nieve o árboles decorados.

---

## Cómo personalizar tu lista de regalos de navidad

1. **Agrega un toque personal con fotos y mensajes**  
   Incluye una foto familiar o un mensaje navideño que refleje el significado especial de estas fiestas. Agradece el cariño y apoyo de tus seres queridos con palabras sinceras.

2. **Incorpora actividades y experiencias**  
   La Navidad no es solo regalos materiales. Añade experiencias como entradas al teatro, cenas gourmet o actividades en familia. Estos regalos no solo se disfrutan, sino que crean recuerdos inolvidables.

3. **Diseños temáticos y colores navideños**  
   Usa elementos visuales festivos, como fondos nevados o detalles en rojo, verde y dorado, para que tu lista de deseos se sienta aún más especial y acorde con el espíritu de la temporada.

---

## Cómo compartir y gestionar tu lista de regalos de navidad

- **Comparte con facilidad**: Usa correo electrónico, mensajería (WhatsApp, Telegram) o redes sociales para enviar tu lista a quienes quieras.  
- **Gestión centralizada**: En **Relion**, puedes crear múltiples listas con una sola cuenta, incluso para diferentes miembros de la familia o eventos. Esto te permite administrar todo en un solo lugar.  
- **Opciones sin registro**: Tu lista es accesible para cualquier usuario sin necesidad de que se registren, haciendo que sea fácil para cualquier persona consultar y participar.

---

## Conclusión: crea una lista de regalos navideña inolvidable

Crear lista de regalos de Navidad con **Relion** es una forma sencilla, práctica y divertida de disfrutar la magia de estas fiestas. Desde regalos personalizados hasta experiencias compartidas, esta herramienta garantiza que todos reciban algo especial y evita el estrés de las compras navideñas. Sigue estos consejos y prepárate para celebrar una Navidad llena de amor, sorpresas y momentos únicos.
`);

  return (
    <article className="py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/es/" className="flex items-center gap-2">
          <ChevronLeft size={16} />
          Volver
        </Link>
      </Button>
      <div className="relative w-full h-[400px] mb-12">
        <img
          src="/images/list-christmas.webp"
          alt="Lista de regalos para navidad"
          className="w-full h-full object-cover rounded-2xl"
          width={1200}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
      </div>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button className="mt-4">
        <Link href="/es/sign-up">Crea una lista para tu boda</Link>
      </Button>
    </article>
  );
}
