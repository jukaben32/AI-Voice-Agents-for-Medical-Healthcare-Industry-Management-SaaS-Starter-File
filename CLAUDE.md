## Notas técnicas del equipo

### No pasar funciones de un Server Component a un Client Component (2026-08-22)

Si se construyen gráficos (recharts u otra librería, ya está en `package.json`
pero sin uso todavía) u otro componente `'use client'` que necesite un
formateador de valores (ej. "%", moneda), **nunca pasarle una función inline**
desde una página que sea Server Component:

```tsx
// MAL -- revienta con "Algo salió mal" (función no serializable)
<TrendChart valueFormatter={(v) => `${v}%`} />
```

Next.js no puede serializar funciones a través del límite servidor→cliente.
En su lugar, pasar un string plano y resolver el formateador *dentro* del
Client Component:

```tsx
// BIEN
<TrendChart valueFormat="percent" />
```

Encontrado y corregido en el proyecto hermano `n8n-school-expert-landingpage`
(página de Analíticas, confirmado con los logs de Vercel). Aplica el mismo
patrón aquí si se agrega esta funcionalidad.
