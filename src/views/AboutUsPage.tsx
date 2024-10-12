
const AboutUsPage = () => {

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Historia de GuitarLA */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-300">Sobre GuitarLA</h2>
        <p className="text-gray-700 dark:text-white">
          GuitarLA nació de una pasión compartida por la música y el desarrollo web. Como músicos y programadores, queríamos crear una plataforma donde los entusiastas de las guitarras pudieran encontrar el instrumento perfecto 
          para ellos, ya sea que busquen su primera guitarra acústica o un modelo eléctrico avanzado.
        </p>
        <p className="mt-3 text-gray-700 dark:text-white">
          En GuitarLA, nos esforzamos por ofrecer una experiencia de compra fluida y amigable, combinando nuestra experiencia en tecnología y nuestra pasión por la música. Desde nuestras ofertas especiales hasta la personalización del carrito de compras, todo está diseñado para hacer que tu proceso de compra sea lo más fácil posible.
        </p>
      </section>

      {/* Tu experiencia como desarrollador */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-300">Acerca del Desarrollador</h2>
        <p className="text-gray-700 dark:text-white">
          Soy un desarrollador web apasionado por crear experiencias digitales que combinan funcionalidad y diseño.
          Con varios años de experiencia, he trabajado en una amplia gama de proyectos, desde sitios web de comercio electrónico hasta aplicaciones web dinámicas.
        </p>
        <p className="mt-3 text-gray-700 dark:text-white">
          GuitarLA es uno de mis proyectos más recientes, donde he podido aplicar mis habilidades en desarrollo frontend y backend para construir una plataforma de ecommerce completa, optimizada para ofrecer una gran experiencia de usuario. Mi objetivo siempre es mejorar la funcionalidad y el rendimiento para que los usuarios puedan disfrutar de una experiencia fluida en cualquier dispositivo.
        </p>
      </section>

      {/* Tecnologías utilizadas */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-300">Tecnologías Utilizadas en GuitarLA</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-white">
          <li><strong>React</strong>: Librería para construir interfaces de usuario de forma eficiente y modular.</li>
          <li><strong>React Router DOM</strong>: Manejo de rutas dentro de la aplicación para facilitar la navegación entre páginas.</li>
          <li><strong>Axios</strong>: Cliente HTTP utilizado para realizar peticiones a la API de forma sencilla y eficiente.</li>
          <li><strong>Tailwind CSS</strong>: Framework CSS que permite un diseño ágil y totalmente responsivo sin tener que escribir mucho CSS personalizado.</li>
          <li><strong>TypeScript</strong>: Un superset de JavaScript que añade tipos estáticos, mejorando la robustez y la escalabilidad del código.</li>
          <li><strong>Zod</strong>: Librería de validación de esquemas que garantiza que los datos sean correctos y seguros, integrándose bien con TypeScript.</li>
          <li><strong>Zustand</strong>: Librería ligera para manejar el estado global de la aplicación, facilitando la gestión de datos compartidos entre componentes.</li>
          <li><strong>HeadlessUI</strong>: Componentes accesibles sin estilos predeterminados que permiten una personalización completa del diseño.</li>
          <li><strong>React Loading Skeleton</strong>: Muestra esqueletos de carga personalizados para mejorar la experiencia de usuario durante la carga de datos.</li>
          <li><strong>SweetAlert2</strong>: Librería para mostrar alertas personalizadas, estilizadas y con interactividad avanzada.</li>
          <li><strong>Swiper</strong>: Librería para implementar carruseles y sliders completamente responsivos y personalizables.</li>
          <li><strong>Heroicons</strong>: Conjunto de iconos SVG preconstruidos, fáciles de integrar en React para mejorar la experiencia visual.</li>
          <li><strong>Strapi</strong>: CMS headless utilizado para gestionar el contenido del sitio, como productos, promociones y páginas dinámicas.</li>
          <li><strong>MercadoPago</strong>: Integración con la pasarela de pagos de MercadoPago para procesar transacciones de forma segura.</li>
          <li><strong>PostgreSQL</strong>: Base de datos SQL utilizada en el backend para gestionar datos estructurados de forma eficiente y escalable.</li>
        </ul>
      </section>

      {/* Proyectos anteriores */}
      <section>
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-300">Otros Proyectos</h2>
        <p className="text-gray-700 dark:text-white">
          Además de GuitarLA, he trabajado en varios otros proyectos que han mejorado mis habilidades tanto en frontend como en backend. Algunos de ellos incluyen:
        </p>
        <ul className="list-disc list-inside mt-3 text-gray-700">
          <li><strong>ShopMaster</strong>: Un ecommerce optimizado para ventas rápidas, con un diseño intuitivo.</li>
          <li><strong>Taskly</strong>: Una aplicación para la gestión de tareas, construida en React y Node.js.</li>
          <li><strong>Portafolio personal</strong>: <a href="https://tuportafolio.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ver Portafolio</a></li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
