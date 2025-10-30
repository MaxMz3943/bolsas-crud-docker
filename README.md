# CRUD Bolsas de Piel — Express + MongoDB (Docker)

CRUD mínimo (leer, agregar, eliminar) **y update opcional** para la colección `bolsas`,
listo para ejecutar con Docker. Incluye búsqueda por texto, semillas de datos y colecciones
para Thunder Client / Postman.

## Requisitos
- Docker y Docker Compose
- (Opcional) MONGO_URI de la materia (Atlas) si usarás la opción de 1 contenedor

## Cómo correr (Opción A: 2 contenedores — API + Mongo local)
```bash
docker compose up -d --build
# (opcional) crear índices y cargar semillas
docker compose exec app npm run create-indexes
docker compose exec app npm run seed
# probar:
curl -s http://localhost:3000/api/bolsas | jq
```

## Cómo correr (Opción B: 1 contenedor — API con Mongo externo/Atlas)
1. Copia `.env.example` a `.env` y agrega `MONGO_URI` (cluster de la materia).
2. Inicia:
   ```bash
   docker compose -f docker-compose.one.yml up -d --build
   ```
3. Crea índices y seed (si quieres):
   ```bash
   docker compose -f docker-compose.one.yml exec app npm run create-indexes
   docker compose -f docker-compose.one.yml exec app npm run seed
   ```

## Endpoints (colección `bolsas`)
- **GET** `/api/bolsas` — lista todas
- **GET** `/api/bolsas/search?q=texto` — búsqueda por nombre/descripcion
- **POST** `/api/bolsas` — crea una
  ```json
  {
    "sku": "BOL-CLAS-001",
    "nombre": "Bolsa Clásica de Piel",
    "precio": 1899,
    "descripcion": "Bolsa tote de piel vacuna",
    "categoria": "tote",
    "variantes": [{"color":"Negro","acabado":"Mate","stock":5}]
  }
  ```
- **PATCH** `/api/bolsas/:id` — (bonus) actualizar parcial
- **DELETE** `/api/bolsas/:id` — eliminar por id

## Importar colecciones (Thunder Client / Postman)
- `collections/thunder-collection.json`
- `collections/postman_collection.json`

## Evidencias
- `evidence/Guia_Evidencias.md` — Guion para capturas y explicación.
- Agrega screenshots de:
  - `docker compose up -d --build`
  - Logs de conexión OK
  - POST 201, GET 200, DELETE 200, (opcional PATCH 200)

---
© 2025-10-30
