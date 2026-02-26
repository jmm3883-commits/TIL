# Gestor de Calificaciones CFGM

Aplicación web para la gestión de calificaciones, evaluaciones y actas del CFGM Actividades Comerciales.

## Características

- Gestión de alumnos y módulos.
- Calificación por Resultados de Aprendizaje (RA).
- Cálculo automático de notas (QPROV).
- Generación de boletines y actas.
- Exportación a Excel.
- Base de datos compartida (archivo JSON persistente).

## Cómo desplegar (Publicar en Internet)

Esta aplicación tiene un **Backend (Servidor Node.js)** y un **Frontend (React)**, por lo que necesita un servicio que soporte Node.js. No funcionará correctamente en servicios de solo estáticos como GitHub Pages (a menos que se refactorice).

### Opción Recomendada: Render.com (Gratis)

1.  **Sube este código a GitHub**:
    *   Crea un repositorio en GitHub.
    *   Sube todos los archivos de este proyecto.

2.  **Crea un servicio en Render**:
    *   Regístrate en [render.com](https://render.com).
    *   Haz clic en "New +" y selecciona **"Web Service"**.
    *   Conecta tu cuenta de GitHub y selecciona el repositorio que acabas de crear.

3.  **Configuración en Render**:
    *   **Name**: Elige un nombre (ej. `gestor-notas`).
    *   **Region**: Frankfurt (o la más cercana).
    *   **Branch**: `main` (o la que uses).
    *   **Root Directory**: (Déjalo en blanco).
    *   **Runtime**: **Node**.
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   **Plan**: Free.

4.  Haz clic en **"Create Web Service"**.
5.  Espera unos minutos. Render te dará una URL (ej. `https://gestor-notas.onrender.com`) que podrás compartir con los profesores.

### Opción Alternativa: Railway.app

Similar a Render, muy sencillo de usar.

1.  Sube el código a GitHub.
2.  En Railway, "New Project" -> "Deploy from GitHub repo".
3.  Railway detectará automáticamente que es una app Node.js y la desplegará.

## Configuración de Base de Datos (Opcional pero Recomendado)

Para que los datos no se pierdan al reiniciar el servidor en la nube, se recomienda usar una base de datos PostgreSQL.

1.  Crea una base de datos PostgreSQL gratuita en [Neon.tech](https://neon.tech) o [Supabase](https://supabase.com).
2.  Obtén la URL de conexión (ej. `postgres://usuario:password@host/database`).
3.  Configura la variable de entorno `DATABASE_URL` en tu servicio de hosting (Render, Railway, etc.) con ese valor.

La aplicación detectará automáticamente la variable y usará la base de datos. Si no la encuentra, seguirá usando el archivo local (que se reinicia en servidores gratuitos).

## Cómo subir a GitHub manualmente (Sin comandos)

Si no estás familiarizado con Git, puedes subir los archivos directamente desde la web de GitHub:

1.  **Descarga el código**: Haz clic en el botón de descarga en tu entorno de desarrollo (normalmente un icono de flecha hacia abajo) para obtener un archivo `.zip` con todo el proyecto.
2.  **Descomprime**: Extrae el contenido del `.zip` en tu ordenador.
3.  **Crea un repositorio**: Ve a [GitHub.com](https://github.com), inicia sesión y crea un nuevo repositorio ("New repository").
4.  **Sube los archivos**:
    *   En la página principal de tu nuevo repositorio, busca el enlace que dice **"uploading an existing file"**.
    *   Arrastra todos los archivos y carpetas de tu proyecto (excepto `node_modules` y `dist` si existen) al área de carga.
    *   Escribe un mensaje en "Commit changes" (ej. "Versión inicial") y haz clic en el botón verde **"Commit changes"**.

Una vez subido, sigue los pasos de **Render.com** o **Railway.app** para desplegar tu aplicación.

## Desarrollo Local

1.  Instalar dependencias:
    ```bash
    npm install
    ```

2.  Iniciar en modo desarrollo:
    ```bash
    npm run dev
    ```

3.  Construir para producción:
    ```bash
    npm run build
    npm start
    ```
