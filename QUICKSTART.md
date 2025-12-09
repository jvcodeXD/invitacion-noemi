# 🚀 INICIO RÁPIDO - 5 Minutos

## ⚡ Instalación Express

```bash
# 1. Extraer el proyecto
unzip graduation-invitation.zip
cd graduation-invitation

# 2. Instalar dependencias
npm install

# 3. Configurar Firebase (ver FIREBASE_SETUP.md)
cp .env.example .env.local
# Edita .env.local con tus credenciales de Firebase

# 4. Ejecutar
npm run dev
```

Abre: http://localhost:3000/admin

## 📋 Checklist de Configuración

- [ ] Crear proyecto en Firebase Console
- [ ] Crear aplicación web en Firebase
- [ ] Habilitar Firestore Database
- [ ] Configurar reglas de seguridad
- [ ] Copiar credenciales a `.env.local`
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`

## 🎯 Primeros Pasos

1. **Panel Admin**: http://localhost:3000/admin
   - Agrega tu primer invitado
   - Copia la URL generada

2. **Ver Invitación**: Abre la URL copiada
   - Verás la invitación personalizada
   - Con el nombre del invitado

3. **Personalizar**:
   - Edita `app/invitacion/[id]/page.tsx` para cambiar:
     - Fecha, hora y lugar del evento
     - Número de WhatsApp
     - Mensaje de confirmación
   
   - Edita colores y diseño según tu preferencia

## 📱 Desplegar en Vercel (Gratis)

```bash
# Opción 1: Desde la terminal
npm i -g vercel
vercel

# Opción 2: Desde GitHub
# 1. Sube el código a GitHub
# 2. Ve a vercel.com
# 3. Importa el repositorio
# 4. Agrega las variables de entorno
# 5. Deploy
```

## 🆘 Ayuda Rápida

**Error: "Permission denied"**
→ Revisa las reglas de Firestore en Firebase Console

**No aparecen invitados**
→ Abre F12, revisa la consola por errores
→ Verifica `.env.local`

**Firebase no configurado**
→ Asegúrate de tener `.env.local` (no `.env.example`)
→ Reinicia el servidor

## 📚 Documentación Completa

- `README.md` - Documentación completa
- `FIREBASE_SETUP.md` - Guía paso a paso de Firebase

## 💡 Tips

- Usa el panel `/admin` para gestionar invitados
- Cada invitado tiene una URL única
- Las URLs son del formato: `/invitacion/abc123`
- Personaliza los mensajes en el código
- El diseño es completamente responsive

---

**¿Listo para empezar? Sigue la guía FIREBASE_SETUP.md** 🎓✨
