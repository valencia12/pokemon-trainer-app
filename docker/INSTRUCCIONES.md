# Ejecutar Pokémon Trainer

Esta entrega incluye `pokemon-trainer-app.tar`, una imagen con la aplicación compilada y Nginx. No necesitas Node, el código fuente ni un archivo `.env`.

## Requisitos

- Docker Desktop instalado e iniciado (o Docker Engine en Linux).
- Una computadora compatible con la arquitectura indicada en la carpeta de entrega: `amd64` para Intel/AMD o `arm64` para ARM, incluidos los Mac con chip M.
- Internet para consultar PokéAPI y cargar las imágenes de Pokémon.

## Iniciar

Abre una terminal en la carpeta que contiene el `.tar` y ejecuta:

```bash
docker load -i pokemon-trainer-app.tar
docker run -d --name pokemon-trainer -p 127.0.0.1:8080:80 pokemon-trainer-app:1.0
```

Abre http://localhost:8080. Puedes abrir y recargar las rutas de la aplicación.

## Detener y volver a iniciar

```bash
docker stop pokemon-trainer
docker start pokemon-trainer
```

Si aparece un error porque el nombre `pokemon-trainer` ya existe, usa `docker start pokemon-trainer` para volver a iniciar el contenedor existente. Si el puerto 8080 está ocupado, utiliza `-p 127.0.0.1:8081:80` al crear el contenedor y abre http://localhost:8081.

## Revisar logs

```bash
docker logs pokemon-trainer
```

Los entrenadores y equipos se guardan en el navegador de cada persona. Cambiar de navegador o de puerto usa un almacenamiento independiente; los datos no vienen incluidos en la imagen Docker.
