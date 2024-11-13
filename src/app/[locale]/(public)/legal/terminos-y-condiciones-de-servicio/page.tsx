export default function TosPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones de Servicio</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p>Bienvenido a nuestra plataforma de gestión de regalos. Al utilizar nuestros servicios, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, por favor, no utilice nuestro sitio web o servicios.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso del Servicio</h2>
          <p>Nuestro servicio permite a los usuarios crear y gestionar listas de regalos, así como compartirlas con amigos y familiares. Usted se compromete a utilizar el servicio de manera responsable y de acuerdo con todas las leyes aplicables.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Privacidad y Protección de Datos</h2>
          <p>Cumplimos con el Reglamento General de Protección de Datos (RGPD) de la UE y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD) de España. No vendemos datos personales de los usuarios. Los datos de las listas de regalos y los regalos son visibles para los usuarios autorizados de acuerdo con la configuración de privacidad elegida por el creador de la lista.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Newsletter</h2>
          <p>Utilizamos ConvertKit para gestionar nuestras comunicaciones por correo electrónico. Al suscribirse a nuestra newsletter, usted acepta recibir comunicaciones de nuestra parte. Puede darse de baja en cualquier momento utilizando el enlace proporcionado en cada correo electrónico.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Alojamiento y Almacenamiento de Datos</h2>
          <p>Nuestro servicio está alojado en Vercel y utilizamos Neon Tech como base de datos. Ambos proveedores cumplen con las normativas de protección de datos de la UE.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Derechos del Usuario</h2>
          <p>De acuerdo con el RGPD, usted tiene derecho a acceder, rectificar, suprimir y portar sus datos personales, así como a limitar u oponerse a su tratamiento. Para ejercer estos derechos, por favor contáctenos a través de [correo electrónico de contacto].</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Modificaciones de los Términos</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. El uso continuado de nuestros servicios después de cualquier cambio constituye su aceptación de los nuevos términos.</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Ley Aplicable y Jurisdicción</h2>
          <p>Estos términos se rigen por la ley española. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de [ciudad], España.</p>
        </section>
  
        <footer className="text-sm text-muted-foreground">
          <p>Última actualización: [fecha]</p>
          <p>Si tiene alguna pregunta sobre estos términos, por favor contáctenos en [correo electrónico de contacto].</p>
        </footer>
      </div>
    );
  }