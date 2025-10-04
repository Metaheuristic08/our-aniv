import type { Photo, SupportCard } from '../config/firebase';
import { photoService, supportCardService } from './firebaseService';

// Data service with Firebase integration and fallback to mock data
class DataService {
  private useFirebase = true; // Set to true to use Firebase
  // Enhanced photos with more metadata
  private photos: Photo[] = [
    {
      id: "1",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJspmVhm21vg6fvWe3YvZe7kHLo4RqOix2Dc-262u17nBynNWdrZA4YVAnAEwYVnT6oIicmiLHDJt4wdl5L7WOijdRf6ObEwDOXwPVRIye7fNwGO6rdAapaDZRe_848LpCChsGuFvdM2EszByZCx7SOxArUNrfwFfVWiCMeSNz6uDvJR2vwR1a4dD03so7dzjF9R-ZtvLxYSHac1KGZ-qse8dj-UNlZuh6g-W_G2AgF4tgA4jgjg0H0z0JUhPXFvQihqOCXQjP5M",
      title: "Our first date",
      caption: "I was so nervous, but you were so easy to talk to. Best coffee of my life.",
      date: "2023-11-07",
      category: "first-date",
      isFavorite: true
    },
    {
      id: "2",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7c7q4AiSLo_SebkasXqzUiSYa2G8UmG9itXvqmQj7Fbun0EQVotE3X1kKQxnYnKekGWzvl2Ts8glXWxdIBO7UghxXHB77rvW9p5ikOwY0OSw9OCNmBRbWl51HMQ27VsHipmWOzKmjiBawDLtv1jfD6R2FyHzifaCLIl-af58rWaln-fPS6uBXpixvRxpipn4j8vzKJ_ecvWouljHNmvh1JCwCS10QyFHnoTn5ThJUBOW9EFTFQNuO1HCAkNlT_kt2jDPN7Yo-iE",
      title: "Our first trip",
      caption: "Remember getting lost in the mountains? That was an adventure!",
      date: "2023-12-15",
      category: "travel",
      isFavorite: false
    },
    {
      id: "3",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0wP63rFkjB_thSpxO4MC9Rhj-zAJoZxhz3PTg7A5R5FBpv1OakEIRTVGrD5M0npD_m70PK650luuP2psq2pxvwk60gJP8873jx8UEugVvOK25nzAUf1Gn44Jfzu0ygUav9zOXIpSsfA4EuqFRgWI1Byjg7_3ShPe1edaGvHWxE3pxRmv4_CkY35sluBtvSWd-AGDmI0qOSL9z4XPYnhoPYB7xvAPr0FhgsLQ8EAQn8dMLCvsrxOjAIx-paGFhQp6MmLjqKPfnhvU",
      title: "Our first Christmas",
      caption: "Building that gingerbread house was a sticky but sweet memory.",
      date: "2023-12-25",
      category: "celebration",
      isFavorite: true
    },
    {
      id: "4",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1vz6ZRTO4VSJlSGNXPJUQnvB25Cc9yyI10OshwUsn9f26FxMoGAnQdwlhAKQpe4Fcokvff7rLaOuMLWveGBGG4IO7O1J9USD06GrUr3LmJGHFmfPuGChB8e_ik-opuicbwZEsKDuvvhrT6YFfjPzSPbWIEaYCNZEVruWakCm7Np_ss3rAiFm6MHUR5Fkglou7vyQVZCYyGgtu4Z0L6LxWrak6Xj3FocSPayvYMYuWlPz2L_R4O8jOUGfLmv7BUZbTHYqXVKPuFDw",
      title: "Our first anniversary",
      caption: "That picnic by the lake was perfect. Can't believe it's been a year.",
      date: "2024-11-07",
      category: "milestone",
      isFavorite: true
    },
    {
      id: "5",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeG5hcd6gREdkFmqwZvZykMYWwXcl8yRBQyieDKRAATTMuv7Hj1tOjlqAPuNC8a7_4dxbvYy-LRY6t50Z2m_WDNsYe9RsuAXkOqUegCvqD1XySiwzCGaHjbfT9Bb-6mwhhb7fPtJZSeKWFTakf_Z_TxN2fEr_0lydh4-3CNYfxvuQw3c_4GM9Bv454awStVdTpgNy2QOtWpCIBxqeNnSXGPIqiJ_AqSRVOTH18vI2SqmVmZSj9Cs6Zcxtwm74CybQIfQ8zHZkhrE4",
      title: "Our second anniversary",
      caption: "Two years down, forever to go. I love you more every day.",
      date: "2025-11-07",
      category: "milestone",
      isFavorite: true
    },
    // Additional photos for mosaic
    {
      id: "6",
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      title: "Morning coffee together",
      caption: "Our daily ritual that keeps us connected.",
      date: "2024-03-15",
      category: "everyday",
      isFavorite: false
    },
    {
      id: "7",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
      title: "Beach sunset",
      caption: "Perfect ending to a perfect weekend getaway.",
      date: "2024-06-20",
      category: "travel",
      isFavorite: false
    },
    {
      id: "8",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400",
      title: "Home cooking adventure",
      caption: "Attempting to make pasta from scratch (it was messy!).",
      date: "2024-04-10",
      category: "everyday",
      isFavorite: false
    },
    {
      id: "9",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      title: "Concert night",
      caption: "Dancing to our favorite band under the stars.",
      date: "2024-08-05",
      category: "celebration",
      isFavorite: true
    },
    {
      id: "10",
      imageUrl: "https://images.unsplash.com/photo-1502780402662-acc01917fff4?w=400",
      title: "Autumn walk",
      caption: "Crunching leaves and holding hands.",
      date: "2024-10-15",
      category: "everyday",
      isFavorite: false
    }
  ];

  private supportCards: SupportCard[] = [
    {
      id: "1",
      title: "Respiración Profunda",
      message: "Inhala por 4 segundos, mantén por 4, exhala por 6. Estás seguro/a aquí.",
      category: "calming",
      icon: "air",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    {
      id: "2", 
      title: "Eres Increíble",
      message: "Cada día superas nuevos desafíos. Tu progreso es válido y valioso.",
      category: "motivating",
      icon: "star",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
    },
    {
      id: "3",
      title: "Textura Calmante",
      message: "Busca algo suave para tocar: una manta, almohada o tu objeto favorito.",
      category: "sensory",
      icon: "touch_app",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
    },
    {
      id: "4",
      title: "Rutina de Calma",
      message: "Hora de tu actividad favorita: música, dibujo, o simplemente descansar.",
      category: "routine",
      icon: "schedule",
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
    },
    {
      id: "5",
      title: "Paso a Paso",
      message: "No hay prisa. Puedes ir a tu propio ritmo, siempre.",
      category: "calming",
      icon: "timeline",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    {
      id: "6",
      title: "Celebra lo Pequeño",
      message: "Cada pequeño logro cuenta. Hoy has hecho algo importante.",
      category: "motivating", 
      icon: "celebration",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
    },
    {
      id: "7",
      title: "Espacio Seguro",
      message: "Este es tu lugar seguro. Aquí puedes ser exactamente como eres.",
      category: "general",
      icon: "home",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
    },
    {
      id: "8",
      title: "Comunicación Clara",
      message: "Está bien pedir lo que necesitas. Tu voz importa y merece ser escuchada.",
      category: "general",
      icon: "forum",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
    }
  ];

  // Photo services
  async getPhotos(): Promise<Photo[]> {
    if (this.useFirebase) {
      try {
        return await photoService.getPhotos();
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
        // Fallback to mock data
      }
    }
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.photos;
  }

  async getFavoritePhotos(): Promise<Photo[]> {
    if (this.useFirebase) {
      try {
        return await photoService.getFavoritePhotos();
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.photos.filter(photo => photo.isFavorite);
  }

  async getRandomPhotos(count: number = 10): Promise<Photo[]> {
    if (this.useFirebase) {
      try {
        return await photoService.getRandomPhotos(count);
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    const shuffled = [...this.photos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async toggleFavorite(photoId: string): Promise<void> {
    if (this.useFirebase) {
      try {
        await photoService.toggleFavorite(photoId);
        return;
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
      }
    }
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      photo.isFavorite = !photo.isFavorite;
    }
  }

  // Support cards services
  async getSupportCards(): Promise<SupportCard[]> {
    if (this.useFirebase) {
      try {
        return await supportCardService.getSupportCards();
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.supportCards;
  }

  async getSupportCardsByCategory(category: SupportCard['category']): Promise<SupportCard[]> {
    if (this.useFirebase) {
      try {
        return await supportCardService.getSupportCardsByCategory(category);
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.supportCards.filter(card => card.category === category);
  }

  // Relationship timeline data
  getRelationshipStartDate(): Date {
    return new Date('2023-11-07T00:00:00');
  }

  calculateTimeTogether(): {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
  } {
    const startDate = this.getRelationshipStartDate();
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();
    
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor((totalDays % 365) % 30);
    
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      years,
      months, 
      days,
      hours,
      minutes,
      seconds,
      totalDays
    };
  }
}

export const dataService = new DataService();