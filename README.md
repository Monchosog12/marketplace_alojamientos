# Marketplace de Alojamientos

Proyecto de curso de **Desarrollo de Sistemas de Información 3**

## Integrantes


| Nombre completo | Correo institucional |
| --------------- | -------------------- |
| Simón Farfan  | sfarfan@unbosque.edu.co |
| Julio Rondón  | jrondonc@unbosque.edu.co |
| Nicolas Mahecha  | nmahecha@unbosque.edu.co |

Repositorio: _URL del repositorio_

## Tecnologías utilizadas

- **Angular 22** 
- **Angular Router** 
- **Bootstrap** 


## Requisitos para ejecutar la aplicación

- **Node.js**
- **Conexión a internet** 

## Instrucciones de instalación

```bash
# 1. Clonar el repositorio (o descomprimir el .zip) y entrar a la carpeta del proyecto
git clone <URL-del-repositorio>
cd marketplace_alojamientos

# 2. Instalar las dependencias
npm install
```

## Instrucciones de ejecución

```bash
npm start
```

 Abra **http://localhost:4200/** en el navegador. 


| Comando         | Para qué sirve                                         |
| --------------- | ------------------------------------------------------ |
| `npm start`     | Servidor de desarrollo en `http://localhost:4200/`     |

### Recorrido sugerido para probarla

1. En **Inicio** pulse **Buscar alojamientos**.
2. En **Alojamientos** use los filtros (ciudad, huéspedes, tipo, precio máximo) y **Limpiar filtros**.
3. Abra un alojamiento con **Ver detalle**.
5. Pulse **Reservar**, escriba nombre y correo y **Confirmar reserva**.
6. Se abrirá **Mis reservas** con la reserva en estado `CONFIRMADA`.

## Datos de la aplicación

Los datos iniciales están en **`public/assets/data/alojamientos.json`**
Se consultan **únicamente desde el servicio `Alojamientoservice`** (`HttpClient`); ningún componente importa el JSON.

Estructura:

```jsonc
{
  "alojamientos": [
    {
      "id": 1, "nombre": "...", "descripcion": "...", "ciudad": "Bogotá", "ubicacion": "...",
      "tipo": "Apartamento", "capacidad": 2, "habitaciones": 1, "camas": 1, "banos": 1,
      "precioNoche": 180000, "tarifaLimpieza": 45000, "calificacion": 4.8, "activo": true,
      "imagenPrincipal": "<url>", "imagenes": ["<url>"], "servicios": ["Wi-Fi"], "reglas": ["No fumar"]
    }
  ],
  "resenas": [
    { "id": 1, "alojamientoId": 1, "usuario": "Laura Gómez", "calificacion": 5, "comentario": "..." }
  ]
}
```

- Contiene 36 alojamientos (6 ciudades: Bogotá, Cartagena, Guatapé, Villa de Leyva, Medellín y Armenia) y 12 reseñas.
  El alojamiento `6` está marcado como `"activo": false` y por regla de negocio **nunca se muestra**.
- Se conservó la estructura del JSON suministrado en el enunciado y se complementó: la lista `imagenes` se llenó con la
  imagen principal y se agregaron reseñas de ejemplo.
- Las imágenes son URLs externas (por eso se necesita internet).

## Principales funcionalidades

| Requisito del enunciado | Dónde está |
| ----------------------- | ---------- |
| Página inicial (nombre, descripción, destacados, acceso a la búsqueda) | Ruta `/` – `Maincomponent` |
| Listado con imagen, nombre, ciudad, tipo, capacidad, precio, calificación y servicios | `/alojamientos` – `Listadocomponent` + `Tarjetaalojamientocomponent` |
| Filtros por ciudad, huéspedes, tipo y precio máximo, dinámicos y con botón de limpiar | `Filtrocomponent` + `utils/filtros.ts` |
| Detalle completo (galería, ubicación, habitaciones, camas, baños, servicios, reglas, reseñas) | `/alojamientos/:id` – `Infoalojamientoscomponent` |
| Mis reservas (con mensaje cuando no hay) | `/misreservas` – `Misreservascomponent` |
| Destacados (calificación ≥ 4.7) | `/destacados` – `Destacadoscomponent` |

### Reglas de negocio implementadas

- La fecha de salida debe ser posterior a la de llegada.
- La fecha de llegada no puede ser anterior a la fecha actual.
- El número de huéspedes debe ser mayor que cero y no superar la capacidad del alojamiento.
- El precio por noche debe ser mayor que cero (si no, no se cotiza ni se lista).
- subtotal = noches × precio por noche`; `tarifa de servicio = 10 % del subtotal;
  total = subtotal + tarifa de limpieza + tarifa de servicio.
- No se muestran alojamientos inactivos.
- Cuando una búsqueda no encuentra resultados se informa al usuario.

## Estructura general del proyecto

```
marketplace_alojamientos/
├── public/assets/data/
│   ├── alojamientos.json        # Datos de la aplicación (alojamientos y reseñas)
├── src/
│   ├── index.html               # Bootstrap (CDN), fuentes
│   ├── styles.css               # Estilos globales y tokens de diseño
│   └── app/
│       ├── app-module.ts        # Módulo raíz (HttpClient)
│       ├── app-routing-module.ts# Rutas de la aplicación
│       ├── models/              # Interfaces TypeScript (alojamiento, reseña, reserva)
│       ├── services/
│       │   ├── alojamientoservice.ts   # Acceso a datos (lee el JSON vía HttpClient)
│       └── components/
│           ├── navbarcomponent / footercomponent        # Navegación y pie
│           ├── maincomponent                            # Página inicial
│           ├── listadocomponent + filtrocomponent       # Listado y filtros
│           ├── infoalojamientoscomponent                # Detalle (ruta con parámetro)
│           ├── misreservascomponent                     # Consulta de reservas
│           └── destacadoscomponent                      # Destacados
└── angular.json, package.json, tsconfig*.json
```

**Separación de responsabilidades:** presentación (componentes y plantillas), navegación (Angular Router), acceso a datos
(`Alojamientoservice`), formularios ( `Reservaformcomponent`), manejo de
reservas (`Reservasservice`).

### Mapa de navegación

| Ruta                 | Pantalla                    |
| -------------------- | --------------------------- |
| `/`                  | Inicio                      |
| `/alojamientos`      | Listado y filtros           |
| `/alojamientos/:id`  | Detalle y reserva |
| `/destacados`        | Alojamientos destacados     |
| `/misreservas`       | Mis reservas                |

n using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
