import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import type { Photo } from '../types';
import { dataService } from '../services/dataService';
import NavigationFooter from './NavigationFooter.tsx';
import ImageModal from './ImageModal.tsx';

const MosaicGenerator: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const mosaicRef = useRef<HTMLDivElement>(null);

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

  const extractMosaic = async () => {
    if (!mosaicRef.current) return;

    setIsExtracting(true);
    try {
      // Hide overlays temporarily
      const overlays = mosaicRef.current.querySelectorAll('.mosaic-overlay');
      const originalStyles: string[] = [];
      
      overlays.forEach((overlay, index) => {
        const element = overlay as HTMLElement;
        originalStyles[index] = element.style.cssText;
        element.style.display = 'none';
      });

      // Dynamically import html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;
      
      // Create a clean canvas without overlays
      const canvas = await html2canvas(mosaicRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        // Ignore problematic CSS properties
        ignoreElements: (element) => {
          return element.classList?.contains('mosaic-overlay') || false;
        },
        onclone: (clonedDoc) => {
          // Remove any remaining overlays in the cloned document
          const clonedOverlays = clonedDoc.querySelectorAll('.mosaic-overlay');
          clonedOverlays.forEach(el => el.remove());
          
          // Simplify backgrounds to avoid oklab issues
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(el);
            
            // Replace gradients with solid backgrounds
            if (computedStyle.backgroundImage && computedStyle.backgroundImage.includes('gradient')) {
              htmlEl.style.backgroundImage = 'none';
            }
          });
        }
      });

      // Restore overlays
      overlays.forEach((overlay, index) => {
        const element = overlay as HTMLElement;
        element.style.cssText = originalStyles[index];
      });

      // Convert to blob and download
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `mosaico-memorias-${Date.now()}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          
          // Show success message
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error extracting mosaic:', err);
      
      // Show user-friendly error
      setError('No se pudo extraer el mosaico. Intenta nuevamente.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsExtracting(false);
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
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-subtle-light/20 dark:border-subtle-dark/20 transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
          <Link to="/" className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark active:scale-95 rounded-full transition-all duration-200 touch-manipulation">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Mosaico de Memorias
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={extractMosaic}
              disabled={isExtracting}
              className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark active:scale-95 rounded-full transition-all duration-200 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              title="Descargar mosaico"
            >
              <span className={`material-symbols-outlined text-content-light dark:text-content-dark text-xl transition-transform duration-300 ${isExtracting ? 'animate-pulse' : ''}`}>
                {isExtracting ? 'hourglass_empty' : 'download'}
              </span>
            </button>
            <button 
              onClick={regenerateMosaic}
              disabled={loading}
              className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark active:scale-95 rounded-full transition-all duration-200 touch-manipulation disabled:opacity-50"
              title="Regenerar mosaico"
            >
              <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl transition-transform duration-300 hover:rotate-180">
                refresh
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mosaic Grid */}
      <main className="flex-grow overflow-y-auto px-3 sm:px-4 py-4 safe-area-inset-bottom">
        <div ref={mosaicRef} className="grid grid-cols-2 gap-2 sm:gap-3 max-w-4xl mx-auto pb-4">
          {photos.map((photo, index) => {
            // Create variety in grid layout - less wide cards on mobile
            const isWide = index === 2 || (index === 7 && window.innerWidth > 640);
            
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`
                  group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-subtle-dark/50
                  transform transition-all duration-300 ease-out active:scale-95 sm:hover:scale-105 sm:hover:shadow-2xl
                  touch-manipulation cursor-pointer
                  ${isWide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-active:scale-110 sm:group-hover:scale-110"
                  style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                />
                
                {/* Gradient overlay - hidden during extraction */}
                <div className="mosaic-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-active:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content overlay - hidden during extraction */}
                <div className="mosaic-overlay absolute inset-0 p-3 sm:p-4 flex flex-col justify-end opacity-80 group-active:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight transform translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">{photo.title}</p>
                  <p className="text-white/90 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">{photo.caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-xs">{new Date(photo.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                    {photo.isFavorite && (
                      <span className="material-symbols-outlined text-primary text-sm">favorite</span>
                    )}
                  </div>
                </div>

                {/* Category badge - hidden during extraction */}
                <div className="mosaic-overlay absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-lg">
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

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">
            check_circle
          </span>
          <span className="font-medium">¡Mosaico descargado exitosamente!</span>
        </div>
      )}

      {/* Image Modal */}
      {selectedPhoto && (
        <ImageModal
          imageUrl={selectedPhoto.imageUrl}
          title={selectedPhoto.title}
          caption={selectedPhoto.caption}
          date={selectedPhoto.date}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default MosaicGenerator;