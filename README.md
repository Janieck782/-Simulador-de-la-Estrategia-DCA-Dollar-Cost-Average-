# DCA Simulator for BUDA.com Technical Challenge

Este proyecto es parte de una prueba técnica para un puesto en el equipo de BUDA.com y simula la estrategia de inversión conocida como Dollar Cost Averaging (DCA). El DCA es una táctica financiera donde un inversor reparte una inversión total en compras periódicas de un activo en un esfuerzo por reducir el impacto de la volatilidad en el precio del activo. Al realizar inversiones regulares, independientemente de las fluctuaciones del mercado, el inversor puede beneficiarse del promedio de costos, potencialmente disminuyendo el precio de compra promedio a lo largo del tiempo.


## Contenido del Proyecto

- `public/`: Archivos estáticos para la aplicación web.
- `src/`: Código fuente de la aplicación React, incluyendo componentes, estilos y lógica de negocio.
- `Dockerfile`: Configuración para contenerizar la aplicación.
- `package.json`: Dependencias y scripts para el proyecto.

## Cómo ejecutar la aplicación en local

Para ejecutar la aplicación de React en tu entorno local, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias con `npm install`.
3. Inicia el servidor de desarrollo con `npm start`.
4. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación.

## Cómo levantar la aplicación con Docker

Para contenerizar y ejecutar la aplicación con Docker, sigue estos pasos:

1. Construye la imagen Docker con el siguiente comando:

    ```bash
    docker build -t dca-simulator-buda .
    ```

2. Una vez construida la imagen, ejecuta el contenedor mapeando el puerto de la aplicación al puerto de tu máquina local:

    ```bash
    docker run -p 3000:3000 dca-simulator-buda
    ```

3. Accede a la aplicación desde tu navegador en `http://localhost:3000`.

## Solución para Problemas de CORS en Vercel

Para permitir que la aplicación React se conecte a la API de BUDA.com sin problemas, puedes utilizar la extensión del navegador "Moesif Origin & CORS Changer". Esta extensión actúa como un proxy en tu navegador y te permite sortear las restricciones CORS (Cross-Origin Resource Sharing) que pueden bloquear las solicitudes a la API desde dominios diferentes al de la API.

### Pasos para Habilitar la Extensión

1. **Instala la Extensión**:
   - [Moesif Origin & CORS Changer para Google Chrome](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)
   - [Moesif Origin & CORS Changer para Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/moesif-origin-cors-changer1/)

2. **Activa la Extensión**:
   Después de instalar la extensión, asegúrate de activarla en tu navegador. Deberías ver un ícono en la barra de herramientas del navegador que representa la extensión.

3. **Configura las Reglas**:
   Accede a la configuración de la extensión y agrega las reglas necesarias para permitir que las solicitudes CORS desde tu dominio en Vercel lleguen a la API de BUDA.com.

### ¿Por qué se necesita esta solución?

El problema original se debía a las restricciones CORS en la API de BUDA.com, que bloqueaban las solicitudes desde dominios diferentes al de la API. La extensión "Moesif Origin & CORS Changer" actúa como un intermediario que permite que las solicitudes se realicen sin problemas, facilitando así el desarrollo y la prueba de la aplicación en un entorno local o de desarrollo.

Es importante tener en cuenta que esta solución es adecuada para fines de desarrollo y pruebas, pero no se recomienda para un entorno de producción. En producción, se debe abordar el problema de CORS en el servidor de la API o mediante otras soluciones más seguras.

## Enlace a la Aplicación en Vercel

Puedes acceder a la aplicación en vivo a través del siguiente enlace:

[**DCA Simulator for BUDA.com**](https://dca-janieck.vercel.app/)

¡Explora la simulación de estrategias de inversión con Dollar Cost Averaging (DCA) en tiempo real!



