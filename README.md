# Pokémon Trainer

Aplicación de React, TypeScript y Vite para configurar un entrenador y elegir un equipo de tres Pokémon.

## Inicio y menú

La ruta `/` muestra un menú antes del formulario. Sin datos guardados, ofrece crear
un entrenador. Con un entrenador, muestra una vista previa con foto, nombre y
cantidad de Pokémon; permite editar sus datos y continuar con el equipo.
El acceso al perfil aparece al completar los tres Pokémon. Las rutas desconocidas
y el acceso a rutas protegidas sin entrenador vuelven al inicio.

## Maquetación del panel

La tipografía usa Arial/Helvetica, con títulos fuertes en mayúsculas y textos
sencillos, siguiendo la referencia tipográfica. El encabezado no usa etiquetas
ni puntos decorativos.

La referencia visual se traduce en una barra lateral, un encabezado con el paisaje
«Serene Lakeside Village and Mountains», indicador de tres pasos y paneles de información. El paisaje se importa desde
`src/assets/serene-lakeside.png` y tiene una capa de contraste para ambos temas. En móvil,
la navegación aparece arriba y los paneles se apilan. El tema oscuro conserva
el fondo negro azabache; los controles usan grises y conservan acentos amarillos Pokémon.

El inicio mantiene su menú previo al formulario. La página del entrenador combina
el formulario con el perfil guardado. Guardar actualiza el panel sin salir de la
pantalla; «Continuar» abre el equipo o el resumen según el progreso. «Limpiar»
limpia solo el formulario; no borra el perfil guardado.

El estado vacío usa la imagen de Pikachu proporcionada y el mensaje de que aún no hay
entrenadores configurados. Su acción abre el formulario desde el inicio; si ya
estás en el formulario, enfoca el campo de nombre. No se crean perfiles de ejemplo.
La ilustración decorativa está en `src/assets/pikachu-empty-state.png`.

Por ahora existe un solo perfil por navegador. El panel muestra datos reales,
sin entrenadores de ejemplo. Los componentes `Panel`, `Icon`, `WorkflowHeader`
y `ConfiguredTrainerPanel` se reutilizan entre las vistas.

## Calendario

`DatePicker` es un selector reutilizable con un calendario propio. Muestra fechas
como `dd/mm/aaaa` y conserva valores `YYYY-MM-DD` para las validaciones.
Permite seleccionar mes y año, navegar con flechas y limpiar la fecha.
No permite fechas futuras en el formulario. El mínimo está en `src/config/calendar.json`.
Los meses, días y etiquetas están en el JSON de textos.

El diálogo se adapta a ambos temas, usa amarillo para la selección y gris para
los controles. Admite teclado (flechas, Inicio, Fin, Page Up y Page Down), Escape
para cerrar y devuelve el foco al campo.

## Estado actual

El formulario del entrenador permite cargar una foto, ingresar nombre, pasatiempo,
fecha de nacimiento y documento. Calcula la edad, exige DUI a partir de los 18 años
y agrega su guion automáticamente; para menores, el carnet es opcional.

Los datos se guardan en localStorage y se recuperan al recargar. Si el navegador
no permite guardarlos, se muestra un aviso y la aplicación sigue funcionando
durante la sesión. La foto admite JPG, PNG y WebP hasta 2 MB.

La selección de Pokémon y la pantalla de perfil todavía están pendientes.
Las rutas de equipo y perfil requieren un entrenador; el perfil también requiere
un equipo de tres Pokémon.

## Desarrollo

```sh
npm ci
npm run dev
npm run build
npm run lint
```

## Loader reutilizable

`LoadingOverlay` muestra el GIF Pokémon sobre un fondo oscuro que cubre la pantalla.
Mientras carga, el contenido de la aplicación queda inactivo y se bloquea el scroll.
El mensaje predeterminado viene de `src/config/texts.es.json`.

Las peticiones que usan `getJson` lo activan automáticamente, hasta terminar de leer
el JSON. También se oculta ante errores o cancelaciones. Si hay varias peticiones,
permanece visible hasta que todas terminan.

Para otras operaciones, usa el hook:

```tsx
const { withLoading } = useLoading()
await withLoading(() => procesarInformacion())
```

`withLoading` devuelve el resultado de la operación y propaga sus errores;
el código que lo llama debe manejarlos. Para un estado de carga local puedes usar
`<LoadingOverlay isLoading={isLoading} />`. El bloqueo del contenido con `inert`
lo administra `AppProviders` para el loader global.

## Estilos con Tailwind

Usamos Tailwind CSS 4 con el plugin `@tailwindcss/vite` en `vite.config.ts`.
`src/index.css` importa Tailwind, define los colores mediante `@theme` y conserva
solo estilos base. Los componentes usan clases de utilidad directamente en JSX.

Ejemplo: `bg-brand text-white rounded-xl px-6 py-4`. Los colores `brand`, `danger`
y `muted` son compartidos; cambia su valor en `@theme` para actualizar el proyecto.
Las clases responsive ajustan la distribución según el ancho de la pantalla.
Escribe nombres de clases completos para que Tailwind pueda detectarlos.
Los textos visibles siguen viniendo del JSON.

## Temas claro y oscuro

El selector con una luna del encabezado alterna entre claro y oscuro. La preferencia se guarda
en localStorage y se aplica antes de renderizar la aplicación. El tema inicial
es claro, con fondo blanco. El oscuro usa un fondo negro azabache (`#0a0a0a`), superficies grises oscuras y textos claros.

La paleta combina grises y amarillo `#ffcb05`, con variantes para superficies,
bordes y mensajes. Las Poké Balls son rojas y blancas. Los colores están en `src/index.css`: los componentes usan
`bg-surface`, `text-ink`, `text-brand` y `bg-accent`, sin decidir el tema por separado.
Si localStorage no está disponible, el cambio funciona durante la sesión.

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

Cada rama `feature/...` se crea al comenzar la funcionalidad correspondiente.

Las ramas `release/...` y `hotfix/...` se crean cuando hay una entrega o una
corrección concreta que preparar.

Cada funcionalidad se entrega en un único commit en su rama. Antes de integrarla,
se revisan los cambios y se ejecutan las comprobaciones correspondientes.
Los commits y comentarios del código se escriben en inglés.
Los mensajes de commit usan un prefijo como `feat:`, `fix:` o `docs:`.

Ejemplo para la siguiente funcionalidad:

```sh
git switch develop
git switch -c feature/trainer-setup
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
