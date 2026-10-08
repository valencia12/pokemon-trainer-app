# Plan de pruebas básico

Primero probaremos las reglas que pueden romper el flujo. Usaremos Vitest para funciones y peticiones con `fetch` simulado, sin consultar la API real. Estas pruebas están pendientes de implementar.

## Pruebas automatizadas propuestas

| Área | Casos | Resultado esperado |
| --- | --- | --- |
| Variable de entorno | URL con y sin barra final; variable vacía; URL inválida | Mantiene `/api/v2/`; rechaza la configuración inválida con un mensaje claro. |
| Cliente HTTP | Respuesta correcta, error HTTP y cancelación | Usa la URL del entorno; devuelve los datos; comunica el error; libera el loader. |
| Búsqueda | Nombre parcial, `#025` y sin resultados | Encuentra los Pokémon esperados o devuelve una lista vacía. |
| Selección | Añadir, quitar e intentar agregar un cuarto Pokémon | Admite hasta tres Pokémon diferentes. |
| Entrenadores | Guardar el equipo de uno entre dos perfiles | El equipo del otro entrenador permanece igual. |
| Estadísticas | Valor normal, valor superior al máximo y dato ausente | Calcula el porcentaje; limita la barra al 100 %; muestra el texto de dato no disponible. |

## Revisión manual antes del deploy

1. Crear dos entrenadores y guardar equipos diferentes; recargar y comprobar que se conservan.
2. Revisar búsqueda, scroll del catálogo, flechas y deslizamiento del carrusel en móvil; comprobar los temas claro y oscuro.
3. Después del despliegue, abrir y recargar una ruta como `/equipos`; confirmar que carga la aplicación y que las peticiones apuntan a PokéAPI.

## Orden

1. Instalar Vitest y añadir el script `npm test`.
2. Implementar las seis áreas anteriores con casos pequeños y datos de prueba locales.
3. Ejecutar `npm test`, `npm run lint` y `npm run build`.
4. Configurar `VITE_POKE_API_BASE_URL` en el proveedor, desplegar `dist` y hacer la revisión manual.

Por ahora no hacen falta pruebas de capturas, del funcionamiento interno de Swiper ni del servicio externo de PokéAPI.
