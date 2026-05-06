# Research: Design System Documentation Template

> Template completo para documentar un design system en Astro

---

## 1. Front Matter (YAML)

### metadata
```yaml
version: alpha | beta | 1.0.0
name: Nombre del sistema
description: Descripción de 2-3 oraciones del sistema
```

### colores
Definir todos los colores del sistema:
- **Brand/Accent**: color primario principal y sus variantes (hover, active)
- **Surface**: fondos (canvas, surface-dark, surface-soft, elevated)
- **Text**: colores para texto (ink, body, mute, on-dark)
- **Semantic**: estados (error, warning, success, info)
- **Functional**: border, divider, overlay, disabled

### tipografia
Escribir cada token con todas sus propiedades:
```yaml
token-name:
  fontFamily: fuente principal
  fontSize: tamaño en px
  fontWeight: 400 | 700
  lineHeight: valor
  letterSpacing: valor
  textTransform: uppercase | none
```

### spacing
Escala de espaciado basada en múltiplos de 4 u 8px:
```yaml
xxs: 2px
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
xxl: 32px
section: 64px
```

### borderRadius
```yaml
none: 0px
sm: 2px
md: 4px
lg: 8px
full: 9999px
```

### shadows (opcional)
```yaml
sm: "0 1px 2px rgba(0,0,0,0.05)"
md: "0 4px 6px rgba(0,0,0,0.1)"
```

### componentes
Definir cada componente con sus propiedades CSS:
```yaml
component-name:
  backgroundColor: color token
  textColor: color token
  typography: typography token
  borderRadius: borderRadius token
  padding: valores
  height: valor
```

---

## 2. Overview

Descripción narrativa del sistema que responda:
- ¿Cuál es el concepto central o filosofía?
- ¿Qué problema resuelve?
- ¿Cuál es su carácter o personalidad visual?
- ¿Para qué tipo de proyectos es adecuado?

Incluir lista de características clave:
```
- Característica 1
- Característica 2
- ...
```

---

## 3. Colors

Para cada categoría de color:
- Nombre del token
- Valor hex/rgba
- Cuándo usarlo
- Ejemplos de uso

Categorías típicas:
- **Brand & Accent**: color(es) primario(s) de marca
- **Surface**: colores de fondo
- **Text**: colores para texto
- **Semantic**: estados (error, warning, success, info)
- **Functional**: borders, dividers

---

## 4. Typography

### Font Family
- Fuente principal y pesos disponibles
- Fuentes alternativas (fallback)
- Iconografía (Font Awesome, etc.)

### Hierarchy Table

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|-------|------|--------|-------------|----------------|-----|
| display-xl | 48px | 700 | 1.25 | 0 | Hero headline |
| ... | | | | | |

### Principles
- Reglas sobre cómo usar la tipografía
- Cuándo usar weight 400 vs 700
- Jerarquía basada en qué (size, weight, color)

### Font Substitutes
Si la fuente principal es propietaria, documentar alternativas Open Source

---

## 5. Layout

### Spacing System
- Unidad base
- Todas las variáveis de spacing
- Ritmo vertical universal
- Padding de secciones

### Grid & Container
- Ancho máximo de contenido
- Patrones de columnas
- Breakpoints y cambios de grid

### Whitespace Philosophy
- Filosofía del sistema sobre espacios en blanco
- Uso de spacing vs decorative elements

---

## 6. Elevation & Depth

Tabla de niveles de elevación:

| Level | Treatment | Use |
|-------|------------|-----|
| 0 - Flat | No shadow | Superficies base |
| 1 - Border | 1px solid | Cards, inputs |
| 2 - Shadow | 0 4px 6px | Elementos elevados |
| 3 - Modal | 0 10px 25px | Dialogs |

### Decorative Depth
- Cómo se logra profundidad visual
- Role de fotografía/imágenes
- Elementos decorativos

---

## 7. Shapes

### Border Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| none | 0px | Elementos angulares |
| sm | 2px | Botones, inputs |
| md | 4px | Cards |
| full | 50% | Círculos |

### Photography Geometry
- Aspect ratios de imágenes
- Tamaños de iconos
- Geometría especial

---

## 8. Components

Documentar cada componente con:
- Descripción de uso
- Propiedades exactas
- Variantes (active, disabled, focused)
- Ejemplos visuales

### Buttons
- button-primary
- button-secondary
- button-outline
- button-ghost
- button-disabled

### Form Elements
- text-input
- search-input
- checkbox
- radio
- select

### Navigation
- navbar
- sidebar
- breadcrumb
- tabs
- pagination

### Cards
- card-basic
- card-image
- card-horizontal

### Feedback
- alert
- toast
- badge
- spinner

### Layout
- container
- grid
- stack
- divider

---

## 9. Do's and Don'ts

### Do
- Lista positiva de prácticas recomendadas

### Don't
- Lista de qué evitar

---

## 10. Responsive Behavior

### Breakpoints Table

| Name | Width | Key Changes |
|------|-------|-------------|
| desktop | 1280px+ | Layout completo |
| tablet | 768px | 2 columnas |
| mobile | 480px | 1 columna |

### Touch Targets
- Tamaño mínimo de áreas clickeables (44px)

### Collapsing Strategy
- Cómo colapsan los componentes en pantallas pequeñas
- Transformaciones de navegación
- Reescalado de tipografía

### Image Behavior
- Lazy loading
- Art direction
- Aspect ratios responsivos

---

## 11. Integration Guide (para Astro)

### Estructura de archivos sugerida
```
src/
├── styles/
│   ├── tokens.css        # CSS custom properties
│   ├── reset.css
│   └── global.css
├── components/
│   ├── Button.astro
│   ├── Card.astro
│   └── ...
└── layouts/
    └── BaseLayout.astro
```

### Tokens como CSS Custom Properties
```css
:root {
  --color-primary: #76b900;
  --color-surface: #ffffff;
  --spacing-sm: 8px;
  --radius-sm: 2px;
}
```

---

## 12. Iteration Guide

1. Cómo agregar nuevos tokens
2. Cómo agregar nuevos componentes
3. Proceso de revisión
4. Versionado

---

## 13. Known Gaps

Documentar lo que NO está incluido o necesita más investigación:
- Componentes no capturados
- Estados no documentados
- Casos edge no resueltos

---

## Checklist de Completitud

Antes de considerar el design.md "completo", asegurar:

- [ ] Front matter con todos los tokens definidos
- [ ] Overview con filosofía del sistema
- [ ] Colors con todos los valores y uso
- [ ] Typography con jerarquía completa
- [ ] Spacing system con todos los tokens
- [ ] Shapes/radius definidos
- [ ] Minimum 10 componentes documentados
- [ ] Do's and Don'ts
- [ ] Responsive breakpoints
- [ ] Known Gaps documentado