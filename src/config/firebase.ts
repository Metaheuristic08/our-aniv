// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDGc7oddD6nad4ga83H4_B5eytEvugJD40",
  authDomain: "nuestro-aniversario-20866.firebaseapp.com",
  projectId: "nuestro-aniversario-20866",
  storageBucket: "nuestro-aniversario-20866.firebasestorage.app",
  messagingSenderId: "181677768589",
  appId: "1:181677768589:web:b67b5b7e3f5d9dbe6a87c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Data interfaces
export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  date: string;
  isFavorite?: boolean;
  category?: 'first-date' | 'travel' | 'celebration' | 'milestone' | 'everyday';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  photos: string[]; // photo IDs
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SupportCard {
  id: string;
  title: string;
  message: string;
  category: 'calming' | 'motivating' | 'sensory' | 'routine' | 'general';
  icon: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  createdAt: Date;
  // Name is immutable after first set
}