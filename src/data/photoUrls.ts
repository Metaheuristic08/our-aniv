/**
 * Photo URLs from GitHub Repository
 * 
 * These images are served directly from the GitHub repository using raw content URLs.
 * Format: https://raw.githubusercontent.com/Metaheuristic08/our-aniv/main/images_nosotros/{filename}
 */

export interface PhotoData {
  url: string;
  date: string;
  filename: string;
}

const BASE_URL = 'https://raw.githubusercontent.com/Metaheuristic08/our-aniv/main/images_nosotros';

export const photoUrls: PhotoData[] = [
  {
    url: `${BASE_URL}/2023 11 01 (1).jpg`,
    date: '2023-11-01',
    filename: '2023 11 01 (1).jpg'
  },
  {
    url: `${BASE_URL}/2023 11 01 (2).jpg`,
    date: '2023-11-01',
    filename: '2023 11 01 (2).jpg'
  },
  {
    url: `${BASE_URL}/2023 11 01 (3).jpg`,
    date: '2023-11-01',
    filename: '2023 11 01 (3).jpg'
  },
  {
    url: `${BASE_URL}/2023 11 01.jpg`,
    date: '2023-11-01',
    filename: '2023 11 01.jpg'
  },
  {
    url: `${BASE_URL}/2023 11 06.jpg`,
    date: '2023-11-06',
    filename: '2023 11 06.jpg'
  },
  {
    url: `${BASE_URL}/2023 12 21 (1).jpg`,
    date: '2023-12-21',
    filename: '2023 12 21 (1).jpg'
  },
  {
    url: `${BASE_URL}/2023 12 21 (2).jpg`,
    date: '2023-12-21',
    filename: '2023 12 21 (2).jpg'
  },
  {
    url: `${BASE_URL}/2023 12 21.jpg`,
    date: '2023-12-21',
    filename: '2023 12 21.jpg'
  },
  {
    url: `${BASE_URL}/2024 01 06.jpg`,
    date: '2024-01-06',
    filename: '2024 01 06.jpg'
  },
  {
    url: `${BASE_URL}/2024 01 09.jpg`,
    date: '2024-01-09',
    filename: '2024 01 09.jpg'
  },
  {
    url: `${BASE_URL}/2024 01 25 (1).jpg`,
    date: '2024-01-25',
    filename: '2024 01 25 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 01 25.jpg`,
    date: '2024-01-25',
    filename: '2024 01 25.jpg'
  },
  {
    url: `${BASE_URL}/2024 01 26.jpg`,
    date: '2024-01-26',
    filename: '2024 01 26.jpg'
  },
  {
    url: `${BASE_URL}/2024 01 29.jpg`,
    date: '2024-01-29',
    filename: '2024 01 29.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 01 (1).jpg`,
    date: '2024-02-01',
    filename: '2024 02 01 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 01.jpg`,
    date: '2024-02-01',
    filename: '2024 02 01.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 05 (1).jpg`,
    date: '2024-02-05',
    filename: '2024 02 05 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 05 (2).jpg`,
    date: '2024-02-05',
    filename: '2024 02 05 (2).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 05.jpg`,
    date: '2024-02-05',
    filename: '2024 02 05.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 10 (1).jpg`,
    date: '2024-02-10',
    filename: '2024 02 10 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 10 (2).jpg`,
    date: '2024-02-10',
    filename: '2024 02 10 (2).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 10 (3).jpg`,
    date: '2024-02-10',
    filename: '2024 02 10 (3).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 10 (4).jpg`,
    date: '2024-02-10',
    filename: '2024 02 10 (4).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 10.jpg`,
    date: '2024-02-10',
    filename: '2024 02 10.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 11 (1).jpg`,
    date: '2024-02-11',
    filename: '2024 02 11 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 11 (2).jpg`,
    date: '2024-02-11',
    filename: '2024 02 11 (2).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 11 (3).jpg`,
    date: '2024-02-11',
    filename: '2024 02 11 (3).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 11.jpg`,
    date: '2024-02-11',
    filename: '2024 02 11.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 14 (1).jpg`,
    date: '2024-02-14',
    filename: '2024 02 14 (1).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 14 (2).jpg`,
    date: '2024-02-14',
    filename: '2024 02 14 (2).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 14 (3).jpg`,
    date: '2024-02-14',
    filename: '2024 02 14 (3).jpg'
  },
  {
    url: `${BASE_URL}/2024 02 14.jpg`,
    date: '2024-02-14',
    filename: '2024 02 14.jpg'
  },
  {
    url: `${BASE_URL}/2024 02 24.jpg`,
    date: '2024-02-24',
    filename: '2024 02 24.jpg'
  }
];

/**
 * Get all photo URLs
 */
export const getAllPhotoUrls = (): string[] => {
  return photoUrls.map(photo => photo.url);
};

/**
 * Get photos by date
 */
export const getPhotosByDate = (date: string): PhotoData[] => {
  return photoUrls.filter(photo => photo.date === date);
};

/**
 * Get photos grouped by month
 */
export const getPhotosByMonth = (): Record<string, PhotoData[]> => {
  return photoUrls.reduce((acc, photo) => {
    const month = photo.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(photo);
    return acc;
  }, {} as Record<string, PhotoData[]>);
};

/**
 * Get total number of photos
 */
export const getTotalPhotos = (): number => {
  return photoUrls.length;
};
