import React, { useEffect, useState } from 'react';
import { photoUrls } from '../data/photoUrls';

const DiagnosticPage: React.FC = () => {
  const [testResults, setTestResults] = useState<{
    url: string;
    status: 'loading' | 'success' | 'error';
    message?: string;
  }[]>([]);

  useEffect(() => {
    // Test first 3 images
    const testImages = photoUrls.slice(0, 3);
    
    testImages.forEach((photo) => {
      const img = new Image();
      
      img.onload = () => {
        setTestResults(prev => [...prev, {
          url: photo.url,
          status: 'success',
          message: `✅ Cargada correctamente (${img.width}x${img.height}px)`
        }]);
      };

      img.onerror = () => {
        setTestResults(prev => [...prev, {
          url: photo.url,
          status: 'error',
          message: '❌ Error al cargar'
        }]);
      };

      img.src = photo.url;
    });
  }, []);

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-content-light dark:text-content-dark mb-6">
          🔍 Diagnóstico de Imágenes
        </h1>

        {/* Token Status */}
        <div className="bg-white dark:bg-subtle-dark rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-2 text-content-light dark:text-content-dark">
            Token de GitHub
          </h2>
          <div className="space-y-2 text-sm">
            <p className="text-content-light dark:text-content-dark">
              Estado: {token ? '✅ Configurado' : '❌ No configurado'}
            </p>
            {token && (
              <>
                <p className="text-content-light dark:text-content-dark font-mono text-xs break-all">
                  Token (primeros 20 chars): {token.substring(0, 20)}...
                </p>
                <p className="text-content-light dark:text-content-dark">
                  Longitud: {token.length} caracteres
                </p>
              </>
            )}
          </div>
        </div>

        {/* Photo URLs Info */}
        <div className="bg-white dark:bg-subtle-dark rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-2 text-content-light dark:text-content-dark">
            URLs de Fotos
          </h2>
          <div className="space-y-2 text-sm text-content-light dark:text-content-dark">
            <p>Total de fotos: {photoUrls.length}</p>
            <p>Contiene token: {photoUrls[0].url.includes('ghp_') ? '✅ Sí' : '❌ No'}</p>
            <p>Espacios codificados: {photoUrls[0].url.includes('%20') ? '✅ Sí' : '❌ No'}</p>
          </div>
        </div>

        {/* First URL Example */}
        <div className="bg-white dark:bg-subtle-dark rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-2 text-content-light dark:text-content-dark">
            Ejemplo de URL (Primera foto)
          </h2>
          <div className="space-y-2">
            <p className="text-xs text-content-light dark:text-content-dark">
              <strong>Fecha:</strong> {photoUrls[0].date}
            </p>
            <p className="text-xs text-content-light dark:text-content-dark">
              <strong>Archivo:</strong> {photoUrls[0].filename}
            </p>
            <p className="text-xs text-content-light dark:text-content-dark break-all font-mono bg-subtle-light dark:bg-background-dark p-2 rounded">
              {photoUrls[0].url}
            </p>
            <a 
              href={photoUrls[0].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm"
            >
              Probar URL en nueva pestaña
            </a>
          </div>
        </div>

        {/* Image Loading Tests */}
        <div className="bg-white dark:bg-subtle-dark rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-2 text-content-light dark:text-content-dark">
            Prueba de Carga (Primeras 3 imágenes)
          </h2>
          {testResults.length === 0 ? (
            <p className="text-sm text-content-light dark:text-content-dark">Probando...</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="border border-subtle-light dark:border-subtle-dark rounded p-2">
                  <p className="text-xs font-mono break-all mb-1 text-content-light dark:text-content-dark">
                    {result.url.substring(0, 80)}...
                  </p>
                  <p className={`text-sm ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {result.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Test */}
        <div className="bg-white dark:bg-subtle-dark rounded-lg p-4">
          <h2 className="font-bold text-lg mb-4 text-content-light dark:text-content-dark">
            Prueba Visual (Primera imagen)
          </h2>
          <div className="aspect-square max-w-sm mx-auto bg-subtle-light dark:bg-background-dark rounded-lg overflow-hidden">
            <img 
              src={photoUrls[0].url} 
              alt="Test"
              className="w-full h-full object-cover"
              onLoad={() => console.log('✅ Imagen cargada en el DOM')}
              onError={(e) => console.error('❌ Error cargando imagen en DOM:', e)}
            />
          </div>
          <p className="text-xs text-center mt-2 text-content-light dark:text-content-dark">
            Si ves una imagen arriba, todo funciona correctamente
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage;
