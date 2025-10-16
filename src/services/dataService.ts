import type { Photo, SupportCard } from '../config/firebase';
import { db } from '../config/firebase';
import { ref, get, set, push, update, remove } from 'firebase/database';
import { userService } from './userService';

class DataService {
  private readonly PHOTOS_PATH = 'photos';
  private readonly SUPPORT_CARDS_PATH = 'supportCards';
  private readonly SETTINGS_PATH = 'settings';

  async getPhotos(): Promise<Photo[]> {
    try {
      const photosRef = ref(db, this.PHOTOS_PATH);
      const snapshot = await get(photosRef);
      if (!snapshot.exists()) return [];
      const photosData = snapshot.val();
      return Object.keys(photosData).map(key => ({ id: key, ...photosData[key] } as Photo))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error getting photos:', error);
      return [];
    }
  }

  async getFavoritePhotos(): Promise<Photo[]> {
    try {
      const allPhotos = await this.getPhotos();
      return allPhotos.filter(photo => photo.isFavorite === true);
    } catch (error) {
      console.error('Error getting favorite photos:', error);
      return [];
    }
  }

  async getRandomPhotos(count: number = 10): Promise<Photo[]> {
    try {
      const allPhotos = await this.getPhotos();
      const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Error getting random photos:', error);
      return [];
    }
  }

  async toggleFavorite(photoId: string): Promise<void> {
    try {
      const photoRef = ref(db, `${this.PHOTOS_PATH}/${photoId}`);
      const snapshot = await get(photoRef);
      if (snapshot.exists()) {
        const currentFavorite = snapshot.val().isFavorite || false;
        await update(photoRef, { isFavorite: !currentFavorite });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  async addPhoto(photo: Omit<Photo, 'id'>): Promise<string> {
    try {
      const username = userService.getUsername() || 'Anonymous';
      const photosRef = ref(db, this.PHOTOS_PATH);
      const newPhoto = { ...photo, uploadedBy: username, createdAt: new Date().toISOString(), isFavorite: photo.isFavorite || false };
      const newPhotoRef = push(photosRef);
      await set(newPhotoRef, newPhoto);
      return newPhotoRef.key || '';
    } catch (error) {
      console.error('Error adding photo:', error);
      throw error;
    }
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
    try {
      const photoRef = ref(db, `${this.PHOTOS_PATH}/${photoId}`);
      await remove(photoRef);
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  }

  async updatePhoto(photoId: string, updates: Partial<Photo>): Promise<void> {
    try {
      const photoRef = ref(db, `${this.PHOTOS_PATH}/${photoId}`);
      await update(photoRef, updates);
    } catch (error) {
      console.error('Error updating photo:', error);
      throw error;
    }
  }

  async getSupportCards(): Promise<SupportCard[]> {
    try {
      const cardsRef = ref(db, this.SUPPORT_CARDS_PATH);
      const snapshot = await get(cardsRef);
      if (!snapshot.exists()) return [];
      const cardsData = snapshot.val();
      return Object.keys(cardsData).map(key => ({ id: key, ...cardsData[key] } as SupportCard));
    } catch (error) {
      console.error('Error getting support cards:', error);
      return [];
    }
  }

  async getSupportCardsByCategory(category: SupportCard['category']): Promise<SupportCard[]> {
    try {
      const allCards = await this.getSupportCards();
      return allCards.filter(card => card.category === category);
    } catch (error) {
      console.error('Error getting support cards by category:', error);
      return [];
    }
  }

  async addSupportCard(card: Omit<SupportCard, 'id'>): Promise<string> {
    try {
      const cardsRef = ref(db, this.SUPPORT_CARDS_PATH);
      const newCardRef = push(cardsRef);
      await set(newCardRef, card);
      return newCardRef.key || '';
    } catch (error) {
      console.error('Error adding support card:', error);
      throw error;
    }
  }

  async getRelationshipStartDate(): Promise<Date> {
    try {
      const settingsRef = ref(db, `${this.SETTINGS_PATH}/relationship`);
      const snapshot = await get(settingsRef);
      if (snapshot.exists() && snapshot.val().startDate) {
        return new Date(snapshot.val().startDate);
      }
      return new Date('2023-11-07T00:00:00');
    } catch (error) {
      console.error('Error getting relationship start date:', error);
      return new Date('2023-11-07T00:00:00');
    }
  }

  async setRelationshipStartDate(date: Date): Promise<void> {
    try {
      const settingsRef = ref(db, `${this.SETTINGS_PATH}/relationship`);
      await update(settingsRef, { startDate: date.toISOString() });
    } catch (error) {
      console.error('Error setting relationship start date:', error);
      throw error;
    }
  }

  calculateTimeTogether(startDate?: Date): { years: number; months: number; days: number; hours: number; minutes: number; seconds: number; totalDays: number } {
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
