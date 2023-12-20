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

