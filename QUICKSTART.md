# 🚀 Quick Start - Firebase Realtime Database# 🚀 Quick Start - Firebase Realtime Database (100% GRATIS)



## 💰 100% GRATIS - No requiere pago## ✨ CAMBIO IMPORTANTE: Ahora usa Realtime Database

**NO requiere plan de pago - Es 100% GRATIS en Firebase**

---

---

## 3 Pasos Simples

## Pasos Rápidos para Activar Firebase

### 1️⃣ Crear Realtime Database

### 1. Configurar Reglas en Firebase Console

**https://console.firebase.google.com/project/aniversario-02/database**

#### Realtime Database (NO Firestore)

1. **"Crear base de datos"**Ve a: https://console.firebase.google.com/project/aniversario-02/database

2. Ubicación: **us-central1**

3. Modo: **"Iniciar en modo de prueba"****IMPORTANTE**: Crea una **Realtime Database** (no Firestore)

4. **"Habilitar"**

1. Haz clic en "Crear base de datos"

Reglas:2. Selecciona ubicación (ej: us-central1)

```json3. **Modo de prueba** (permite lectura/escritura)

{4. Haz clic en "Habilitar"

  "rules": {

    ".read": true,Las reglas deben ser:

    ".write": true```json

  }{

}  "rules": {

```    ".read": true,

    ".write": true

---  }

}

### 2️⃣ Iniciar App```



```bashClic en **"Publicar"**

npm run dev

```---



Abre: **http://localhost:5173**### 2. Iniciar el Servidor



---```bash

npm run dev

### 3️⃣ Inicializar (Consola F12)```



```javascript---

import { db } from './src/config/firebase.js';

import { ref, set } from 'firebase/database';### 3. Inicializar Base de Datos



await set(ref(db, 'photos/photo_1'), {Abre la consola del navegador (F12) y ejecuta:

  imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",

  title: "Primera cita",```javascript

  caption: "Momento especial",// Copiar y pegar en la consola

  date: "2023-11-07",import('./scripts/initFirebase.ts').then(m => m.initializeFirebase())

  category: "first-date",```

  isFavorite: true,

  uploadedBy: "System",O usa este código JavaScript inline:

  createdAt: new Date().toISOString()

});```javascript

// Pegar esto en la consola del navegador

await set(ref(db, 'supportCards/card_1'), {const script = document.createElement('script');

  title: "Respiración",script.type = 'module';

  message: "Inhala 4, mantén 4, exhala 6",script.textContent = `

  category: "calming",import { db } from './src/config/firebase';

  icon: "air",import { ref, set } from 'firebase/database';

  color: "bg-blue-100"

});const photos = {

  photo_1: {

console.log('✅ Listo! Recarga la página');    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",

```    title: "Our first date",

    caption: "Best coffee of my life.",

---    date: "2023-11-07",

    category: "first-date",

## ✅ ¡Terminado!    isFavorite: true,

    uploadedBy: "System",

Ingresa tu nombre y disfruta tu álbum 💕    createdAt: new Date().toISOString()

  }
  // ... más fotos se agregarán automáticamente
};

await set(ref(db, 'photos'), photos);
console.log('✅ Photos initialized!');
`;
document.head.appendChild(script);
```

---

### 4. ¡Listo!

Tu app está lista. Abre:
```
http://localhost:5173
```

- La primera vez te pedirá tu nombre
- Después podrás ver y agregar fotos
- **TODO es GRATIS** - Realtime Database no requiere pago 💰

---

## 💡 Características

### ✅ Qué cambió:
- ❌ **NO Firestore** (requiere pago)
- ❌ **NO Storage** (requiere pago)
- ✅ **SÍ Realtime Database** (100% GRATIS)
- ✅ **Imágenes como URLs externas** (Unsplash, Imgur, etc.)
- ✅ **Imágenes pequeñas en base64** (< 500KB)

### �️ Cómo Subir Imágenes:

**Opción 1: URLs Externas (Recomendado)**
```typescript
await dataService.addPhoto({
  imageUrl: "https://images.unsplash.com/photo-xxx",
  title: "Mi foto",
  caption: "Descripción",
  date: "2025-10-06",
  category: "everyday"
});
```

**Opción 2: Base64 (solo imágenes < 500KB)**
```typescript
const file = input.files[0];
const base64Url = await dataService.uploadImage(file); // Convierte a base64
await dataService.addPhoto({
  imageUrl: base64Url,
  title: "Mi foto",
  //...
});
```

---

## 📊 Límites del Plan Gratuito

| Recurso | Límite |
|---------|--------|
| Almacenamiento | 1 GB |
| Descargas | 10 GB/mes |
| Conexiones simultáneas | 100 |

✅ **Más que suficiente para un álbum personal**

---

## ⚡ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Compilar
npm run build

# Vista previa
npm run preview
```

---

## 🆘 Problemas Comunes

### "Permission denied"
✅ Verifica que las reglas estén en modo de prueba (`.read` y `.write` = `true`)

### "Database not found"
✅ Asegúrate de crear **Realtime Database**, NO Firestore

### "Las fotos no aparecen"
✅ Ejecuta el script de inicialización en la consola del navegador

### "Imagen muy grande"
✅ Las imágenes base64 deben ser < 500KB. Usa URLs externas para imágenes grandes

---

## � ¿Por qué Realtime Database?

- ✅ **100% GRATIS** - No requiere tarjeta de crédito
- ✅ **Simple y rápido**
- ✅ **Suficiente para apps personales**
- ✅ **Datos en tiempo real**
- ❌ Firestore requiere plan Blaze (con pago)
- ❌ Storage requiere plan Blaze (con pago)

---

¡Disfruta tu álbum de aniversario completamente GRATIS! 💕
