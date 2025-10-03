// Firebase configuration
// TODO: Replace with your actual Firebase config when ready
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

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