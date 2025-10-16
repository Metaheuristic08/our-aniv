import type { Photo, SupportCard } from '../types';
import { userService } from './userService';
import { photoUrls } from '../data/photoUrls';

// Generate photos from GitHub repository URLs
const generatePhotosFromGitHub = (): Photo[] => {
  return photoUrls.map((photoData, index) => {
    // Parse date from photoData
    const photoDate = new Date(photoData.date);
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = monthNames[photoDate.getMonth()];
    const day = photoDate.getDate();
    
    // Categorize by date
    let category: Photo['category'] = 'everyday';
    let title = `${day} de ${month}`;
    let caption = 'Un momento especial juntos ❤️';
    
    if (photoData.date === '2023-11-01') {
      category = 'first-date';
      title = 'Nuestro Primer Encuentro';
      caption = 'El día que todo comenzó 💕';
    } else if (photoData.date === '2023-12-21') {
      category = 'celebration';
      title = 'Navidad 2023';
      caption = 'Nuestra primera Navidad juntos 🎄';
    } else if (photoData.date === '2024-02-14') {
      category = 'celebration';
      title = 'San Valentín 2024';
      caption = 'Celebrando nuestro amor 💝';
    } else if (photoDate.getMonth() === 0 || photoDate.getMonth() === 1) {
      category = 'milestone';
      caption = 'Creando memorias inolvidables 🌟';
    }
    
    return {
      id: `photo-${index + 1}`,
      imageUrl: photoData.url, // Using GitHub raw content URL
      title,
      caption,
      date: photoData.date,
      isFavorite: false,
      category,
      createdAt: new Date().toISOString(),
    };
  });
};

class DataService {
  private photos: Photo[] = generatePhotosFromGitHub();
  private readonly FAVORITES_KEY = 'anniversary_favorites';
  private readonly RELATIONSHIP_START_KEY = 'relationship_start_date';

  constructor() {
    // Load favorites from localStorage
    this.loadFavorites();
  }

  private loadFavorites(): void {
    try {
      const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
      if (favoritesJson) {
        const favoriteIds = JSON.parse(favoritesJson) as string[];
        this.photos = this.photos.map(photo => ({
          ...photo,
          isFavorite: favoriteIds.includes(photo.id)
        }));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  private saveFavorites(): void {
    try {
      const favoriteIds = this.photos
        .filter(photo => photo.isFavorite)
        .map(photo => photo.id);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  async getPhotos(): Promise<Photo[]> {
    // Sort by date descending (newest first)
    return [...this.photos].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getFavoritePhotos(): Promise<Photo[]> {
    const allPhotos = await this.getPhotos();
    return allPhotos.filter(photo => photo.isFavorite === true);
  }

  async getRandomPhotos(count: number = 10): Promise<Photo[]> {
    const allPhotos = await this.getPhotos();
    const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async toggleFavorite(photoId: string): Promise<void> {
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      photo.isFavorite = !photo.isFavorite;
      this.saveFavorites();
    }
  }

  async addPhoto(photo: Omit<Photo, 'id'>): Promise<string> {
    const username = userService.getUsername() || 'Anonymous';
    const newId = `photo-${this.photos.length + 1}`;
    const newPhoto: Photo = {
      ...photo,
      id: newId,
      uploadedBy: username,
      createdAt: new Date().toISOString(),
      isFavorite: photo.isFavorite || false
    };
    this.photos.push(newPhoto);
    return newId;
  }

  async convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file.size > 500 * 1024) {
        reject(new Error('Imagen muy grande. Usa una menor a 500KB'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
    });
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const base64Image = await this.convertImageToBase64(file);
      return base64Image;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deletePhoto(photoId: string): Promise<void> {
    this.photos = this.photos.filter(p => p.id !== photoId);
    this.saveFavorites();
  }

  async updatePhoto(photoId: string, updates: Partial<Photo>): Promise<void> {
    const photoIndex = this.photos.findIndex(p => p.id === photoId);
    if (photoIndex !== -1) {
      this.photos[photoIndex] = { ...this.photos[photoIndex], ...updates };
      if ('isFavorite' in updates) {
        this.saveFavorites();
      }
    }
  }

  async getSupportCards(): Promise<SupportCard[]> {
    // Mock support cards data
    return [
      {
        id: 'card-1',
        title: 'Te amo',
        description: 'Cada día contigo es un regalo especial',
        category: 'love',
        icon: 'favorite',
        color: '#ee2b8c',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'card-2',
        title: 'Siempre juntos',
        description: 'En las buenas y en las malas, siempre estaré aquí',
        category: 'support',
        icon: 'group',
        color: '#8b5cf6',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'card-3',
        title: 'Eres increíble',
        description: 'Tu sonrisa ilumina mis días',
        category: 'encouragement',
        icon: 'star',
        color: '#f59e0b',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getSupportCardsByCategory(category: SupportCard['category']): Promise<SupportCard[]> {
    const allCards = await this.getSupportCards();
    return allCards.filter(card => card.category === category);
  }

  async addSupportCard(_card: Omit<SupportCard, 'id'>): Promise<string> {
    // In a local implementation, this would be stored in localStorage
    // For now, just return a mock ID
    return `card-${Date.now()}`;
  }

  async getRelationshipStartDate(): Promise<Date> {
    try {
      const storedDate = localStorage.getItem(this.RELATIONSHIP_START_KEY);
      if (storedDate) {
        return new Date(storedDate);
      }
      return new Date('2023-11-07T00:00:00');
    } catch (error) {
      console.error('Error getting relationship start date:', error);
      return new Date('2023-11-07T00:00:00');
    }
  }

  async setRelationshipStartDate(date: Date): Promise<void> {
    try {
      localStorage.setItem(this.RELATIONSHIP_START_KEY, date.toISOString());
    } catch (error) {
      console.error('Error setting relationship start date:', error);
      throw error;
    }
  }

  calculateTimeTogether(startDate?: Date): { 
    years: number; 
    months: number; 
    days: number; 
    hours: number; 
    minutes: number; 
    seconds: number; 
    totalDays: number 
  } {
    const start = startDate || new Date('2023-11-07T00:00:00');
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor((totalDays % 365) % 30);
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return { years, months, days, hours, minutes, seconds, totalDays };
  }
}

export const dataService = new DataService();
