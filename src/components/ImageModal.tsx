import React, { useEffect } from 'react';

interface ImageModalProps {
  imageUrl: string;
  title?: string;
  caption?: string;
  date?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, title, caption, date, onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 rounded-full transition-all duration-200 touch-manipulation z-10"
        aria-label="Cerrar"
      >
        <span className="material-symbols-outlined text-white text-2xl transition-transform duration-200 hover:rotate-90">
          close
        </span>
      </button>

      {/* Image container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <img
          src={imageUrl}
          alt={title || 'Imagen'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
        />

        {/* Image info overlay */}
        {(title || caption || date) && (
          <div className="mt-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-2xl w-full animate-in slide-in-from-bottom-4 duration-500 delay-150">
            {title && (
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                {title}
              </h3>
            )}
            {caption && (
              <p className="text-white/90 text-sm sm:text-base mb-2 leading-relaxed">
                {caption}
              </p>
            )}
            {date && (
              <p className="text-white/70 text-xs sm:text-sm">
                {new Date(date).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Hint text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm animate-in fade-in duration-700 delay-300">
        Click fuera o presiona ESC para cerrar
      </div>
    </div>
  );
};

export default ImageModal;
