# 🐭❤️😺 Our Anniversary - Aplicación de Memorias

Una aplicación web moderna y hermosa para guardar y compartir momentos especiales de nuestra relación, construida con React, TypeScript, Tailwind CSS y Firebase.

## ✨ Características

### 🖼️ Gestión de Fotos
- Álbum de fotos interactivo con diseño de tarjetas
- Categorías: primera cita, viajes, celebraciones, hitos, cotidiano
- Sistema de favoritos
- Mosaico aleatorio de memorias
- Carga optimizada con lazy loading

### 💝 Tarjetas de Apoyo
- Mensajes motivadores y calmantes
- Categorías: calmante, motivador, sensorial, rutina, general
- Interfaz táctil optimizada
- Filtrado por categoría

### 📅 Línea de Tiempo
- Seguimiento del tiempo juntos
- Visualización de hitos importantes
- Contador en tiempo real

### 🔐 Panel Secreto
- Gestión completa de fotos (CRUD)
- Gestión de tarjetas de apoyo (CRUD)
- Subida de imágenes desde archivo o URL
- Inicialización de datos de ejemplo
- Acceso en: `/secreto`

### 🎨 Experiencia de Usuario
- Diseño responsive (móvil primero)
- Modo oscuro/claro
- Animaciones fluidas
- Prompt de bienvenida (solicita nombre una vez)
- Nombre permanente (no se puede cambiar)

## 🚀 Tecnologías

- **Frontend**: React 19, TypeScript, Vite
- **Estilos**: Tailwind CSS 4
- **Backend**: Firebase
  - Firestore Database
  - Firebase Storage
- **Routing**: React Router 7
- **Icons**: Material Symbols
- **Mobile**: Capacitor (para apps nativas)

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ y npm
- Cuenta de Firebase

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Metaheuristic08/our-aniv.git
cd our-aniv
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Ve a [Firebase Console](https://console.firebase.google.com)
   - Crea o selecciona el proyecto `nuestro-aniversario-20866`
   - Sigue las instrucciones en `FIREBASE_SETUP.md`

4. **Ejecutar script de setup** (opcional)
```bash
./setup-firebase.sh
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

6. **Acceder a la aplicación**
   - Abre http://localhost:5173
   - Ingresa tu nombre cuando se te solicite
   - ¡Disfruta!

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Construcción
npm run build            # Compila TypeScript y construye para producción
npm run preview          # Vista previa de la build de producción

# Capacitor (Mobile)
npm run cap:sync         # Sincroniza archivos web con apps nativas
npm run cap:build        # Construye y sincroniza
npm run cap:android      # Abre Android Studio
npm run cap:ios          # Abre Xcode
npm run mobile:dev       # Build y ejecuta en Android
```

## 📂 Estructura del Proyecto

```
our-aniv/
├── src/
│   ├── components/           # Componentes React
│   │   ├── LazyImage.tsx    # Componente de carga lazy de imágenes
│   │   ├── MosaicGenerator.tsx
│   │   ├── NavigationFooter.tsx
│   │   ├── RelationshipTimeline.tsx
│   │   ├── SecretDashboard.tsx  # Panel de administración
│   │   ├── SupportCards.tsx
│   │   └── WelcomePrompt.tsx    # Prompt inicial de nombre
│   ├── config/
│   │   └── firebase.ts       # Configuración de Firebase
│   ├── services/
│   │   ├── dataService.ts    # Servicio de datos con fallback
│   │   └── firebaseService.ts # Operaciones de Firebase
│   ├── AnniversaryPhotoAlbum.tsx
│   ├── main.tsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── public/                   # Archivos estáticos
├── designs/                  # Archivos de diseño Stitch
├── FIREBASE_SETUP.md        # Guía de configuración de Firebase
├── VISUAL_IMPROVEMENTS.md   # Sugerencias de mejoras visuales
└── package.json
```

## 🔥 Configuración de Firebase

### Servicios Requeridos
1. **Firestore Database** - Base de datos en tiempo real
2. **Firebase Storage** - Almacenamiento de imágenes

### Colecciones de Firestore
- `photos` - Fotos del álbum
- `supportCards` - Tarjetas de apoyo

### Reglas de Seguridad
Ver `FIREBASE_SETUP.md` para reglas detalladas de seguridad.

### Inicializar Datos
1. Navega a `/secreto`
2. Ve a la pestaña "Configuración"
3. Haz clic en "Inicializar Datos"
4. Confirma la acción

Esto creará 5 fotos de ejemplo y 8 tarjetas de apoyo.

## 🎯 Uso del Panel Secreto

Accede en: `http://localhost:5173/secreto` (o tu dominio en producción)

### Funcionalidades
- **Fotos**: Agregar, editar, eliminar fotos
- **Tarjetas**: Agregar, editar, eliminar tarjetas de apoyo
- **Subida**: Desde archivo local o URL externa
- **Configuración**: Inicializar datos, ver estado de Firebase

## 🎨 Personalización

### Colores
Los colores principales se definen en `tailwind.config.js`:
- `primary`: #ee2b8c (Rosa)
- `background-light/dark`: Fondos claros/oscuros
- `content-light/dark`: Texto claro/oscuro
- `subtle-light/dark`: Bordes y elementos sutiles

### Fuentes
- **Texto**: Plus Jakarta Sans
- **Iconos**: Material Symbols Outlined

## ⚡ Optimizaciones de Rendimiento

### Implementadas
- ✅ Lazy loading de imágenes con Intersection Observer
- ✅ Code splitting de rutas
- ✅ Separación de vendors (React, Firebase)
- ✅ Optimistic UI updates
- ✅ Memoización de componentes
- ✅ Build optimizado con chunks manuales

### Métricas
- Bundle inicial: ~400 KB (reducción del 40%)
- Chunks separados para mejor caching
- Lazy loading de componentes de ruta

Ver `VISUAL_IMPROVEMENTS.md` para más sugerencias de optimización.

## 📱 Desarrollo Mobile

### Android
```bash
npm run cap:build
npm run cap:android
```

### iOS
```bash
npm run cap:build
npm run cap:ios
```

## 🔒 Seguridad

### Producción
Para producción, considera:
1. Implementar autenticación de Firebase
2. Restringir acceso al panel secreto
3. Actualizar reglas de Firestore/Storage
4. Proteger API keys sensibles

Ver `FIREBASE_SETUP.md` para recomendaciones detalladas.

## 🐛 Solución de Problemas

### Firebase no conecta
- Verifica que Firestore y Storage estén habilitados
- Revisa las reglas de seguridad
- Comprueba que las credenciales en `firebase.ts` sean correctas

### Las imágenes no cargan
- Verifica las reglas de Storage
- Comprueba CORS si usas dominio personalizado
- Revisa la consola del navegador para errores

### Build falla
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🤝 Contribuir

Este es un proyecto personal, pero las sugerencias son bienvenidas:
1. Fork el proyecto
2. Crea una rama de feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y personal.

## 💖 Reconocimientos

Hecho con amor para guardar nuestros momentos especiales juntos.

---

## 📞 Contacto

Para preguntas o sugerencias, abre un issue en GitHub.

---

**¡Disfruta guardando tus memorias! 🎉**
