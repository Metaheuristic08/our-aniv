// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA27E8HNQ5dnat4DEkmxm00EZdZBtQ42Q",
  authDomain: "mi-proyecto-firebase-155e3.firebaseapp.com",
  projectId: "mi-proyecto-firebase-155e3",
  storageBucket: "mi-proyecto-firebase-155e3.firebasestorage.app",
  messagingSenderId: "108475540261",
  appId: "1:108475540261:web:091dfda953695a098df0cc",
  measurementId: "G-8BVW29K8L2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (Realtime Database - 100% GRATIS)
export const db = getDatabase(app);
export const analytics = getAnalytics(app);

// TypeScript types for your data
export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  date: string;
  category: 'first-date' | 'travel' | 'celebration' | 'milestone' | 'everyday';
  isFavorite: boolean;
  uploadedBy?: string;
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
