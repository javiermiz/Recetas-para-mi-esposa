# Guía de Desarrollo Web

## Estructura General del Proyecto

### Convenciones de Nomenclatura

- Se utiliza `snake_case` para todos los nombres de archivos, funciones y variables
- Funciones JavaScript se escriben utilizando arrow functions

### Organización del Código

- Contenido separado en secciones modulares
- Constantes de contenido definidas en objetos `CONTENT`
- Imágenes importadas y referenciadas desde módulos

## Estructura de Secciones

### Anatomía de una Sección

```html
<section class="[spacing-classes]">
  <div class="container">
    <!-- Contenido -->
  </div>
</section>
```

### Espaciado Vertical

- Mobile: `py-16` (48px arriba y abajo)
- Desktop: `py-24` (112px arriba y abajo)
- Prop opcional para eliminar padding superior cuando hay secciones contiguas

### Sistema de Contenedores

- Contenedor principal con clase `container`
- Paddings laterales automáticos
- Centrado por defecto

### Estructura de Contenido

## Prácticas de Desarrollo

### JavaScript

- Uso mínimo de JavaScript
- Preferencia por soluciones basadas en HTML y CSS
- Cuando se necesita JS, usar arrow functions

### Documentación

- Uso de jsDoc para documentación de funciones
- Comentarios explicativos para lógica compleja

### Datos

- Datos estructurados en objetos `CONTENT`
- Separación clara entre datos y presentación

```javascript
export const CONTENT = {
  section: {
    title: '',
    subtitle: {
      text: '',
      highlight: '',
    },
    description: '',
  },
  // ...más datos
};
```

### Responsive Design

- Mobile-first approach
- Breakpoints definidos con prefijos (md:, lg:)
- Flexbox para layouts adaptables

### Optimización

- Importación de imágenes como módulos
- Alt tags descriptivos para accesibilidad
- Clases utilitarias para estilos

## Buenas Prácticas

- Componentes modulares y reutilizables
- Estructura semántica HTML
- Separación de contenido y presentación
- Sistema de espaciado consistente
