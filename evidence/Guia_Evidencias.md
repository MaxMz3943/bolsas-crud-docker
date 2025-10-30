# Evidencias — CRUD Bolsas de Piel

1) **Arranque**: `docker compose up -d --build` (2 contenedores) o `-f docker-compose.one.yml` (1 contenedor con Atlas).
2) **Conexión**: captura de logs con `Servidor corriendo` y `Conectado a MongoDB`.
3) **Índices y seed**: `docker compose exec app npm run create-indexes` y `npm run seed`.
4) **Pruebas**:
   - POST 201 creando bolsa.
   - GET 200 listando.
   - DELETE 200 eliminando por id.
   - (Bonus) PATCH 200 actualizando algún campo.
5) **Explicación**: breve texto de qué hace cada endpoint y por qué Docker facilita la entrega reproducible.
