// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjIao4o-MXWqyw-ctesqHGZLdsxovgPzw",
  authDomain: "aniversario-02.firebaseapp.com",
  projectId: "aniversario-02",
  storageBucket: "aniversario-02.firebasestorage.app",
  messagingSenderId: "185974274427",
  appId: "1:185974274427:web:9fa01996de902f07f6a5de",
  measurementId: "G-TM66EK8PD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (Realtime Database - 100% GRATIS)
export const db = getDatabase(app);
export const analytics = getAnalytics(app);

// Data structure interfaces
export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  date: string;
  isFavorite?: boolean;
  category?: 'first-date' | 'travel' | 'celebration' | 'milestone' | 'everyday';
  uploadedBy?: string; // username who uploaded
  createdAt?: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  photos: string[]; // photo IDs
  tags: string[];
  createdBy?: string; // username who created
  createdAt?: string;
}

export interface SupportCard {
  id: string;
  title: string;
  message: string;
  category: 'calming' | 'motivating' | 'sensory' | 'routine' | 'general';
  icon: string;
  color: string;
}