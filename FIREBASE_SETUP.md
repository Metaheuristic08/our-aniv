# 🔥 Firebase Setup Guide - Our Anniversary Photo Album

## ✅ Configuración Completada

La integración de Firebase ya está configurada en tu proyecto con tus credenciales. A continuación, los pasos para activar y usar Firebase.

---

## 📋 Requisitos Previos

1. **Cuenta de Firebase**: Ya tienes tu proyecto `nuestro-aniversario-20866` configurado
2. **Node.js instalado**: Para ejecutar el proyecto
3. **Conexión a Internet**: Para comunicarse con Firebase

---

## 🚀 Pasos de Inicialización

### 1. Configurar Reglas de Firestore

Ve a [Firebase Console](https://console.firebase.google.com/) → Tu Proyecto → Firestore Database → Reglas

Usa estas reglas para desarrollo (TEMPORAL - cambiar en producción):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura para todos (SOLO DESARROLLO)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Para producción, considera reglas más restrictivas que verifiquen autenticación si lo necesitas en el futuro.

### 2. Configurar Firebase Storage

Ve a [Firebase Console](https://console.firebase.google.com/) → Tu Proyecto → Storage → Reglas

Reglas recomendadas para Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 3. Ejecutar el Script de Inicialización

Tienes dos opciones:

#### Opción A: Usar el HTML Helper (Recomendado)

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre en tu navegador:
   ```
   http://localhost:5173/scripts/init.html
   ```

3. Haz clic en "Inicializar Firebase"

4. Espera a ver el mensaje de éxito ✅

#### Opción B: Consola del Navegador

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la app en `http://localhost:5173`

3. Abre la consola del navegador (F12)

4. Ejecuta:
   ```javascript
   import('./scripts/initFirebase.ts').then(m => m.initializeFirebase());
   ```

---

## 📱 Funcionalidades Implementadas

### 1. **Almacenamiento de Nombre de Usuario**
- Se solicita al usuario su nombre **solo la primera vez** que abre la app
- El nombre se guarda en `localStorage` del navegador
- **No se puede cambiar** a menos que se reinstale la app o se limpie el caché del navegador

### 2. **Gestión de Fotos** (Firestore + Storage)
- ✅ Listar todas las fotos
- ✅ Filtrar fotos favoritas
- ✅ Marcar/desmarcar favoritos
- ✅ Subir nuevas fotos (con imagen a Firebase Storage)
- ✅ Eliminar fotos (de Firestore y Storage)
- ✅ Actualizar metadatos de fotos

### 3. **Tarjetas de Soporte** (Firestore)
- ✅ Listar tarjetas de soporte
- ✅ Filtrar por categoría
- ✅ Agregar nuevas tarjetas

### 4. **Timeline de Relación** (Firestore)
- ✅ Guardar fecha de inicio de relación
- ✅ Calcular tiempo transcurrido en tiempo real

---

## 🗄️ Estructura de Firebase

### Colecciones de Firestore

```
📁 Firestore Database
├── 📂 photos/
│   ├── photo_1
│   ├── photo_2
│   └── ... (documentos de fotos)
│
├── 📂 supportCards/
│   ├── card_1
│   ├── card_2
│   └── ... (documentos de tarjetas)
│
└── 📂 settings/
    └── relationship (fecha de inicio, configuraciones)
```

### Firebase Storage

```
📁 Storage
└── 📂 photos/
    ├── username_timestamp_imagen1.jpg
    ├── username_timestamp_imagen2.png
    └── ... (archivos de imágenes)
```

---

## 💻 Uso de la API del DataService

### Ejemplos de Código

```typescript
import { dataService } from './services/dataService';

// Obtener todas las fotos
const photos = await dataService.getPhotos();

// Obtener solo favoritos
const favorites = await dataService.getFavoritePhotos();

// Subir una imagen
const file = event.target.files[0];
const imageUrl = await dataService.uploadImage(file);

// Agregar una foto con la imagen subida
const photoId = await dataService.addPhoto({
  imageUrl: imageUrl,
  title: "Nueva foto",
  caption: "Descripción",
  date: "2025-10-04",
  category: "everyday",
  isFavorite: false
});

// Marcar como favorito
await dataService.toggleFavorite(photoId);

// Eliminar foto
await dataService.deletePhoto(photoId, imageUrl);
```

---

## 🔧 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Sincronizar con Capacitor (para mobile)
npm run cap:sync

# Compilar y sincronizar mobile
npm run cap:build
```

---

## ⚠️ Notas Importantes

1. **Primera Vez**: El script de inicialización solo debe ejecutarse UNA VEZ
2. **Reglas de Seguridad**: Las reglas actuales son para desarrollo. En producción, implementa reglas más seguras
3. **Límites de Firebase**: Plan gratuito (Spark):
   - Firestore: 1 GB almacenamiento, 50k lecturas/día
   - Storage: 5 GB almacenamiento, 1 GB descarga/día
   - Suficiente para un álbum personal

4. **Nombre de Usuario**: Guardado localmente, no en Firebase (no requiere autenticación)

5. **Datos Iniciales**: El script carga 10 fotos de ejemplo y 8 tarjetas de soporte

---

## 🐛 Solución de Problemas

### Error: "Permission Denied"
- Verifica que las reglas de Firestore y Storage estén configuradas correctamente
- Asegúrate de haber publicado las reglas en Firebase Console

### Error: "Failed to fetch"
- Verifica tu conexión a internet
- Comprueba que las credenciales de Firebase en `src/config/firebase.ts` sean correctas

### La app pide nombre cada vez
- Verifica que localStorage no se esté limpiando
- En navegadores privados/incógnito, el localStorage se borra al cerrar
- Revisa la configuración de privacidad del navegador

### Las fotos no se cargan
- Ejecuta el script de inicialización primero
- Verifica en Firebase Console que los documentos existan
- Revisa la consola del navegador para errores

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador (F12) para errores
2. Verifica Firebase Console para el estado de las colecciones
3. Asegúrate de que las reglas de seguridad estén correctamente configuradas

---

## ✨ ¡Listo!

Tu aplicación está completamente configurada con Firebase. Ahora puedes:
- ✅ Almacenar fotos y recuerdos en la nube
- ✅ Subir imágenes reales
- ✅ Marcar favoritos
- ✅ Compartir la experiencia entre dispositivos
- ✅ Mantener tus recuerdos seguros y accesibles

¡Disfruta tu álbum de aniversario! 💕
