# Instrucciones de Configuración de Firebase

Este documento explica cómo activar y configurar Firebase para la aplicación "Nuestro Aniversario".

## 🔥 Servicios de Firebase Necesarios

Para que la aplicación funcione correctamente, debes activar los siguientes servicios en Firebase Console:

### 1. **Firestore Database** (OBLIGATORIO)
Base de datos NoSQL para almacenar:
- Fotos y sus metadatos
- Tarjetas de apoyo
- Nombre del usuario
- Memorias y recuerdos

### 2. **Firebase Storage** (OBLIGATORIO)
Almacenamiento de archivos para:
- Imágenes subidas por los usuarios
- Fotos de memorias
- Assets multimedia

### 3. **Authentication** (OPCIONAL - NO USADO ACTUALMENTE)
No se requiere autenticación. La app usa un sistema simple de nombre de usuario almacenado localmente.

---

## 📝 Pasos de Configuración en Firebase Console

### Paso 1: Crear el Proyecto (Ya realizado)
✅ Tu proyecto ya está creado: `nuestro-aniversario-20866`

### Paso 2: Activar Firestore Database

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `nuestro-aniversario-20866`
3. En el menú lateral, haz clic en **"Firestore Database"**
4. Haz clic en **"Create database"** (Crear base de datos)
5. Selecciona el modo:
   - **Producción**: Requiere configurar reglas de seguridad
   - **Prueba**: Permite lectura/escritura por 30 días (recomendado para comenzar)
6. Selecciona la ubicación del servidor (recomendado: `us-central` o el más cercano a tu ubicación)
7. Haz clic en **"Habilitar"**

#### Reglas de Seguridad para Firestore

**Para Desarrollo/Pruebas (30 días):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 2, 4);
    }
  }
}
```

**Para Producción (Recomendado):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos
    match /{document=**} {
      allow read: if true;
    }
    
    // Usuarios: solo pueden crear, no modificar
    match /users/{userId} {
      allow create: if true;
      allow read: if true;
      allow update, delete: if false; // Nombre inmutable
    }
    
    // Photos: permitir lectura y escritura
    match /photos/{photoId} {
      allow read, write: if true;
    }
    
    // Support Cards: solo lectura (datos pre-cargados)
    match /supportCards/{cardId} {
      allow read: if true;
      allow write: if false; // Solo admin puede modificar
    }
    
    // Memories: permitir lectura y escritura
    match /memories/{memoryId} {
      allow read, write: if true;
    }
  }
}
```

### Paso 3: Activar Firebase Storage

1. En Firebase Console, ve a **"Storage"** en el menú lateral
2. Haz clic en **"Get started"** (Comenzar)
3. Revisa las reglas de seguridad:
   - Selecciona **"Start in test mode"** para desarrollo
   - O configura reglas personalizadas para producción
4. Selecciona la ubicación del servidor (usa la misma que Firestore)
5. Haz clic en **"Done"**

#### Reglas de Seguridad para Storage

**Para Desarrollo/Pruebas:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2025, 2, 4);
    }
  }
}
```

**Para Producción:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
    }
    
    match /photos/{fileName} {
      allow write: if request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/.*');
    }
    
    match /memories/{fileName} {
      allow write: if request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 🚀 Inicializar la Base de Datos

Una vez activados Firestore y Storage, debes cargar los datos iniciales:

### Opción 1: Usar el Script de Inicialización (Recomendado)

```bash
npm run init-firebase
```

Este script:
- Carga las 10 fotos de ejemplo
- Carga las 8 tarjetas de apoyo
- Configura la estructura de colecciones

### Opción 2: Cargar Datos Manualmente

Puedes usar Firebase Console para crear las colecciones manualmente:

1. **Colección: `photos`**
   - Campos: `id`, `imageUrl`, `title`, `caption`, `date`, `category`, `isFavorite`, `createdAt`, `updatedAt`

2. **Colección: `supportCards`**
   - Campos: `id`, `title`, `message`, `category`, `icon`, `color`, `createdAt`, `updatedAt`

3. **Colección: `users`**
   - Campos: `id`, `name`, `createdAt`

---

## 🔐 Seguridad y Mejores Prácticas

### API Key Pública
⚠️ **IMPORTANTE**: La API key de Firebase está en el código cliente y es visible públicamente. Esto es normal y esperado para aplicaciones web.

### Protección de Datos
- Las reglas de seguridad de Firestore son tu primera línea de defensa
- Configura reglas estrictas en producción
- Limita el tamaño de archivos en Storage
- Monitorea el uso en Firebase Console

### Nombre de Usuario Inmutable
- El nombre se guarda en `localStorage` y en Firestore
- Una vez establecido, no se puede cambiar (validado en el código)
- No requiere autenticación formal

---

## 📊 Estructura de Datos en Firestore

### Colección: `users`
```javascript
{
  id: "default_user",
  name: "Nombre del Usuario",
  createdAt: Timestamp
}
```

### Colección: `photos`
```javascript
{
  id: "1",
  imageUrl: "https://...",
  title: "Our first date",
  caption: "I was so nervous...",
  date: "2023-11-07",
  category: "first-date",
  isFavorite: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección: `supportCards`
```javascript
{
  id: "1",
  title: "Respiración Profunda",
  message: "Inhala por 4 segundos...",
  category: "calming",
  icon: "air",
  color: "bg-blue-100 dark:bg-blue-900/30...",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🧪 Verificar la Configuración

### 1. Verificar Firestore
1. Ve a Firebase Console > Firestore Database
2. Deberías ver las colecciones: `photos`, `supportCards`, `users`
3. Verifica que haya documentos en cada colección

### 2. Verificar Storage
1. Ve a Firebase Console > Storage
2. Verifica que el bucket esté creado
3. Puedes subir una imagen de prueba

### 3. Probar la Aplicación
```bash
npm run dev
```

- Al abrir la app por primera vez, te pedirá tu nombre
- Ingresa un nombre y continúa
- Deberías ver las fotos cargadas desde Firebase
- Verifica la consola del navegador para mensajes de conexión

---

## 🐛 Solución de Problemas

### Error: "Permission denied"
- **Causa**: Reglas de Firestore o Storage muy restrictivas
- **Solución**: Verifica las reglas en Firebase Console

### Error: "Firestore is not enabled"
- **Causa**: Firestore no está activado
- **Solución**: Sigue el Paso 2 de configuración

### Error: "Storage bucket not configured"
- **Causa**: Storage no está activado
- **Solución**: Sigue el Paso 3 de configuración

### Las fotos no se cargan
- **Causa**: Datos no inicializados o error de red
- **Solución**: 
  1. Ejecuta `npm run init-firebase`
  2. Verifica la conexión a Internet
  3. Revisa la consola del navegador

### El nombre no se guarda
- **Causa**: Reglas de Firestore o error de localStorage
- **Solución**:
  1. Verifica que la colección `users` permita `create`
  2. Limpia el localStorage del navegador
  3. Intenta de nuevo

---

## 📞 Información de Contacto del Proyecto

- **ID del Proyecto**: `nuestro-aniversario-20866`
- **Storage Bucket**: `nuestro-aniversario-20866.firebasestorage.app`
- **Región**: (Configura según tu preferencia)

---

## ✅ Checklist de Configuración

- [ ] Crear proyecto en Firebase (✅ Ya hecho)
- [ ] Activar Firestore Database
- [ ] Configurar reglas de Firestore
- [ ] Activar Firebase Storage
- [ ] Configurar reglas de Storage
- [ ] Ejecutar script de inicialización (`npm run init-firebase`)
- [ ] Verificar datos en Firebase Console
- [ ] Probar la aplicación (`npm run dev`)
- [ ] Ingresar nombre de usuario
- [ ] Verificar que las fotos se carguen correctamente

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará completamente funcional con Firebase como backend.

### Comandos Útiles

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Inicializar Firebase
npm run init-firebase

# Vista previa de producción
npm run preview
```

**¡Disfruta tu aplicación de aniversario!** 💕
