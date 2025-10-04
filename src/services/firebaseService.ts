import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Photo, SupportCard } from '../config/firebase';

// User settings management
export const userSettings = {
  getUserName(): string | null {
    return localStorage.getItem('userName');
  },

  setUserName(name: string): void {
    localStorage.setItem('userName', name);
  },

  hasUserName(): boolean {
    return localStorage.getItem('userName') !== null;
  }
};

// Photo operations
export const photoService = {
  async getPhotos(): Promise<Photo[]> {
    try {
      const photosRef = collection(db, 'photos');
      const q = query(photosRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
    } catch (error) {
      console.error('Error getting photos:', error);
      throw error;
    }
  },

  async getFavoritePhotos(): Promise<Photo[]> {
    const photos = await this.getPhotos();
    return photos.filter(photo => photo.isFavorite);
  },

  async getRandomPhotos(count: number = 10): Promise<Photo[]> {
    const photos = await this.getPhotos();
    const shuffled = [...photos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  async addPhoto(photo: Omit<Photo, 'id'>): Promise<string> {
    try {
      const photosRef = collection(db, 'photos');
      const docRef = await addDoc(photosRef, {
        ...photo,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding photo:', error);
      throw error;
    }
  },

  async updatePhoto(id: string, data: Partial<Photo>): Promise<void> {
    try {
      const photoRef = doc(db, 'photos', id);
      await updateDoc(photoRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating photo:', error);
      throw error;
    }
  },

  async deletePhoto(id: string): Promise<void> {
    try {
      const photoRef = doc(db, 'photos', id);
      await deleteDoc(photoRef);
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  },

  async toggleFavorite(photoId: string): Promise<void> {
    try {
      const photoRef = doc(db, 'photos', photoId);
      const photoDoc = await getDoc(photoRef);
      if (photoDoc.exists()) {
        const currentFavorite = photoDoc.data().isFavorite || false;
        await updateDoc(photoRef, {
          isFavorite: !currentFavorite
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
};

// Support card operations
export const supportCardService = {
  async getSupportCards(): Promise<SupportCard[]> {
    try {
      const cardsRef = collection(db, 'supportCards');
      const snapshot = await getDocs(cardsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SupportCard[];
    } catch (error) {
      console.error('Error getting support cards:', error);
      throw error;
    }
  },

  async getSupportCardsByCategory(category: SupportCard['category']): Promise<SupportCard[]> {
    const cards = await this.getSupportCards();
    return cards.filter(card => card.category === category);
  },

  async addSupportCard(card: Omit<SupportCard, 'id'>): Promise<string> {
    try {
      const cardsRef = collection(db, 'supportCards');
      const docRef = await addDoc(cardsRef, {
        ...card,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding support card:', error);
      throw error;
    }
  },

  async updateSupportCard(id: string, data: Partial<SupportCard>): Promise<void> {
    try {
      const cardRef = doc(db, 'supportCards', id);
      await updateDoc(cardRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating support card:', error);
      throw error;
    }
  },

  async deleteSupportCard(id: string): Promise<void> {
    try {
      const cardRef = doc(db, 'supportCards', id);
      await deleteDoc(cardRef);
    } catch (error) {
      console.error('Error deleting support card:', error);
      throw error;
    }
  }
};

// Storage operations
export const storageService = {
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Initialize default data (for first time setup)
export const initializeDefaultData = async () => {
  try {
    // Check if data already exists
    const photosSnapshot = await getDocs(collection(db, 'photos'));
    if (!photosSnapshot.empty) {
      console.log('Data already initialized');
      return;
    }

    // Default photos
    const defaultPhotos = [
      {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJspmVhm21vg6fvWe3YvZe7kHLo4RqOix2Dc-262u17nBynNWdrZA4YVAnAEwYVnT6oIicmiLHDJt4wdl5L7WOijdRf6ObEwDOXwPVRIye7fNwGO6rdAapaDZRe_848LpCChsGuFvdM2EszByZCx7SOxArUNrfwFfVWiCMeSNz6uDvJR2vwR1a4dD03so7dzjF9R-ZtvLxYSHac1KGZ-qse8dj-UNlZuh6g-W_G2AgF4tgA4jgjg0H0z0JUhPXFvQihqOCXQjP5M",
        title: "Our first date",
        caption: "I was so nervous, but you were so easy to talk to. Best coffee of my life.",
        date: "2023-11-07",
        category: "first-date" as const,
        isFavorite: true
      },
      {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7c7q4AiSLo_SebkasXqzUiSYa2G8UmG9itXvqmQj7Fbun0EQVotE3X1kKQxnYnKekGWzvl2Ts8glXWxdIBO7UghxXHB77rvW9p5ikOwY0OSw9OCNmBRbWl51HMQ27VsHipmWOzKmjiBawDLtv1jfD6R2FyHzifaCLIl-af58rWaln-fPS6uBXpixvRxpipn4j8vzKJ_ecvWouljHNmvh1JCwCS10QyFHnoTn5ThJUBOW9EFTFQNuO1HCAkNlT_kt2jDPN7Yo-iE",
        title: "Our first trip",
        caption: "Remember getting lost in the mountains? That was an adventure!",
        date: "2023-12-15",
        category: "travel" as const,
        isFavorite: false
      },
      {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0wP63rFkjB_thSpxO4MC9Rhj-zAJoZxhz3PTg7A5R5FBpv1OakEIRTVGrD5M0npD_m70PK650luuP2psq2pxvwk60gJP8873jx8UEugVvOK25nzAUf1Gn44Jfzu0ygUav9zOXIpSsfA4EuqFRgWI1Byjg7_3ShPe1edaGvHWxE3pxRmv4_CkY35sluBtvSWd-AGDmI0qOSL9z4XPYnhoPYB7xvAPr0FhgsLQ8EAQn8dMLCvsrxOjAIx-paGFhQp6MmLjqKPfnhvU",
        title: "Our first Christmas",
        caption: "Building that gingerbread house was a sticky but sweet memory.",
        date: "2023-12-25",
        category: "celebration" as const,
        isFavorite: true
      },
      {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1vz6ZRTO4VSJlSGNXPJUQnvB25Cc9yyI10OshwUsn9f26FxMoGAnQdwlhAKQpe4Fcokvff7rLaOuMLWveGBGG4IO7O1J9USD06GrUr3LmJGHFmfPuGChB8e_ik-opuicbwZEsKDuvvhrT6YFfjPzSPbWIEaYCNZEVruWakCm7Np_ss3rAiFm6MHUR5Fkglou7vyQVZCYyGgtu4Z0L6LxWrak6Xj3FocSPayvYMYuWlPz2L_R4O8jOUGfLmv7BUZbTHYqXVKPuFDw",
        title: "Our first anniversary",
        caption: "That picnic by the lake was perfect. Can't believe it's been a year.",
        date: "2024-11-07",
        category: "milestone" as const,
        isFavorite: true
      },
      {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeG5hcd6gREdkFmqwZvZykMYWwXcl8yRBQyieDKRAATTMuv7Hj1tOjlqAPuNC8a7_4dxbvYy-LRY6t50Z2m_WDNsYe9RsuAXkOqUegCvqD1XySiwzCGaHjbfT9Bb-6mwhhb7fPtJZSeKWFTakf_Z_TxN2fEr_0lydh4-3CNYfxvuQw3c_4GM9Bv454awStVdTpgNy2QOtWpCIBxqeNnSXGPIqiJ_AqSRVOTH18vI2SqmVmZSj9Cs6Zcxtwm74CybQIfQ8zHZkhrE4",
        title: "Our second anniversary",
        caption: "Two years down, forever to go. I love you more every day.",
        date: "2025-11-07",
        category: "milestone" as const,
        isFavorite: true
      }
    ];

    // Default support cards
    const defaultCards = [
      {
        title: "Respiración Profunda",
        message: "Inhala por 4 segundos, mantén por 4, exhala por 6. Estás seguro/a aquí.",
        category: "calming" as const,
        icon: "air",
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      },
      {
        title: "Eres Increíble",
        message: "Cada día superas nuevos desafíos. Tu progreso es válido y valioso.",
        category: "motivating" as const,
        icon: "star",
        color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
      },
      {
        title: "Textura Calmante",
        message: "Busca algo suave para tocar: una manta, almohada o tu objeto favorito.",
        category: "sensory" as const,
        icon: "touch_app",
        color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
      },
      {
        title: "Rutina de Calma",
        message: "Hora de tu actividad favorita: música, dibujo, o simplemente descansar.",
        category: "routine" as const,
        icon: "schedule",
        color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      },
      {
        title: "Paso a Paso",
        message: "No hay prisa. Puedes ir a tu propio ritmo, siempre.",
        category: "calming" as const,
        icon: "timeline",
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      },
      {
        title: "Celebra lo Pequeño",
        message: "Cada pequeño logro cuenta. Hoy has hecho algo importante.",
        category: "motivating" as const,
        icon: "celebration",
        color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
      },
      {
        title: "Espacio Seguro",
        message: "Este es tu lugar seguro. Aquí puedes ser exactamente como eres.",
        category: "general" as const,
        icon: "home",
        color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
      },
      {
        title: "Comunicación Clara",
        message: "Está bien pedir lo que necesitas. Tu voz importa y merece ser escuchada.",
        category: "general" as const,
        icon: "forum",
        color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
      }
    ];

    // Add photos
    for (const photo of defaultPhotos) {
      await photoService.addPhoto(photo);
    }

    // Add support cards
    for (const card of defaultCards) {
      await supportCardService.addSupportCard(card);
    }

    console.log('Default data initialized successfully');
  } catch (error) {
    console.error('Error initializing default data:', error);
    throw error;
  }
};
