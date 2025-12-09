# 🎓 Sistema de Invitaciones de Graduación

Sistema completo para crear y gestionar invitaciones personalizadas de graduación con enlaces únicos para cada invitado.

## ✨ Características

- 📧 **Invitaciones personalizadas** - Cada invitado recibe un enlace único con su nombre
- 🎨 **Diseño elegante** - Interfaz moderna y atractiva con animaciones
- 📱 **Responsive** - Se adapta perfectamente a móviles, tablets y escritorio
- 🔥 **Firebase Integration** - Base de datos en tiempo real sin necesidad de backend
- 🚀 **Fácil de usar** - Panel de administración intuitivo
- 🔗 **Compartir fácilmente** - Copia y comparte enlaces por WhatsApp, email, etc.

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Firebase Firestore** - Base de datos NoSQL
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una cuenta de Google (para Firebase)

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
# Si tienes git instalado
git clone <url-del-repo>
cd graduation-invitation

# O simplemente descarga el ZIP y extráelo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### Paso 3.1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Dale un nombre a tu proyecto (ej: "invitacion-graduacion")
4. Acepta los términos y crea el proyecto

#### Paso 3.2: Crear una aplicación web

1. En la página principal de tu proyecto, haz clic en el ícono de **Web** (</>)
2. Dale un nombre a tu app (ej: "Invitaciones Web")
3. NO marques "Firebase Hosting" por ahora
4. Haz clic en "Registrar app"
5. Verás un código con las credenciales de Firebase - **CÓPIALAS**

#### Paso 3.3: Configurar Firestore

1. En el menú lateral, ve a **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de producción"**
4. Elige una ubicación (ej: us-central)
5. Haz clic en "Habilitar"

#### Paso 3.4: Configurar reglas de seguridad

En la pestaña "Reglas" de Firestore, pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos para las invitaciones
    match /invitados/{invitadoId} {
      allow read: if true;
      allow write: if true; // En producción, deberías proteger esto con autenticación
    }
  }
}
```

⚠️ **NOTA**: Estas reglas son para desarrollo. En producción deberías implementar autenticación.

Haz clic en **"Publicar"**

#### Paso 3.5: Configurar variables de entorno

1. Copia el archivo `.env.example` y renómbralo a `.env.local`:

```bash
cp .env.example .env.local
```

2. Abre `.env.local` y pega tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

### Panel de Administración

1. Ve a [http://localhost:3000/admin](http://localhost:3000/admin)
2. Completa el formulario con los datos del invitado:
   - Nombre (obligatorio)
   - Apellido (obligatorio)
   - Mensaje personalizado (opcional)
3. Haz clic en "Agregar Invitado"
4. Aparecerá en la lista de invitados
5. Haz clic en "Copiar URL" para obtener el enlace único
6. Comparte ese enlace con el invitado

### Ver Invitación

Cada invitado tendrá un enlace único como:
```
http://localhost:3000/invitacion/abc123xyz
```

La invitación mostrará:
- Nombre personalizado del invitado
- Detalles del evento (fecha, hora, lugar)
- Mensaje personalizado (si lo agregaste)
- Botón para confirmar asistencia por WhatsApp

## 🚢 Desplegar en Vercel (GRATIS)

### Opción 1: Desplegar desde la web

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta con GitHub
3. Haz clic en "Add New Project"
4. Importa tu repositorio de GitHub
5. En "Environment Variables" agrega todas las variables de `.env.local`
6. Haz clic en "Deploy"

### Opción 2: Desplegar desde la terminal

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Seguir las instrucciones
```

⚠️ **IMPORTANTE**: No olvides agregar las variables de entorno en Vercel:
- Ve a tu proyecto en Vercel
- Settings > Environment Variables
- Agrega todas las variables de Firebase

## 📝 Personalización

### Cambiar los datos del evento

Edita el archivo `app/invitacion/[id]/page.tsx` y busca la sección de "Detalles de la Celebración":

```typescript
<div className="flex items-center justify-center gap-3 text-gray-700">
  <Calendar className="w-6 h-6 text-amber-600" />
  <span className="text-lg">
    <strong>Fecha:</strong> Sábado, 15 de Diciembre 2024  {/* CAMBIA AQUÍ */}
  </span>
</div>
```

### Cambiar el número de WhatsApp

En el mismo archivo, busca el botón de "Confirmar Asistencia":

```typescript
href={`https://wa.me/59171234567?text=...`}  {/* CAMBIA EL NÚMERO */}
```

### Cambiar colores y diseño

Los colores principales están en:
- **Invitación**: `app/invitacion/[id]/page.tsx` - Usa tonos ámbar/naranja/amarillo
- **Admin**: `app/admin/page.tsx` - Usa tonos morado/púrpura
- **Home**: `app/page.tsx` - Usa tonos morado/rosa

Puedes cambiar las clases de Tailwind como `bg-amber-600`, `text-purple-500`, etc.

## 🔧 Solución de Problemas

### Error: "Firebase no está configurado"
- Verifica que hayas creado el archivo `.env.local`
- Asegúrate de que las variables comiencen con `NEXT_PUBLIC_`
- Reinicia el servidor de desarrollo

### Error: "Permission denied" en Firestore
- Verifica que hayas configurado las reglas de seguridad en Firestore
- Asegúrate de que estén publicadas

### No aparecen los invitados
- Abre la consola del navegador (F12) para ver errores
- Verifica que Firebase esté correctamente configurado
- Revisa que las reglas de Firestore permitan lectura y escritura

## 📱 Estructura del Proyecto

```
graduation-invitation/
├── app/
│   ├── admin/              # Panel de administración
│   │   └── page.tsx
│   ├── invitacion/         # Páginas de invitación
│   │   └── [id]/
│   │       └── page.tsx
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout global
│   └── globals.css         # Estilos globales
├── lib/
│   └── firebase.ts         # Configuración de Firebase
├── .env.example            # Ejemplo de variables de entorno
├── package.json
└── README.md
```

## 🎨 Capturas de Pantalla

### Página Principal
Pantalla de bienvenida con acceso al panel de administración.

### Panel de Administración
Interfaz para agregar invitados y copiar enlaces únicos.

### Invitación Personalizada
Diseño elegante con el nombre del invitado y todos los detalles del evento.

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y adaptarlo a tus necesidades.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia:

1. Abre un Issue
2. O envía un Pull Request

## 📞 Soporte

Si tienes problemas con la configuración, revisa:

1. La consola del navegador (F12) para errores
2. Los logs del servidor de desarrollo
3. La documentación de [Firebase](https://firebase.google.com/docs)
4. La documentación de [Next.js](https://nextjs.org/docs)

---

**¡Disfruta creando invitaciones únicas para tu graduación! 🎓✨**
