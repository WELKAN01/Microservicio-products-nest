# Microservicio de Productos

Este microservicio gestiona la información de productos para el sistema "Proyecto Money".

## Endpoints principales

- `GET /products` - Lista todos los productos.
- `GET /products/:id` - Obtiene un producto por ID.
- `POST /products` - Crea un nuevo producto.
- `PUT /products/:id` - Actualiza un producto existente.
- `DELETE /products/:id` - Elimina un producto.

## Modelo de Producto

```typescript
export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}
```

## Ejemplo de petición para crear producto

```json
POST /products
{
  "name": "Producto ejemplo",
  "description": "Descripción del producto",
  "price": 100.0,
  "stock": 50
}
```

## Tecnologías utilizadas

- NestJS
- TypeScript
- MongoDB (o base de datos correspondiente)
- Docker (opcional)

## Notas

- Asegúrate de validar los datos de entrada.
- Implementa manejo de errores adecuado.
- Considera agregar autenticación y autorización según sea necesario.

## Dev
1. Clonar el repositorio
2. Instalar dependecias
3. crear un archivo .env basado en el env.template
4. Levantar el servidor de NATS

docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats

5. Tener levantados los microservicios que se van a consumir
6. Levantar proyecto con npm run start:dev