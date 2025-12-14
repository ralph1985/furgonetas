# Repository Guidelines

## Objetivo

Crear un gestor visual de ofertas de furgonetas para comparar y decidir compra. Este agente prioriza: 1) capturar datos fiables desde fotos de ofertas, 2) normalizarlos en un formato único, 3) mostrar comparativas claras (precio contado/financiado, descuentos, extras, color, entrega).

## Estructura y datos

- Este proyecto vive en `projects/furgoneta/` (fuera de los workspaces). Usa el monorepo raíz para scripts comunes.
- Guarda fotos crudas en `projects/furgoneta/tmp/images/` (subcarpetas por marca, ej. `citroen/`) y referencias normalizadas en `projects/furgoneta/data/offers.json` con campos: `id`, `fuente` (ej. Carwow o concesionario), `concesionario`, `contacto`, `modelo`, `motorizacion`, `cambio`, `acabatetapiceria`, `color`, `opciones`, `pvp`, `descuento`, `base_imponible`, `iva`, `iem`, `total_contado`, `total_financiado`, `matriculacion`, `kms`, `entrega`, `notas`, `foto`. Campos meta opcionales: `meta.consumo_l_100`, `meta.etiqueta`, `meta.enlace`, `meta.mantenimiento`, `meta.logo` (si el logo no es inferible por marca) y otros datos de equipamiento.
- Estilo de código: 2 espacios, comillas simples, Conventional Commits. Ejecuta `npm run format`/`npm run lint` desde la raíz cuando haya código.

## Flujo para añadir/analizar ofertas

1. Añade foto(s) a `tmp/images/<marca>/` (ej. `tmp/images/citroen/`). 2) Extrae cifras tal cual aparecen (precio base, descuento, IVA, total contado/financiado, opciones). 3) Normaliza en `data/offers.json` y enlaza la foto; añade `fuente` para distinguir Carwow de ofertas directas. 4) Añade meta opcional (consumo, etiqueta, mantenimiento, enlace, logo personalizado si aplica). 5) Validación rápida: comprueba que `total_contado` ≈ `pvp` - `descuento` + matriculación + otros_costes + iem; si no cuadra, deja nota. Rellena `total_financiado`, `iem` y `otros_costes` si vienen en la oferta. 6) Anota dudas en `notas` si algún dato queda borroso para revisarlo con el comercial. 7) Los nuevos datos se añadirán vía agente (IA) que analiza las ofertas y vuelca el JSON tras validar los cálculos.

## UI/funcionalidad propuesta

- Lista/tabla comparativa con filtros (precio, motor, transmisión, color, año/matrícula, km).
- Tarjetas visuales con foto, resumen de precio contado/financiado y badge de descuentos.
- Detalle: desglose PVP, descuentos, IVA/IEM, extras, entrega, notas de dudas, contacto del comercial, fecha de validez.
- Adjuntos: link a la foto original si la hay; no se usa estado de revisión en el dashboard actualmente.

## Comandos útiles

- En este proyecto (Astro): `npm install`, `npm run dev`, `npm run build`, `npm run preview`. Fuente de datos: `data/offers.json`.
- En la raíz (si necesitas scripts comunes): `npm install`, `npm run dev | build | lint | format | test | test:e2e`, `npm run home`.

## Gestión de tareas y horas

- Para este proyecto no se registran horas en `data/projects-tasks.json`; céntrate en mantener `data/offers.json` y el dashboard al día.
