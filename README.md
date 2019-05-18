Ejercicio del [Máster en Programación FullStack con JavaScript y Node.js](https://github.com/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3)

### Objetivo

Desarrolla una aplicación para gestionar las peliculas que te gustan. Incluyendo llamadas AJAX a la base de datos de IMBD para enriquecer los datos, usando [OMDb API](http://omdbapi.com/).

Modificaremos el ejercico base encontrado en la rama master para ir dejando la lógica de lado del cliente y pasar al back. Cada rama tendrá una solución distinta.

Si quieres ejecutar el código de cada una de las ramas deberás instalar las dependencias con `npm install`. Debes generar las claves necesarias para hacer uso de la base de datos en tiempo real de [Firebase](https://firebase.google.com/docs/web/setup) y una clave de [OMBD](http://www.omdbapi.com/).

### Rama master

#### [Clase 43](https://github.com/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3/blob/master/teoria/clase43.md) - Objetivo: Practicar un CRUD básico con firebase.

Requerimientos:

- Todas las películas que se introducen quedan guardadas en Firebase.
- Las peliculas pueden ser consulatadas.
- Las peliculas pueden ser eliminadas.
- Las peliculas pueden ser editadas desde el html.

### Rama serverRender

#### [Clase 68](https://github.com/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3/blob/master/teoria/clase68.md) - Modificar el ejercicio base renderizando la aplicación en el servidor.

Requerimientos:

- Unifica la estructura de datos (quita details) y normaliza las propiedades (sin capitalización)
- Usa Bootstrap y plantillas de Pug (usar includes)
- Manten una buena estructura separando rutas y modelos, puedes usar async/await para simplificar el trabajo

### Rama apiRest

### [Clase 72](https://github.com/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3/blob/master/teoria/clase72.md)

Requerimientos:

- Migrar la aplicación de MovieFire para hacer una APIRest con Nodejs

Para ver esta rama en tu local debes estar en el directorio apiRest/. Dentro de esta carpeta encontrarás dos directorios, uno que contiene el código del backend y otro con el código del front. Para instalar las dependencias del back haz `npm install` en la raíz del proyecto /apiRest. A continuación muévete a apiRest/front y vuelve a hacer `npm install` para instalar las dependencias del front.

Necesitarás dos terminales, una para lanzar el back y otra para lanzar el servidor de desarrollo del front.
En apiRest/ haz `npm run serve` y en apiRest/front `npm run dev` podrás ver la aplicación el http://localhost:5000.

Para el back hemos usado Firebase, Node.js y Express.js y para el front hemos usado Svelte, un framework reactivo que no usa un DOM virtual 🤯!
