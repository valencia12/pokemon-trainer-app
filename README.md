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
- `src/stores`: estado y acciones mediante Context + reducer.
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

El repositorio usa Gitflow. Las ramas de funcionalidades parten de `develop`.

- `main`: versiones estables.
- `develop`: integración de funcionalidades.
- `feature/...`: una rama por funcionalidad, creada desde `develop`.
- `release/...`: preparación de entregas desde `develop`; se integra en `main` y `develop`.
- `hotfix/...`: correcciones urgentes desde `main`; se integra en `main` y `develop`.

Las ramas iniciales de trabajo son:

- `feature/gitflow-workflow`: configuración del repositorio y flujo de trabajo.
- `feature/trainer-setup`: formulario, validaciones y persistencia del entrenador.
- `feature/pokemon-selection`: carga, búsqueda y selección del equipo.
- `feature/trainer-profile`: perfil, estadísticas y edición del entrenador y equipo.

Las ramas `release/...` y `hotfix/...` se crean cuando hay una entrega o una
corrección concreta que preparar.

Cada funcionalidad se entrega en un único commit en su rama. Antes de integrarla,
se revisan los cambios y se ejecutan las comprobaciones correspondientes.
Los commits y comentarios del código se escriben en inglés.
Los mensajes de commit usan un prefijo como `feat:`, `fix:` o `docs:`.

Ejemplo para la siguiente funcionalidad:

```sh
git switch develop
git switch feature/trainer-setup
# Implementar y verificar la funcionalidad antes de crear su commit.
git add src README.md
git commit -m "feat: implement trainer setup"
git switch develop
git merge --no-ff feature/trainer-setup
```

El commit de merge conserva el historial de la rama y es independiente del único
commit de implementación de la funcionalidad.

## Documentación local

La carpeta `docs/`, incluidos los requisitos, se conserva localmente y está
excluida del control de versiones mediante `.gitignore`.

## Repositorio

[pokemon-trainer-app](https://github.com/valencia12/pokemon-trainer-app)
