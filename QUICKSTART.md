# 🚀 Quick Start - Firebase Realtime Database# 🚀 Quick Start - Firebase Realtime Database# 🚀 Quick Start - Firebase Realtime Database (100% GRATIS)



## 💰 100% GRATIS - No requiere plan de pago



---## 💰 100% GRATIS - No requiere pago## ✨ CAMBIO IMPORTANTE: Ahora usa Realtime Database



## 3 Pasos Simples**NO requiere plan de pago - Es 100% GRATIS en Firebase**



### 1️⃣ Crear Realtime Database---



Ve a: **https://console.firebase.google.com/project/mi-proyecto-firebase-155e3/database**---



1. Haz clic en **"Crear base de datos"**## 3 Pasos Simples

2. Ubicación: **us-central1** (o la más cercana)

3. Modo: **"Iniciar en modo de prueba"**## Pasos Rápidos para Activar Firebase

4. Haz clic en **"Habilitar"**

### 1️⃣ Crear Realtime Database

Luego ve a la pestaña **"Reglas"** y pega esto:

```json### 1. Configurar Reglas en Firebase Console

{

  "rules": {**https://console.firebase.google.com/project/aniversario-02/database**

    ".read": true,

    ".write": true#### Realtime Database (NO Firestore)

  }

}1. **"Crear base de datos"**Ve a: https://console.firebase.google.com/project/aniversario-02/database

```

Haz clic en **"Publicar"**2. Ubicación: **us-central1**



---3. Modo: **"Iniciar en modo de prueba"****IMPORTANTE**: Crea una **Realtime Database** (no Firestore)



### 2️⃣ Iniciar la App4. **"Habilitar"**



```bash1. Haz clic en "Crear base de datos"

npm run dev

```Reglas:2. Selecciona ubicación (ej: us-central1)



Abre en tu navegador: **http://localhost:5173**```json3. **Modo de prueba** (permite lectura/escritura)



---{4. Haz clic en "Habilitar"



### 3️⃣ Inicializar Datos (Consola del Navegador)  "rules": {



1. Presiona **F12** para abrir la consola del navegador    ".read": true,Las reglas deben ser:

2. Copia y pega este código:

    ".write": true```json

```javascript

import { db } from './src/config/firebase.js';  }{

import { ref, set } from 'firebase/database';

}  "rules": {

// Fotos de ejemplo

await set(ref(db, 'photos'), {```    ".read": true,

  photo_1: {

    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",    ".write": true

    title: "Primera cita",

    caption: "Momento especial",---  }

    date: "2023-11-07",

    category: "first-date",}

    isFavorite: true,

    uploadedBy: "System",### 2️⃣ Iniciar App```

    createdAt: new Date().toISOString()

  },

  photo_2: {

    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",```bashClic en **"Publicar"**

    title: "Primer viaje",

    caption: "Aventura inolvidable",npm run dev

    date: "2023-12-15",

    category: "travel",```---

    isFavorite: false,

    uploadedBy: "System",

    createdAt: new Date().toISOString()

  },Abre: **http://localhost:5173**### 2. Iniciar el Servidor

  photo_3: {

    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800",

    title: "Navidad",

    caption: "Momentos mágicos",---```bash

    date: "2023-12-25",

    category: "celebration",npm run dev

    isFavorite: true,

    uploadedBy: "System",### 3️⃣ Inicializar (Consola F12)```

    createdAt: new Date().toISOString()

  }

});

```javascript---

// Tarjetas de soporte

await set(ref(db, 'supportCards'), {import { db } from './src/config/firebase.js';

  card_1: {

    title: "Respiración Profunda",import { ref, set } from 'firebase/database';### 3. Inicializar Base de Datos

    message: "Inhala 4, mantén 4, exhala 6",

    category: "calming",

    icon: "air",

    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"await set(ref(db, 'photos/photo_1'), {Abre la consola del navegador (F12) y ejecuta:

  },

  card_2: {  imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",

    title: "Eres Increíble",

    message: "Cada día superas desafíos",  title: "Primera cita",```javascript

    category: "motivating",

    icon: "star",  caption: "Momento especial",// Copiar y pegar en la consola

    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"

  },  date: "2023-11-07",import('./scripts/initFirebase.ts').then(m => m.initializeFirebase())

  card_3: {

    title: "Espacio Seguro",  category: "first-date",```

    message: "Este es tu lugar seguro",

    category: "general",  isFavorite: true,

    icon: "home",

    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"  uploadedBy: "System",O usa este código JavaScript inline:

  }

});  createdAt: new Date().toISOString()



// Configuración});```javascript

await set(ref(db, 'settings/relationship'), {

  startDate: new Date('2023-11-07').toISOString(),// Pegar esto en la consola del navegador

  initialized: true,

  initializedAt: new Date().toISOString()await set(ref(db, 'supportCards/card_1'), {const script = document.createElement('script');

});

  title: "Respiración",script.type = 'module';

console.log('✅ ¡Listo! Recarga la página (F5)');

```  message: "Inhala 4, mantén 4, exhala 6",script.textContent = `



3. Presiona **Enter** y espera el mensaje de éxito  category: "calming",import { db } from './src/config/firebase';

4. **Recarga la página** (F5)

  icon: "air",import { ref, set } from 'firebase/database';

---

  color: "bg-blue-100"

## ✅ ¡Terminado!

});const photos = {

- La primera vez te pedirá tu nombre

- Explora las fotos  photo_1: {

- Agrega nuevas fotos usando URLs de imágenes

- Todo se guarda automáticamente en Firebase 🔥console.log('✅ Listo! Recarga la página');    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",



---```    title: "Our first date",



## 💡 Cómo Agregar Más Fotos    caption: "Best coffee of my life.",



### Opción 1: URLs Externas (Recomendado)---    date: "2023-11-07",

```typescript

import { dataService } from './services/dataService';    category: "first-date",



await dataService.addPhoto({## ✅ ¡Terminado!    isFavorite: true,

  imageUrl: "https://images.unsplash.com/photo-xxx?w=800",

  title: "Mi foto",    uploadedBy: "System",

  caption: "Descripción",

  date: "2025-10-16",Ingresa tu nombre y disfruta tu álbum 💕    createdAt: new Date().toISOString()

  category: "everyday",

  isFavorite: false  }

});  // ... más fotos se agregarán automáticamente

```};



### Opción 2: Base64 (solo imágenes < 500KB)await set(ref(db, 'photos'), photos);

```typescriptconsole.log('✅ Photos initialized!');

const fileInput = document.querySelector('input[type="file"]');`;

const file = fileInput.files[0];document.head.appendChild(script);

```

// Convertir a base64

const base64 = await dataService.uploadImage(file);---



await dataService.addPhoto({### 4. ¡Listo!

  imageUrl: base64,

  title: "Mi foto",Tu app está lista. Abre:

  caption: "Descripción",```

  date: "2025-10-16",http://localhost:5173

  category: "everyday",```

  isFavorite: false

});- La primera vez te pedirá tu nombre

```- Después podrás ver y agregar fotos

- **TODO es GRATIS** - Realtime Database no requiere pago 💰

---

---

## 📊 Límites Gratuitos de Realtime Database

## 💡 Características

| Recurso | Límite |

|---------|--------|### ✅ Qué cambió:

| **Almacenamiento** | 1 GB |- ❌ **NO Firestore** (requiere pago)

| **Descargas** | 10 GB/mes |- ❌ **NO Storage** (requiere pago)

| **Conexiones simultáneas** | 100 |- ✅ **SÍ Realtime Database** (100% GRATIS)

- ✅ **Imágenes como URLs externas** (Unsplash, Imgur, etc.)

✅ **Perfecto para uso personal**- ✅ **Imágenes pequeñas en base64** (< 500KB)



---### �️ Cómo Subir Imágenes:



## 🆘 Problemas Comunes**Opción 1: URLs Externas (Recomendado)**

```typescript

### "Permission denied"await dataService.addPhoto({

✅ Verifica que las reglas estén en modo de prueba (`.read` y `.write` = `true`)  imageUrl: "https://images.unsplash.com/photo-xxx",

  title: "Mi foto",

### "Database not found"  caption: "Descripción",

✅ Asegúrate de crear **Realtime Database**, NO Firestore  date: "2025-10-06",

  category: "everyday"

### "No aparecen fotos"});

✅ Ejecuta el script de inicialización en la consola (paso 3)```



### "Imagen muy grande"**Opción 2: Base64 (solo imágenes < 500KB)**

✅ Las imágenes base64 deben ser < 500KB. Usa URLs externas para imágenes grandes```typescript

const file = input.files[0];

---const base64Url = await dataService.uploadImage(file); // Convierte a base64

await dataService.addPhoto({

## 🎯 Estructura de la Base de Datos  imageUrl: base64Url,

  title: "Mi foto",

```  //...

mi-proyecto-firebase-155e3/});

├── photos/```

│   ├── photo_1/

│   │   ├── imageUrl---

│   │   ├── title

│   │   ├── caption## 📊 Límites del Plan Gratuito

│   │   ├── date

│   │   ├── category| Recurso | Límite |

│   │   ├── isFavorite|---------|--------|

│   │   └── ...| Almacenamiento | 1 GB |

│   └── photo_2/...| Descargas | 10 GB/mes |

│| Conexiones simultáneas | 100 |

├── supportCards/

│   ├── card_1/...✅ **Más que suficiente para un álbum personal**

│   └── card_2/...

│---

└── settings/

    └── relationship/## ⚡ Comandos Útiles

        ├── startDate

        └── initialized```bash

```# Desarrollo

npm run dev

---

# Compilar

## 💖 ¡Disfruta tu álbum de aniversario!npm run build



Todo funciona **100% GRATIS** con Realtime Database 🎉# Vista previa

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
