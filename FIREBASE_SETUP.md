# 🔥 Guía Rápida: Configuración de Firebase

Esta guía te ayudará a configurar Firebase en 5 minutos.

## Paso 1: Crear Proyecto en Firebase

1. Ve a https://console.firebase.google.com/
2. Clic en "Agregar proyecto"
3. Nombre del proyecto: `invitacion-graduacion` (o el que prefieras)
4. Acepta los términos
5. Desmarca "Habilitar Google Analytics" (no es necesario)
6. Clic en "Crear proyecto"
7. Espera unos segundos y clic en "Continuar"

## Paso 2: Registrar Aplicación Web

1. En la página principal del proyecto, haz clic en el ícono **</>** (Web)
2. Apodo de la app: `Invitaciones Web`
3. NO marques "También configurar Firebase Hosting"
4. Clic en "Registrar app"
5. Verás un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxx"
};
```

6. **COPIA estos valores** - los necesitarás para el `.env.local`

## Paso 3: Crear Base de Datos Firestore

1. En el menú lateral izquierdo, busca **"Compilación"** o **"Build"**
2. Haz clic en **"Firestore Database"**
3. Clic en **"Crear base de datos"**
4. Selecciona **"Comenzar en modo de producción"**
5. Ubicación: Elige la más cercana a tu país
   - Para Bolivia: `us-central` o `southamerica-east1`
6. Clic en "Habilitar"
7. Espera unos segundos mientras se crea

## Paso 4: Configurar Reglas de Seguridad

1. En Firestore Database, ve a la pestaña **"Reglas"**
2. **BORRA** todo el contenido actual
3. **PEGA** este código:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitados/{invitadoId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

4. Clic en **"Publicar"**

## Paso 5: Configurar Variables de Entorno

1. En tu proyecto, copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

2. Abre `.env.local` y pega tus credenciales:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxx
```

## Paso 6: ¡Listo! Ejecutar el Proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:3000/admin y empieza a agregar invitados.

## ⚠️ Importante para Producción

Las reglas actuales permiten que cualquiera pueda leer y escribir. Para producción, deberías:

1. Implementar Firebase Authentication
2. Proteger las escrituras con autenticación
3. Usar estas reglas más seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitados/{invitadoId} {
      allow read: if true;
      allow write: if request.auth != null; // Solo usuarios autenticados
    }
  }
}
```

## 🚀 Desplegar en Vercel

1. Sube tu código a GitHub
2. Ve a https://vercel.com
3. Importa tu repositorio
4. **MUY IMPORTANTE**: Agrega las variables de entorno en Vercel:
   - Settings > Environment Variables
   - Agrega todas las de `.env.local`
5. Deploy

## 🔍 Verificar que Funciona

### Test 1: Agregar invitado
1. Ve a `/admin`
2. Agrega un invitado de prueba
3. Si aparece en la lista = ✅ Funciona

### Test 2: Ver invitación
1. Copia la URL de un invitado
2. Abre la URL en otra pestaña
3. Si ves la invitación con el nombre = ✅ Funciona

### Test 3: Ver en Firebase Console
1. Ve a Firestore Database en Firebase Console
2. Deberías ver una colección llamada "invitados"
3. Con documentos que contienen nombre, apellido, etc.

## ❓ Problemas Comunes

### "Permission denied" al agregar invitado
- Revisa las reglas de Firestore
- Asegúrate de que estén publicadas

### No aparecen los invitados
- Abre F12 (consola del navegador)
- Revisa si hay errores de Firebase
- Verifica que las variables en `.env.local` sean correctas

### "Firebase not configured"
- Asegúrate de que `.env.local` existe
- Reinicia el servidor (`npm run dev`)
- Verifica que las variables empiecen con `NEXT_PUBLIC_`

---

¿Necesitas ayuda? Revisa el README.md completo o la documentación oficial de Firebase.
