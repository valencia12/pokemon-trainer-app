# Pokémon Trainer

Aplicación de React, TypeScript y Vite para configurar un entrenador y elegir un equipo de tres Pokémon.

## Estado actual

Base de arquitectura y navegación. Las tres páginas son marcadores de posición;
el formulario, la selección, las estadísticas y la persistencia todavía están pendientes.
Las rutas de equipo y perfil están protegidas y vuelven al formulario mientras no haya entrenador.

## Desarrollo

```sh
npm ci
npm run dev
npm run build
npm run lint
```

## Organización

- `src/app/router`: navegación, layout y protección de rutas.
- `src/app/providers`: contexto global de la aplicación.
- `src/components/ui`: componentes visuales reutilizables.
- `src/features/trainer`: componentes, validaciones y tipos del entrenador.
- `src/features/pokemon`: componentes, servicios HTTP y tipos de Pokémon.
- `src/pages`: composición de las pantallas.
- `src/stores`: estado y acciones; usamos Context + reducer, permitido por la prueba.
- `src/hooks`: acceso reutilizable al estado.
- `src/lib`: configuración y cliente HTTP encapsulado con fetch.
- `src/config`: JSON de textos, rutas de navegación y endpoints.

Los textos visibles se importan desde `texts.es.json`, incluyendo etiquetas accesibles.
Las rutas se importan desde `routes.json`. Los servicios usan `endpoints.json`.
Los mensajes internos de programación no son textos de interfaz.

El router controla qué pantalla se muestra. Los providers comparten el estado.
Las páginas combinan componentes y las features contienen las reglas de cada funcionalidad.
Los componentes de UI reciben datos por props y no hacen peticiones HTTP.

Al publicar, el servidor debe servir `index.html` para las rutas de la aplicación
para que los enlaces directos funcionen con BrowserRouter.

## Gitflow

El entorno de edición actual no permite crear `.git`. Inicializa desde tu terminal:

```sh
git init -b main
git add .
git commit -m "chore: initialize application architecture"
git switch -c develop
git switch -c feature/trainer-setup
```

`main` contiene versiones estables. `develop` integra funcionalidades.
Cada funcionalidad usa una rama `feature/...` creada desde `develop`.
Las entregas usan `release/...`; las correcciones urgentes, `hotfix/...` desde `main`.
Los commits y comentarios del código se escriben en inglés, sin atribuciones automáticas.

Los requisitos y el orden de implementación están en [docs/requirements.md](docs/requirements.md).
