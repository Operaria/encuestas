# Operaria Encuestas

Cuestionario de diagnóstico de Operaria Flow. Cada prospecto recibe un link único, completa 21 preguntas en 4 bloques con autoguardado, y al enviar llega un PDF al correo de Francisco.

URL de producción: **https://agente.operaria.cl**

## Crear link para un cliente nuevo

Construye la URL con un slug (minúsculas, palabras separadas con guión):

```
https://agente.operaria.cl/diagnostico/maria-perez
https://agente.operaria.cl/diagnostico/juan-cafe-central
```

El slug se convierte automáticamente en nombre formateado en la portada (`maria-perez` → "Maria Perez"). No requiere registrar al cliente en ningún sistema.

## Ver respuestas

Cada envío llega como correo a `franciscomunoz@operaria.cl` con:
- Resumen rápido en el cuerpo del correo
- PDF adjunto con las 21 respuestas completas

## Correr local

```bash
npm install
npm run dev
```

Abre http://localhost:3000/diagnostico/prueba

Necesitas `.env.local` (ver `.env.example`):
```
RESEND_API_KEY=re_xxxxxxxxx
DESTINATION_EMAIL=franciscomunoz@operaria.cl
FROM_EMAIL=onboarding@resend.dev
```

## Hacer cambios y redeployar

1. Edita los archivos
2. Commit y push:
   ```bash
   git add .
   git commit -m "describe el cambio"
   git push
   ```
3. Vercel detecta el push y redeploya automáticamente en ~2 minutos

### Cambiar preguntas

Edita `lib/preguntas.ts` — todo el contenido del cuestionario vive ahí.

### Cambiar identidad visual

- Colores: `app/globals.css` (sección `@theme`)
- Tipografías: `app/layout.tsx`
- Portada: `components/Portada.tsx`
