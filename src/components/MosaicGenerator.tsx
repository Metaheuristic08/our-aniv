import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import type { Photo } from '../config/firebase';
import { dataService } from '../services/dataService';
import NavigationFooter from './NavigationFooter.tsx';
import LazyImage from './LazyImage.tsx';

const MosaicGenerator: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const randomPhotos = await dataService.getRandomPhotos(10);
        setPhotos(randomPhotos);
      } catch (err) {
        setError('Error cargando las fotos');
        console.error('Error loading photos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const regenerateMosaic = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const randomPhotos = await dataService.getRandomPhotos(10);
      setPhotos(randomPhotos);
    } catch (err) {
      setError('Error regenerando el mosaico');
      console.error('Error regenerating mosaic:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-content-light dark:text-content-dark">Generando mosaico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
        <p className="text-content-light dark:text-content-dark">{error}</p>
        <button 
          onClick={regenerateMosaic}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-subtle-light/20 dark:border-subtle-dark/20">
        <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
          <Link to="/" className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors touch-manipulation">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Mosaico de Memorias
          </h1>
          <button 
            onClick={regenerateMosaic}
            className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors touch-manipulation"
            title="Regenerar mosaico"
          >
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              refresh
            </span>
          </button>
        </div>
      </header>

      {/* Mosaic Grid */}
      <main className="flex-grow overflow-y-auto px-3 sm:px-4 py-4 safe-area-inset-bottom">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-4xl mx-auto pb-4">
          {photos.map((photo, index) => {
            // Create variety in grid layout - less wide cards on mobile
            const isWide = index === 2 || (index === 7 && window.innerWidth > 640);
            
            return (
              <div
                key={photo.id}
                className={`
                  group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-subtle-dark/50
                  transform transition-all duration-300 active:scale-95 sm:hover:scale-105 sm:hover:shadow-xl
                  touch-manipulation
                  ${isWide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}
                `}
              >
                {/* Image */}
                <LazyImage
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="absolute inset-0 transition-transform duration-500 group-active:scale-110 sm:group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-active:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end opacity-80 group-active:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">{photo.title}</p>
                  <p className="text-white/90 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">{photo.caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-xs">{new Date(photo.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                    {photo.isFavorite && (
                      <span className="material-symbols-outlined text-primary text-sm">favorite</span>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-lg">
                  <span className="text-white text-xs capitalize font-medium">
                    {photo.category?.replace('-', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <NavigationFooter />
    </div>
  );
};

export default MosaicGenerator;