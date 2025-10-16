// Type definitions for the Anniversary Photo Album app

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
  description: string;
  category: 'love' | 'support' | 'encouragement' | 'gratitude' | 'humor';
  icon: string;
  color: string;
  createdAt?: string;
}
