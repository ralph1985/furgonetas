# Repository Guidelines

## Objetivo

Crear un gestor visual de ofertas de furgonetas para comparar y decidir compra. Este agente prioriza: 1) capturar datos fiables desde fotos de ofertas, 2) normalizarlos en un formato único, 3) mostrar comparativas claras (precio contado/financiado, descuentos, extras, color, entrega).

## Estructura y datos

- Este proyecto vive en `projects/furgoneta/` (fuera de los workspaces). Usa el monorepo raíz para scripts comunes.
- Datos normalizados en varios JSON (estilo relacional):
  - `data/brands.json`: marcas y logo.
  - `data/sources.json`: origen de la oferta (Carwow, concesionario, etc.).
  - `data/dealers.json`: concesionarios (id, nombre, ciudad, sourceId).
  - `data/offers.json`: ofertas con ids de marca/dealer/source y campos económicos (`pvp`, `descuento`, `base_imponible`, `iva`, `iem`, `total_contado`, `total_financiado`, `matriculacion`, `otros_costes`, `opciones`, `color`, `kms`, `notas`, `enlace`, `mantenimiento`, etc.).
- Fotos crudas en `projects/furgoneta/tmp/images/<marca>/` si las hubiera; enlaza la ruta en cada oferta.
- Estilo de código: 2 espacios, comillas simples, Conventional Commits. Ejecuta `npm run format`/`npm run lint` desde la raíz cuando haya código.

## Flujo para añadir/analizar ofertas

1. Añade foto(s) a `tmp/images/<marca>/` (ej. `tmp/images/citroen/`). 2) Extrae cifras tal cual aparecen (precio base, descuento, IVA, total contado/financiado, opciones). 3) Normaliza en los JSON relacionales: añade marca en `brands` (si falta), dealer en `dealers` (id + city + sourceId), y la oferta en `data/offers.json` referenciando esos ids. 4) Añade meta opcional (consumo, etiqueta, mantenimiento, enlace, logo personalizado si aplica). 5) Validación rápida: comprueba que `total_contado` ≈ `pvp` - `descuento` + matriculación + otros_costes + iem; si no cuadra, deja nota. Rellena `total_financiado`, `iem` y `otros_costes` si vienen en la oferta. 6) Anota dudas en `notas` si algún dato queda borroso para revisarlo con el comercial. 7) Los nuevos datos se añadirán vía agente (IA) que analiza las ofertas y vuelca el JSON tras validar los cálculos.

## UI/funcionalidad propuesta

- Lista/tabla comparativa con filtros (precio, motor, transmisión, color, año/matrícula, km).
- Tarjetas visuales con foto, resumen de precio contado/financiado y badge de descuentos.
- Detalle: desglose PVP, descuentos, IVA/IEM, extras, entrega, notas de dudas, contacto del comercial, fecha de validez.
- Adjuntos: link a la foto original si la hay; no se usa estado de revisión en el dashboard actualmente.

## Comandos útiles

- En este proyecto (Astro): `npm install`, `npm run dev`, `npm run build`, `npm run preview`. Fuente de datos: JSON relacionales en `data/` consumidos vía `src/lib/data.ts`.
- En la raíz (si necesitas scripts comunes): `npm install`, `npm run dev | build | lint | format | test | test:e2e`, `npm run home`.

## Gestión de tareas y horas

- Para este proyecto no se registran horas en `data/projects-tasks.json`; céntrate en mantener `data/offers.json` y el dashboard al día.
