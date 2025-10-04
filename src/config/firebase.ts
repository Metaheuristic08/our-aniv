import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDGc7oddD6nad4ga83H4_B5eytEvugJD40",
  authDomain: "nuestro-aniversario-20866.firebaseapp.com",
  projectId: "nuestro-aniversario-20866",
  storageBucket: "nuestro-aniversario-20866.firebasestorage.app",
  messagingSenderId: "181677768589",
  appId: "1:181677768589:web:b67b5b7e3f5d9dbe6a87c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For now, we'll use mock data structure
export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  date: string;
  isFavorite?: boolean;
  category?: 'first-date' | 'travel' | 'celebration' | 'milestone' | 'everyday';
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  photos: string[]; // photo IDs
  tags: string[];
}

export interface SupportCard {
  id: string;
  title: string;
  message: string;
  category: 'calming' | 'motivating' | 'sensory' | 'routine' | 'general';
  icon: string;
  color: string;
}