# Firebase Setup Guide - Our Anniversary App

## 🔥 Configuración Inicial de Firebase

### 1. Acceder a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona el proyecto: **nuestro-aniversario-20866**

---

## 📊 Configurar Firestore Database

### Paso 1: Crear la Base de Datos
1. En el menú lateral izquierdo, haz clic en **"Firestore Database"**
2. Haz clic en el botón **"Crear base de datos"**
3. Selecciona el modo de inicio:
   - **Recomendado para desarrollo**: "Empezar en modo de prueba"
   - **Para producción**: "Empezar en modo de producción" (requiere configurar reglas)

### Paso 2: Seleccionar Ubicación
1. Elige la ubicación del servidor más cercana:
   - **Para América Latina**: `southamerica-east1` (São Paulo)
   - **Otra opción**: `us-central1` (Iowa)
2. Haz clic en **"Habilitar"**

### Paso 3: Configurar Reglas de Seguridad (IMPORTANTE)
1. Ve a la pestaña **"Reglas"** en Firestore
2. Reemplaza el contenido con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: true;
    }
    
    // Allow write access to photos collection
    match /photos/{photoId} {
      allow write: true;
    }
    
    // Allow write access to supportCards collection
    match /supportCards/{cardId} {
      allow write: true;
    }
  }
}
```

**⚠️ NOTA DE SEGURIDAD**: Estas reglas permiten acceso completo. Para producción, considera:
- Agregar autenticación de Firebase
- Restringir escritura solo a usuarios autenticados
- Implementar validación de datos

3. Haz clic en **"Publicar"**

---

## 📦 Configurar Firebase Storage

### Paso 1: Activar Storage
1. En el menú lateral, haz clic en **"Storage"**
2. Haz clic en **"Comenzar"**
3. Revisa las reglas de seguridad predeterminadas
4. Haz clic en **"Siguiente"**

### Paso 2: Seleccionar Ubicación
1. Selecciona la misma ubicación que usaste para Firestore
2. Haz clic en **"Listo"**

### Paso 3: Configurar Reglas de Storage
1. Ve a la pestaña **"Reglas"** en Storage
2. Reemplaza el contenido con estas reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: true;
    }
    
    // Allow write access to photos folder
    match /photos/{fileName} {
      allow write: true;
      allow delete: true;
    }
  }
}
```

3. Haz clic en **"Publicar"**

### Paso 4: Configurar CORS (Opcional pero recomendado)
Para permitir subida de archivos desde tu dominio:

1. Instala Google Cloud SDK (si no lo tienes)
2. Ejecuta:
```bash
echo '[{"origin": ["*"], "method": ["GET", "POST", "PUT", "DELETE"], "maxAgeSeconds": 3600}]' > cors.json
gsutil cors set cors.json gs://nuestro-aniversario-20866.firebasestorage.app
```

---

## 🚀 Inicializar Datos en la Aplicación

### Paso 1: Acceder al Panel Secreto
1. Abre la aplicación
2. Navega a: `http://localhost:5173/secreto` (en desarrollo) o `https://tu-dominio.com/secreto` (en producción)

### Paso 2: Inicializar Datos de Ejemplo
1. En el panel secreto, ve a la pestaña **"Configuración"**
2. Haz clic en **"Inicializar Datos"**
3. Confirma la acción
4. Espera a que se complete el proceso

**✅ Esto creará:**
- 5 fotos de ejemplo con categorías y fechas
- 8 tarjetas de apoyo con diferentes categorías

---

## 🔧 Estructura de Datos

### Colección: `photos`
```typescript
{
  id: string (auto-generado),
  imageUrl: string,
  title: string,
  caption: string,
  date: string (formato: YYYY-MM-DD),
  category: 'first-date' | 'travel' | 'celebration' | 'milestone' | 'everyday',
  isFavorite: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección: `supportCards`
```typescript
{
  id: string (auto-generado),
  title: string,
  message: string,
  category: 'calming' | 'motivating' | 'sensory' | 'routine' | 'general',
  icon: string (Material Symbol name),
  color: string (Tailwind classes),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 📱 Funcionalidades del Panel Secreto

### Gestión de Fotos
- ✅ Agregar nuevas fotos
- ✅ Editar fotos existentes
- ✅ Eliminar fotos
- ✅ Subir imágenes desde archivo o URL
- ✅ Marcar como favoritas
- ✅ Categorizar fotos

### Gestión de Tarjetas de Apoyo
- ✅ Agregar nuevas tarjetas
- ✅ Editar tarjetas existentes
- ✅ Eliminar tarjetas
- ✅ Categorizar tarjetas
- ✅ Personalizar iconos y colores

---

## 🎯 Verificación de la Configuración

### Checklist
- [ ] Firestore Database creado y activo
- [ ] Reglas de Firestore publicadas
- [ ] Firebase Storage configurado
- [ ] Reglas de Storage publicadas
- [ ] CORS configurado (si es necesario)
- [ ] Datos inicializados desde el panel secreto
- [ ] Verificar que las fotos se muestran en la app principal
- [ ] Verificar que las tarjetas se muestran en `/support`

### Probar la Integración
1. Visita la página principal: `/`
2. Deberías ver las fotos cargadas desde Firebase
3. Navega a `/support` para ver las tarjetas
4. Navega a `/mosaic` para ver el mosaico de fotos
5. Accede a `/secreto` para gestionar el contenido

---

## 🐛 Solución de Problemas

### Error: "Permission denied"
- **Causa**: Reglas de Firestore/Storage muy restrictivas
- **Solución**: Verifica que las reglas permitan lectura/escritura según la documentación arriba

### Error: "Firebase App not initialized"
- **Causa**: Configuración incorrecta en `firebase.ts`
- **Solución**: Verifica que las credenciales en `src/config/firebase.ts` sean correctas

### Las imágenes no se suben
- **Causa**: Storage no configurado o CORS bloqueado
- **Solución**: 
  1. Verifica que Storage esté activo
  2. Configura CORS como se indica arriba
  3. Verifica las reglas de Storage

### Los datos no se guardan
- **Causa**: Reglas de Firestore muy restrictivas
- **Solución**: Verifica las reglas de Firestore y asegúrate de que permitan escritura

---

## 🔐 Seguridad para Producción

### Recomendaciones
1. **Implementar Autenticación**
   - Usar Firebase Authentication
   - Restringir el panel secreto solo a usuarios autenticados

2. **Mejorar Reglas de Firestore**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: true;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Mejorar Reglas de Storage**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: true;
      allow write: if request.auth != null;
    }
  }
}
```

4. **Proteger Rutas Sensibles**
   - Agregar autenticación al acceso de `/secreto`
   - Implementar un sistema de roles

---

## 📊 Monitoreo

### Firebase Console
1. Ve a **"Firestore Database"** → **"Uso"** para ver estadísticas
2. Ve a **"Storage"** → **"Uso"** para ver almacenamiento usado
3. Monitorea los costos en **"Uso y facturación"**

### Límites del Plan Gratuito (Spark)
- **Firestore**: 1 GB almacenado, 50K lecturas/día, 20K escrituras/día
- **Storage**: 5 GB almacenado, 1 GB transferido/día
- **Hosting**: 10 GB transferido/mes

---

## 🎨 Próximas Mejoras Sugeridas

1. **Autenticación de Usuarios**
   - Implementar login con Google/Email
   - Proteger el dashboard secreto

2. **Optimizaciones de Rendimiento**
   - ✅ Lazy loading de imágenes (implementado)
   - Cache de Firestore queries
   - Compresión de imágenes antes de subir

3. **Funcionalidades Adicionales**
   - Comentarios en fotos
   - Reacciones/likes
   - Timeline interactivo
   - Compartir memorias

4. **PWA Features**
   - Offline support
   - Push notifications
   - Install prompt

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador para errores
2. Verifica la consola de Firebase para errores de reglas
3. Consulta la [documentación oficial de Firebase](https://firebase.google.com/docs)

---

**¡Listo! Tu aplicación ahora está completamente integrada con Firebase 🎉**
