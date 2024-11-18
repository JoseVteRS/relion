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

export default async function ListasBodasPage() {
  const content =
    await markdownToHtml(`# Lista de regalos para bodas: la guía definitiva para crear la tuya

Cuando comienzas tu vida matrimonial, el primer paso es organizar tu nuevo hogar y compartir momentos únicos en pareja. Desde cenas románticas a la luz de las velas hasta actividades emocionantes como un curso de supervivencia, **crear listas de regalos para bodas** es una forma práctica de orientar a tus invitados para que acierten con sus obsequios y endulcen el inicio de esta nueva etapa. Descubre cómo una lista de deseos con **Relion** puede hacer que organizar tu boda sea más fácil y divertido.

---

## Ventajas de crear listas de regalos para bodas con Relion

1. **Ahorra tiempo en la organización de tu boda**  
   La planificación de una boda puede ser un reto, pero con una lista de regalos para bodas en línea, puedes gestionar todo desde la comodidad de tu hogar. Con **Relion**, actualiza tu lista cuando quieras y dedícate a disfrutar del proceso.

2. **Personaliza tu lista para tu nuevo hogar**  
   Si estás creando un nuevo hogar o decorando el piso que compartiréis, usa **Relion** para incluir muebles, electrodomésticos o ideas de diseño interior que se ajusten a vuestros gustos.

3. **Amplia selección de tiendas y regalos**  
   A diferencia de las listas tradicionales, **Relion** permite incluir regalos de cualquier tienda online. Desde electrodomésticos de alta gama hasta experiencias inolvidables como viajes o cenas gourmet, todo es posible.

---

## Por qué Relion también beneficia a tus invitados

1. **Facilita la selección del regalo perfecto**  
   Los amigos y familiares pueden acceder a la lista en cualquier momento y lugar, asegurándose de elegir algo que realmente os guste. Ya no tendrán que adivinar si un set de cubiertos o un mueble encaja en vuestro hogar.

2. **Pedidos cómodos y rápidos**  
   Desde la lista de regalos, los invitados pueden acceder directamente a las tiendas online para realizar la compra. Con unos pocos clics, el regalo estará camino a vuestra puerta, sin complicaciones ni colas.

---

## Consejos para crear la lista de regalos para bodas perfecta

1. **Pensad bien vuestros deseos**  
   Inicia tu lista en **Relion** con tiempo. Investiga diferentes opciones para asegurarte de que los regalos sean útiles, representen vuestra personalidad y aporten a vuestro futuro juntos.

2. **Comparte la lista en el momento adecuado**  
   Incluye el enlace a tu lista con las invitaciones de boda. Esto dará a tus invitados tiempo suficiente para decidir entre regalos como un viaje a París o un juego de sartenes de calidad.

3. **Sé claro y discreto en la comunicación**  
   Deja claro que los regalos son opcionales y que la lista es solo una guía para quienes deseen participar. Esto hará que todos se sientan cómodos y sin presiones.

4. **Opciones para compartir tu lista**  
   Comparte el enlace de tu lista de regalos de bodas por correo electrónico, mensajería (WhatsApp o Telegram), SMS o redes sociales. También puedes añadirlo a las invitaciones físicas o digitales.

---

## Cómo agradecer los regalos después de la boda

1. **Registra quién regala qué**  
   - **Documentación fotográfica**: Toma fotos de los regalos y sus autores durante la entrega.  
   - **Notas escritas**: Pide a un amigo o padrino que anote quién dio cada regalo.  

2. **Envía agradecimientos personalizados**  
   Muestra tu gratitud enviando tarjetas personalizadas donde menciones el regalo recibido y cuánto lo aprecias. Es una excelente oportunidad para fortalecer los lazos con tus seres queridos.

---

## Ideas creativas para personalizar tu lista de regalos

1. **Fotos y texto emocional**  
   Incluye una foto vuestra y un texto que cuente la historia de vuestra relación o vuestros sueños futuros. Esto hará que los regalos tengan un significado más profundo para tus invitados.

2. **Regalos intangibles y experiencias**  
   No todo tiene que ser físico. Añade actividades como un spa en pareja, un curso de cocina o una excursión en globo.

3. **Diseño creativo e interactivo**  
   Personaliza tu lista en **Relion** con enlaces a vídeos, canciones significativas o fotos de momentos importantes. Esto hará que la experiencia sea aún más especial para tus amigos y familiares.

---

## Conclusión: por qué crear tu lista de regalos de bodas en Relion

Con **Relion**, crear listas de regalos para bodas es fácil, flexible y personalizable. Olvídate de las listas limitadas y da a tus invitados una forma cómoda de contribuir a vuestro futuro. Sigue estos consejos y disfruta de una boda organizada y llena de detalles únicos que reflejen vuestra historia de amor. ¡Haz que tu lista de bodas sea inolvidable!
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
          src="/images/list-weading.webp"
          alt="Lista de regalos para bodas"
          className="w-full h-full object-cover rounded-xl"
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
