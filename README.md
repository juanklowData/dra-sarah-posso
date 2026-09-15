# Dra. Sarah Posso — Sitio web

Landing page profesional para la Dra. Sarah Posso (Médica Nutricionista).

## Stack

- HTML / CSS / JavaScript estático
- Despliegue listo para **Railway**
- Dominio en **Hostinger** (DNS → Railway)

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Deploy en Railway

1. Conecta este repositorio en [Railway](https://railway.app).
2. Crea un servicio desde el repo (Nixpacks detecta Node).
3. Railway usará `npx serve` en el puerto `$PORT`.
4. Genera un dominio Railway o conecta el dominio de Hostinger.

### DNS en Hostinger (dominio propio)

En el panel DNS de Hostinger:

| Tipo | Nombre | Valor |
|------|--------|--------|
| CNAME | `www` | `<tu-servicio>.up.railway.app` |
| A / CNAME | `@` | Según indique Railway (Custom Domain) |

Luego en Railway → Settings → Networking → Custom Domain, agrega tu dominio y verifica.

## Contacto CTA

WhatsApp: https://wa.link/76r34t  
Instagram: https://www.instagram.com/dra.sarahposso/

## Nota

Las fotos de perfil/contenido de Instagram son propiedad de la doctora. Sustituye el hero visual por una foto oficial cuando la proporcione.
