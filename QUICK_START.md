# Guía Rápida - Firebase

## 🚀 Inicio Rápido (5 Minutos)

### 1. Activar Firebase Console

Ve a: https://console.firebase.google.com/project/nuestro-aniversario-20866

#### A. Activar Firestore
```
Firestore Database → Create database → Test mode → Ubicación → Enable
```

#### B. Activar Storage
```
Storage → Get started → Test mode → Ubicación → Done
```

### 2. Inicializar Datos

```bash
npm run dev
```

Haz clic en el botón **"Inicializar Base de Datos"** (esquina inferior derecha)

### 3. ¡Listo!

Recarga la página y verás la pantalla de bienvenida.

---

## 📋 Checklist Mínimo

- [ ] Firestore activado en Firebase Console
- [ ] Storage activado en Firebase Console
- [ ] Datos inicializados (botón en la UI)
- [ ] Nombre de usuario ingresado

---

## 🔧 Reglas de Seguridad (Test Mode - 30 días)

### Firestore
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

### Storage
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

⚠️ **Importante:** Estas reglas expiran en 30 días. Ver `FIREBASE_SETUP.md` para reglas de producción.

---

## 🆘 Problemas Comunes

### "Permission denied"
→ Verifica que las reglas de Firestore/Storage permitan lectura/escritura

### "Firestore is not enabled"
→ Activa Firestore en Firebase Console

### "No se cargan las fotos"
→ Ejecuta la inicialización de datos (botón en la UI)

### "El nombre no se guarda"
→ Verifica reglas de Firestore y conexión a Internet

---

## 📚 Documentación Completa

- `FIREBASE_SETUP.md` - Guía detallada de configuración
- `IMPLEMENTATION_SUMMARY.md` - Resumen técnico completo

---

## 🎯 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Ver instrucciones de inicialización
npm run init-firebase
```

---

**¡Eso es todo!** 🎉
