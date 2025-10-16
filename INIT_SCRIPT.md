# 🔥 SCRIPT DE INICIALIZACIÓN - Realtime Database

## Copia y pega este código en la consola del navegador (F12)

```javascript
// 1. Importar Firebase
import { db } from './src/config/firebase.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// 2. Datos de ejemplo
const initData = async () => {
  console.log('🔥 Iniciando Firebase Realtime Database...');
  
  const photos = {
    photo_1: {
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Our first date",
      caption: "I was so nervous, but you were so easy to talk to. Best coffee of my life.",
      date: "2023-11-07",
      category: "first-date",
      isFavorite: true,
      uploadedBy: "System",
      createdAt: new Date("2023-11-07").toISOString()
    },
    photo_2: {
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      title: "Our first trip",
      caption: "Remember getting lost in the mountains? That was an adventure!",
      date: "2023-12-15",
      category: "travel",
      isFavorite: false,
      uploadedBy: "System",
      createdAt: new Date("2023-12-15").toISOString()
    },
    photo_3: {
      imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800",
      title: "Our first Christmas",
      caption: "Building that gingerbread house was a sticky but sweet memory.",
      date: "2023-12-25",
      category: "celebration",
      isFavorite: true,
      uploadedBy: "System",
      createdAt: new Date("2023-12-25").toISOString()
    },
    photo_4: {
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
      title: "Our first anniversary",
      caption: "That picnic by the lake was perfect. Can't believe it's been a year.",
      date: "2024-11-07",
      category: "milestone",
      isFavorite: true,
      uploadedBy: "System",
      createdAt: new Date("2024-11-07").toISOString()
    },
    photo_5: {
      imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      title: "Beach sunset",
      caption: "Perfect ending to a perfect weekend getaway.",
      date: "2024-06-20",
      category: "travel",
      isFavorite: false,
      uploadedBy: "System",
      createdAt: new Date("2024-06-20").toISOString()
    },
    photo_6: {
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      title: "Morning coffee together",
      caption: "Our daily ritual that keeps us connected.",
      date: "2024-03-15",
      category: "everyday",
      isFavorite: false,
      uploadedBy: "System",
      createdAt: new Date("2024-03-15").toISOString()
    },
    photo_7: {
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      title: "Home cooking adventure",
      caption: "Attempting to make pasta from scratch (it was messy!).",
      date: "2024-04-10",
      category: "everyday",
      isFavorite: false,
      uploadedBy: "System",
      createdAt: new Date("2024-04-10").toISOString()
    },
    photo_8: {
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      title: "Concert night",
      caption: "Dancing to our favorite band under the stars.",
      date: "2024-08-05",
      category: "celebration",
      isFavorite: true,
      uploadedBy: "System",
      createdAt: new Date("2024-08-05").toISOString()
    },
    photo_9: {
      imageUrl: "https://images.unsplash.com/photo-1502780402662-acc01917fff4?w=800",
      title: "Autumn walk",
      caption: "Crunching leaves and holding hands.",
      date: "2024-10-15",
      category: "everyday",
      isFavorite: false,
      uploadedBy: "System",
      createdAt: new Date("2024-10-15").toISOString()
    },
    photo_10: {
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
      title: "Our second anniversary",
      caption: "Two years down, forever to go. I love you more every day.",
      date: "2025-11-07",
      category: "milestone",
      isFavorite: true,
      uploadedBy: "System",
      createdAt: new Date("2025-11-07").toISOString()
    }
  };

  const supportCards = {
    card_1: {
      title: "Respiración Profunda",
      message: "Inhala por 4 segundos, mantén por 4, exhala por 6. Estás seguro/a aquí.",
      category: "calming",
      icon: "air",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    card_2: {
      title: "Eres Increíble",
      message: "Cada día superas nuevos desafíos. Tu progreso es válido y valioso.",
      category: "motivating",
      icon: "star",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
    },
    card_3: {
      title: "Textura Calmante",
      message: "Busca algo suave para tocar: una manta, almohada o tu objeto favorito.",
      category: "sensory",
      icon: "touch_app",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
    },
    card_4: {
      title: "Rutina de Calma",
      message: "Hora de tu actividad favorita: música, dibujo, o simplemente descansar.",
      category: "routine",
      icon: "schedule",
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
    },
    card_5: {
      title: "Paso a Paso",
      message: "No hay prisa. Puedes ir a tu propio ritmo, siempre.",
      category: "calming",
      icon: "timeline",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    card_6: {
      title: "Celebra lo Pequeño",
      message: "Cada pequeño logro cuenta. Hoy has hecho algo importante.",
      category: "motivating",
      icon: "celebration",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
    },
    card_7: {
      title: "Espacio Seguro",
      message: "Este es tu lugar seguro. Aquí puedes ser exactamente como eres.",
      category: "general",
      icon: "home",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
    },
    card_8: {
      title: "Comunicación Clara",
      message: "Está bien pedir lo que necesitas. Tu voz importa y merece ser escuchada.",
      category: "general",
      icon: "forum",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
    }
  };

  const settings = {
    relationship: {
      startDate: new Date('2023-11-07T00:00:00').toISOString(),
      initialized: true,
      initializedAt: new Date().toISOString()
    }
  };

  try {
    await set(ref(db, 'photos'), photos);
    console.log('✅ Photos initialized!');
    
    await set(ref(db, 'supportCards'), supportCards);
    console.log('✅ Support cards initialized!');
    
    await set(ref(db, 'settings'), settings);
    console.log('✅ Settings initialized!');
    
    console.log('');
    console.log('🎉 Firebase Realtime Database initialization complete!');
    console.log('💰 100% FREE - No payment required!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// 3. Ejecutar
initData();
```

## O usa este comando más simple:

```javascript
// Versión corta - pegar en consola
fetch('/src/config/firebase.js').then(() => {
  import('./src/config/firebase.js').then(async ({ db }) => {
    const { ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    await set(ref(db, 'photos/photo_1'), {
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Primera cita",
      caption: "El mejor café de mi vida",
      date: "2023-11-07",
      category: "first-date",
      isFavorite: true
    });
    console.log('✅ ¡Listo! Recarga la página');
  });
});
```
