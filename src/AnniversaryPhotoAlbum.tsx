
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import type { Photo } from './config/firebase';
import { dataService } from './services/dataService';
import NavigationFooter from './components/NavigationFooter.tsx';
import LazyImage from './components/LazyImage.tsx';

const AnniversaryPhotoAlbum: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const allPhotos = await dataService.getPhotos();
        setPhotos(allPhotos);
      } catch (err) {
        console.error('Error loading photos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const toggleFavorite = async (photoId: string) => {
    try {
      await dataService.toggleFavorite(photoId);
      // Update photos state optimistically for better UX
      setPhotos(prevPhotos => 
        prevPhotos.map(photo => 
          photo.id === photoId 
            ? { ...photo, isFavorite: !photo.isFavorite }
            : photo
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
      // Reload photos to sync with server on error
      const updatedPhotos = await dataService.getPhotos();
      setPhotos(updatedPhotos);
    }
  };

  // Memoize the AddMemoryModal to prevent re-renders
  const AddMemoryModal = useMemo(() => 
    ({ onClose }: { onClose: () => void }) => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background-light dark:bg-background-dark rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md sm:w-full p-6 pb-8 safe-area-inset-bottom animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator for mobile */}
        <div className="w-12 h-1 bg-subtle-light dark:bg-subtle-dark rounded-full mx-auto mb-4 sm:hidden"></div>
        
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">
              add_circle
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-content-light dark:text-content-dark mb-3">
            Agregar Nueva Memoria
          </h2>
          <p className="text-content-light/70 dark:text-content-dark/70 mb-6 leading-relaxed">
            Esta funcionalidad estará disponible próximamente. Por ahora, puedes explorar nuestras memorias existentes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-xl hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80 transition-colors touch-manipulation font-medium"
            >
              Cerrar
            </button>
            <Link
              to="/mosaic"
              onClick={onClose}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors touch-manipulation font-medium text-center"
            >
              Ver Mosaico
            </Link>
          </div>
        </div>
      </div>
    </div>
  ), []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-content-light dark:text-content-dark">Cargando nuestras memorias...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-between min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-subtle-light/20 dark:border-subtle-dark/20">
        <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
          <div className="w-12"></div>
          <h1 className="text-lg sm:text-xl font-bold text-center flex-1 text-content-light dark:text-content-dark">Our Story</h1>
          <button 
            className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors touch-manipulation"
            onClick={() => setShowAddModal(true)}
          >
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              add_circle
            </span>
          </button>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        <div className="h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-3 sm:px-4 gap-3 sm:gap-4 py-4">
          {photos.map((photo) => (
            <div key={photo.id} className="flex-shrink-0 w-[90vw] sm:w-[85vw] max-w-sm snap-center">
              <div className="relative bg-white dark:bg-subtle-dark/50 rounded-xl shadow-lg flex flex-col justify-end overflow-hidden aspect-[9/16] group touch-manipulation">
                <LazyImage
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="absolute inset-0 transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Favorite Button - Larger for mobile */}
                <button
                  onClick={() => toggleFavorite(photo.id)}
                  className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors touch-manipulation"
                >
                  <span className={`material-symbols-outlined text-2xl ${
                    photo.isFavorite ? 'text-primary' : 'text-white/80'
                  }`}>
                    {photo.isFavorite ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Category Badge */}
                {photo.category && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                    <span className="text-white/90 text-xs font-medium capitalize">
                      {photo.category.replace('-', ' ')}
                    </span>
                  </div>
                )}

                <div className="relative text-white z-10 p-4 sm:p-5">
                  <p className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{photo.title}</p>
                  <p className="text-sm sm:text-base leading-relaxed mb-3 text-white/90">{photo.caption}</p>
                  <p className="text-xs text-white/70">
                    {new Date(photo.date).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <NavigationFooter />

      {/* Add Memory Modal - Mobile optimized */}
      {showAddModal && (
        <AddMemoryModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default AnniversaryPhotoAlbum;
