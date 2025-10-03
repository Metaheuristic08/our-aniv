
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Photo } from './config/firebase';
import { dataService } from './services/dataService';

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
      // Reload photos to reflect the change
      const updatedPhotos = await dataService.getPhotos();
      setPhotos(updatedPhotos);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const AddMemoryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">
              add_circle
            </span>
          </div>
          <h2 className="text-2xl font-bold text-content-light dark:text-content-dark mb-2">
            Agregar Nueva Memoria
          </h2>
          <p className="text-content-light/70 dark:text-content-dark/70 mb-6">
            Esta funcionalidad estará disponible próximamente. Por ahora, puedes explorar nuestras memorias existentes.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-lg hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80 transition-colors"
            >
              Cerrar
            </button>
            <Link
              to="/mosaic"
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ver Mosaico
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-content-light dark:text-content-dark">Cargando nuestras memorias...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="w-10"></div>
          <h1 className="text-lg font-bold text-center flex-1">Our Story</h1>
          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <span className="material-symbols-outlined text-content-light dark:text-content-dark">
              add_circle
            </span>
          </button>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto pb-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="flex-shrink-0 w-[85vw] snap-center">
              <div className="relative bg-white dark:bg-subtle-dark/50 rounded-lg shadow-md flex flex-col justify-end overflow-hidden aspect-[9/16] p-4 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(photo.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <span className={`material-symbols-outlined text-xl ${
                    photo.isFavorite ? 'text-primary' : 'text-white/70'
                  }`}>
                    {photo.isFavorite ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Category Badge */}
                {photo.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                    <span className="text-white/90 text-xs font-medium capitalize">
                      {photo.category.replace('-', ' ')}
                    </span>
                  </div>
                )}

                <div className="relative text-white z-10">
                  <p className="text-xl font-bold">{photo.title}</p>
                  <p className="text-sm mt-1 leading-relaxed">{photo.caption}</p>
                  <p className="text-xs mt-2 text-white/70">
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
      <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-subtle-light dark:border-subtle-dark">
        <nav className="flex justify-around items-center px-4 pt-2 pb-5">
          <Link className="flex flex-col items-center gap-1 text-primary" to="/">
            <span className="material-symbols-outlined">photo_library</span>
            <span className="text-xs font-medium">Photos</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-content-light/60 dark:text-content-dark/60 hover:text-content-light dark:hover:text-content-dark transition-colors" to="/timeline">
            <span className="material-symbols-outlined">timeline</span>
            <span className="text-xs font-medium">Timeline</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-content-light/60 dark:text-content-dark/60 hover:text-content-light dark:hover:text-content-dark transition-colors" to="/mosaic">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-xs font-medium">Mosaic</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-content-light/60 dark:text-content-dark/60 hover:text-content-light dark:hover:text-content-dark transition-colors" to="/support">
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-xs font-medium">Support</span>
          </Link>
        </nav>
      </footer>

      {/* Add Memory Modal */}
      {showAddModal && (
        <AddMemoryModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default AnniversaryPhotoAlbum;
