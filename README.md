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
el formulario con el perfil guardado. Guardar abre la vista de revisión con el panel actualizado; «Continuar» abre el equipo o el resumen según el progreso. «Limpiar»
limpia solo el formulario; no borra el perfil guardado.

El estado vacío usa la imagen de Pikachu proporcionada y el mensaje de que aún no hay
entrenadores configurados. Su acción abre el formulario desde el inicio; si ya
estás en el formulario, enfoca el campo de nombre. No se crean perfiles de ejemplo.
La ilustración decorativa está en `src/assets/pikachu-empty-state.png`.

Se pueden guardar varios entrenadores, cada uno con su propio equipo de Pokémon.
«Crear un nuevo entrenador» abre un formulario vacío sin reemplazar perfiles.
Seleccionar una tarjeta muestra la información de ese entrenador en `/entrenador/ver`.
«Editar» abre su formulario y «Continuar» abre su equipo o resumen.
No hay un límite fijo de perfiles; la capacidad depende del almacenamiento del
navegador y el tamaño de las fotos. Se avisa cuando no se pueden persistir cambios.
El perfil guardado con la versión anterior se recupera como primer entrenador,
conservando también su equipo. El formato nuevo se guarda bajo `pokemon-trainer:v2`. El panel muestra datos reales,
sin entrenadores de ejemplo. Los componentes `Panel`, `Icon`, `WorkflowHeader`
y `ConfiguredTrainerPanel` se reutilizan entre las vistas.

## Selección de Pokémon

La pantalla de equipo consulta los primeros 151 Pokémon y sus detalles en PokeAPI.
Las peticiones se limitan a seis simultáneas y los resultados se conservan en memoria
para reutilizarlos durante la sesión. Los sprites se leen de
`sprites.other.home.front_default`, sin construir URLs de imágenes manualmente.

Se puede buscar por nombre parcial o ID exacto (también `#025`). El equipo admite
exactamente tres Pokémon diferentes. Al completar los espacios, se pueden quitar
miembros para seleccionar otros. Guardar persiste el equipo y abre el perfil con sus estadísticas. Editar el equipo recupera los IDs guardados.

Los fallos de red muestran un botón para reintentar. Salir de la pantalla cancela
las peticiones. El loader global se mantiene activo durante la carga del catálogo.
La imagen tiene un reemplazo si no está disponible. Los tipos y etiquetas están
en el JSON de textos, y el tamaño del equipo en `src/config/pokemon.json`.

## Directorio de equipos

El menú «Equipos Pokémon» abre `/equipos`, donde se muestran todos los entrenadores
y sus equipos. «Elegir Pokémon» permite completar un equipo vacío; «Editar equipo»
recupera la selección guardada. «Ver equipo y estadísticas» abre el resumen cuando
hay tres miembros. Cada acción activa al entrenador correspondiente antes de navegar.
La ruta del directorio siempre está disponible; sin entrenadores muestra una acción
para crear el primero. También se puede acceder desde el menú de inicio.

## Perfil y estadísticas

El resumen muestra foto, nombre, pasatiempo y edad calculada. El documento se
muestra solo cuando tiene contenido, como DUI o carnet según la edad.
Los botones de edición abren los datos y el equipo del entrenador activo.

Cada Pokémon muestra su sprite HOME, nombre, tipos y seis barras. Los máximos
están en `src/config/pokemon.json`: HP 255, ataque 190, defensa 230,
ataque especial 194, defensa especial 230 y velocidad 180. El porcentaje es
`valor / máximo × 100`; la barra se limita al 100 % sin ocultar el valor original.

Al recargar el perfil se consultan solo sus tres Pokémon. La caché de sesión
reutiliza los detalles ya cargados. Los fallos permiten reintentar y salir cancela
las peticiones. Cambiar de entrenador no muestra datos del equipo anterior.

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

Los flujos de entrenador, selección de equipo y resumen del perfil están implementados.
Las rutas de equipo y perfil requieren un entrenador; el perfil también requiere
un equipo de tres Pokémon.

## Desarrollo

```sh
npm ci
cp .env.example .env
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

### Catálogo y tarjetas del equipo

El catálogo utiliza TanStack Virtual para renderizar las filas visibles y dos filas adicionales. Las columnas se ajustan al ancho del contenedor y las filas se miden para respetar el contenido. Una búsqueda nueva vuelve al inicio sin borrar la selección.

Las estadísticas utilizan Swiper: una tarjeta en contenedores pequeños, dos desde 480 px y tres desde 760 px. Se puede deslizar, usar las flechas del teclado o las flechas situadas en los extremos del carrusel. Los textos accesibles están en `src/config/texts.es.json`.

## Variable de entorno

La URL base de PokéAPI se configura en `.env`:

```dotenv
VITE_POKE_API_BASE_URL=https://pokeapi.co/api/v2/
```

`src/lib/env.ts` lee la variable y valida que sea una URL HTTP o HTTPS. Acepta la URL con o sin barra final. El cliente HTTP la utiliza para todas las consultas. Los paths de los endpoints permanecen en `src/config/endpoints.json`.

El archivo `.env` se ignora en Git; `.env.example` sirve de plantilla. Reinicia `npm run dev` después de cambiar la variable. En el proveedor de despliegue configura la misma variable antes de ejecutar `npm run build`; publica la carpeta `dist` y habilita la redirección de rutas a `index.html`. Las variables `VITE_` son públicas en el navegador.

El plan de pruebas básico está en [TEST_PLAN.md](TEST_PLAN.md).

El tema sigue la preferencia del sistema mientras no exista una elección manual guardada. Al usar la luna, se conserva el tema elegido. Los cambios de color tienen una transición suave de 280 ms, desactivada cuando el usuario solicita movimiento reducido. La carga inicial no se anima.

## Docker y entrega como archivo

El Dockerfile compila con Node y sirve `dist` con Nginx. La configuración permite recargar rutas de React como `/equipos`. `.dockerignore` excluye las dependencias locales, Git, `.env` y las entregas generadas.

Con Docker Desktop iniciado y `.env` creado desde `.env.example`, puedes ejecutar la aplicación desde el código:

```bash
docker compose up --build -d
```

Abre http://localhost:8080. Detén el servicio con `docker compose down`.

Para generar la entrega para una computadora Intel/AMD:

```bash
sh scripts/export-docker.sh amd64
```

Para una computadora ARM, como un Mac con chip M:

```bash
sh scripts/export-docker.sh arm64
```

El script necesita Node en la computadora que genera la entrega para leer la configuración de Compose. Construye la imagen para la arquitectura elegida, comprueba la configuración de Nginx y que `/` y `/equipos` sirven la aplicación; después exporta la imagen.

Envía los dos archivos de `delivery/amd64/` o `delivery/arm64/`: `pokemon-trainer-app.tar` e `INSTRUCCIONES.md`. El destinatario solo necesita Docker e internet. La entrega contiene únicamente los archivos compilados y el servidor; no incluye tus entrenadores locales.

La variable `VITE_POKE_API_BASE_URL` se toma de `.env` al construir la imagen. Para cambiarla, reconstruye y exporta de nuevo. El `.env` no se copia a la imagen.
