import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Photo, SupportCard, User } from '../config/firebase';

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  PHOTOS: 'photos',
  SUPPORT_CARDS: 'supportCards',
  MEMORIES: 'memories'
};

// User ID - stored in localStorage
const USER_ID_KEY = 'our_aniv_user_id';
const DEFAULT_USER_ID = 'default_user';

class FirebaseService {
  // Get or create user ID
  private getUserId(): string {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = DEFAULT_USER_ID;
      localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
  }

  // User services
  async getUserName(): Promise<string | null> {
    try {
      const userId = this.getUserId();
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        return userData.name;
      }
      return null;
    } catch (error) {
      console.error('Error getting user name:', error);
      return null;
    }
  }

  async setUserName(name: string): Promise<void> {
    try {
      const userId = this.getUserId();
      const userRef = doc(db, COLLECTIONS.USERS, userId);
      
      // Check if user already exists
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Name is immutable - don't allow changes
        console.warn('User name already set and cannot be changed');
        return;
      }
      
      // Create new user
      const userData: User = {
        id: userId,
        name: name.trim(),
        createdAt: new Date()
      };
      
      await setDoc(userRef, {
        ...userData,
        createdAt: Timestamp.fromDate(userData.createdAt)
      });
    } catch (error) {
      console.error('Error setting user name:', error);
      throw error;
    }
  }

  // Photo services
  async getPhotos(): Promise<Photo[]> {
    try {
      const photosRef = collection(db, COLLECTIONS.PHOTOS);
      const q = query(photosRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Photo;
      });
    } catch (error) {
      console.error('Error getting photos:', error);
      return [];
    }
  }

  async getFavoritePhotos(): Promise<Photo[]> {
    try {
      const photosRef = collection(db, COLLECTIONS.PHOTOS);
      const q = query(photosRef, where('isFavorite', '==', true), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Photo;
      });
    } catch (error) {
      console.error('Error getting favorite photos:', error);
      return [];
    }
  }

  async addPhoto(photo: Omit<Photo, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const photosRef = collection(db, COLLECTIONS.PHOTOS);
      const now = Timestamp.now();
      
      const docRef = await addDoc(photosRef, {
        ...photo,
        createdAt: now,
        updatedAt: now
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding photo:', error);
      throw error;
    }
  }

  async toggleFavorite(photoId: string): Promise<void> {
    try {
      const photoRef = doc(db, COLLECTIONS.PHOTOS, photoId);
      const photoDoc = await getDoc(photoRef);
      
      if (photoDoc.exists()) {
        const currentFavorite = photoDoc.data().isFavorite || false;
        await updateDoc(photoRef, {
          isFavorite: !currentFavorite,
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  // Support Cards services
  async getSupportCards(): Promise<SupportCard[]> {
    try {
      const cardsRef = collection(db, COLLECTIONS.SUPPORT_CARDS);
      const querySnapshot = await getDocs(cardsRef);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as SupportCard;
      });
    } catch (error) {
      console.error('Error getting support cards:', error);
      return [];
    }
  }

  async getSupportCardsByCategory(category: SupportCard['category']): Promise<SupportCard[]> {
    try {
      const cardsRef = collection(db, COLLECTIONS.SUPPORT_CARDS);
      const q = query(cardsRef, where('category', '==', category));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as SupportCard;
      });
    } catch (error) {
      console.error('Error getting support cards by category:', error);
      return [];
    }
  }

  // Storage services
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Initialize database with mock data (for first-time setup)
  async initializeDatabase(photos: Photo[], supportCards: SupportCard[]): Promise<void> {
    try {
      console.log('Initializing database with mock data...');
      
      // Add photos
      for (const photo of photos) {
        const { id, createdAt, updatedAt, ...photoData } = photo;
        await setDoc(doc(db, COLLECTIONS.PHOTOS, id), {
          ...photoData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      
      // Add support cards
      for (const card of supportCards) {
        const { id, createdAt, updatedAt, ...cardData } = card;
        await setDoc(doc(db, COLLECTIONS.SUPPORT_CARDS, id), {
          ...cardData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      
      console.log('Database initialized successfully!');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
