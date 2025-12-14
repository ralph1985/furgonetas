# Repository Guidelines

## Objetivo
Crear un gestor visual de ofertas de furgonetas para comparar y decidir compra. Este agente prioriza: 1) capturar datos fiables desde fotos de ofertas, 2) normalizarlos en un formato único, 3) mostrar comparativas claras (precio contado/financiado, descuentos, extras, color, entrega).

## Estructura y datos
- Este proyecto vive en `projects/furgoneta/` (fuera de los workspaces). Usa el monorepo raíz para scripts comunes.
- Guarda fotos crudas en `projects/furgoneta/tmp/images/` (subcarpetas por marca, ej. `citroen/`) y referencias normalizadas en `projects/furgoneta/data/offers.json` con campos: `id`, `fuente`, `concesionario`, `contacto`, `modelo`, `motorizacion`, `cambio`, `acabatetapiceria`, `color`, `opciones`, `pvp`, `descuento`, `base_imponible`, `iva`, `iem`, `total_contado`, `total_financiado`, `matriculacion`, `kms`, `entrega`, `notas`, `foto`.
- Estilo de código: 2 espacios, comillas simples, Conventional Commits. Ejecuta `npm run format`/`npm run lint` desde la raíz cuando haya código.

## Flujo para añadir/analizar ofertas
1) Añade foto(s) a `tmp/images/<marca>/` (ej. `tmp/images/citroen/`). 2) Extrae cifras tal cual aparecen (precio base, descuento, IVA, total contado/financiado, opciones). 3) Normaliza en `data/offers.json` y enlaza la foto. 4) Anota dudas en `notas` si algún dato queda borroso para revisarlo con el comercial.

## Ofertas importadas (14/12/2025)
- **Berlingo Talla M BlueHDi 130 S&S EAT8 MAX (Autos Velasco)**: vehículo nuevo. PVP 28.154,82 €; descuento 3.829,21 €; base imponible 24.325,61 €; IVA 21% 5.108,38 €; subtotal vehículo ≈ 29.433,99 €. Total contado en oferta: 30.309,99 €. Color Gris Artense, tapicería Tela Quartz. Matriculación 2024, km 0. Entrega en cliente con matrícula incluida (ver hoja).
- **Berlingo Talla M BlueHDi 100 S&S 6v PLUS (Autos Velasco)**: vehículo nuevo. PVP 23.389,57 €; descuento ~3.539 € (revisar); base imponible ~19.851 €; IVA ~4.168 €; subtotal vehículo ~24.019 €. Opciones 328,57 €; total contado en oferta: 25.493,98 €. Color Kaolin/Kalman (confirmar lectura), tapicería TEP mixto Quartz/Mistral (confirmar). Matriculación 2024, km 0.

## UI/funcionalidad propuesta
- Lista/tabla comparativa con filtros (precio, motor, transmisión, color, año/matrícula, km).
- Tarjetas visuales con foto, resumen de precio contado/financiado y badge de descuentos.
- Detalle: desglose PVP, descuentos, IVA/IEM, extras, entrega, notas de dudas, contacto del comercial, fecha de validez.
- Adjuntos: link a la foto original si la hay; no se usa estado de revisión en el dashboard actualmente.

## Comandos útiles
- En este proyecto (Astro): `npm install`, `npm run dev`, `npm run build`, `npm run preview`. Fuente de datos: `data/offers.json`.
- En la raíz (si necesitas scripts comunes): `npm install`, `npm run dev | build | lint | format | test | test:e2e`, `npm run home`, `npm run task:add`.

## Gestión de tareas y horas
- Para este proyecto no se registran horas en `data/projects-tasks.json`; céntrate en mantener `data/offers.json` y el dashboard al día.
