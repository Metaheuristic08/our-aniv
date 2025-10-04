import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"%3E%3Crect width="400" height="600" fill="%23f0f0f0"/%3E%3C/svg%3E'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Start loading the actual image
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
              };
              img.onerror = () => {
                console.error('Failed to load image:', src);
                setIsLoaded(true); // Still mark as loaded to remove spinner
              };
              
              observer.unobserve(imageRef);
            }
          });
        },
        {
          rootMargin: '50px' // Start loading slightly before the image comes into view
        }
      );

      observer.observe(imageRef);
    }

    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src]);

  return (
    <div 
      ref={setImageRef}
      className={`relative ${className}`}
      style={{
        ...style,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-subtle-light/50 dark:bg-subtle-dark/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <span className="sr-only">{alt}</span>
    </div>
  );
};

export default LazyImage;
