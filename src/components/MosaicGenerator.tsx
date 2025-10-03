import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Photo } from '../config/firebase';
import { dataService } from '../services/dataService';

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

  const regenerateMosaic = async () => {
    try {
      setLoading(true);
      const randomPhotos = await dataService.getRandomPhotos(10);
      setPhotos(randomPhotos);
    } catch (err) {
      setError('Error regenerando el mosaico');
      console.error('Error regenerating mosaic:', err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Mosaico de Memorias
          </h1>
          <button 
            onClick={regenerateMosaic}
            className="w-10 h-10 flex items-center justify-center"
            title="Regenerar mosaico"
          >
            <span className="material-symbols-outlined text-content-light dark:text-content-dark">
              refresh
            </span>
          </button>
        </div>
      </header>

      {/* Mosaic Grid */}
      <main className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 max-w-4xl mx-auto">
          {photos.map((photo, index) => {
            // Create variety in grid layout
            const isWide = (index === 2 || index === 7); // Some photos take 2 columns
            
            return (
              <div
                key={photo.id}
                className={`
                  group relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-subtle-dark/50
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                  ${isWide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}
                `}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm md:text-base">{photo.title}</p>
                  <p className="text-white/80 text-xs md:text-sm mt-1 line-clamp-2">{photo.caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/60 text-xs">{new Date(photo.date).toLocaleDateString()}</span>
                    {photo.isFavorite && (
                      <span className="material-symbols-outlined text-primary text-sm">favorite</span>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-full">
                  <span className="text-white text-xs capitalize">
                    {photo.category?.replace('-', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8 mb-4">
          <button
            onClick={regenerateMosaic}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined">refresh</span>
            Nuevo Mosaico
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-lg hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined">photo_library</span>
            Ver Album
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MosaicGenerator;