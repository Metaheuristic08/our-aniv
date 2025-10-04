import React, { useState } from 'react';
import { dataService } from '../services/dataService';

const FirebaseInitializer: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Inicializando Firebase con datos de ejemplo...');
    
    try {
      await dataService.initializeFirebaseData();
      setStatus('success');
      setMessage('¡Base de datos inicializada correctamente! Recarga la página para ver los datos.');
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}. Verifica la consola para más detalles.`);
      console.error('Error initializing Firebase:', error);
    }
  };

  // Only show this in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-subtle-dark border border-subtle-light dark:border-subtle-dark rounded-xl shadow-xl p-4">
        <h3 className="font-bold text-content-light dark:text-content-dark mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            cloud_upload
          </span>
          Firebase Init
        </h3>
        
        {status === 'idle' && (
          <>
            <p className="text-sm text-content-light/70 dark:text-content-dark/70 mb-3">
              Cargar datos de ejemplo a Firebase
            </p>
            <button
              onClick={handleInitialize}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Inicializar Base de Datos
            </button>
          </>
        )}
        
        {status === 'loading' && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <p className="text-sm text-content-light dark:text-content-dark">{message}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-green-500 text-xl">
              check_circle
            </span>
            <p className="text-sm text-content-light dark:text-content-dark">{message}</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-red-500 text-xl">
              error
            </span>
            <div>
              <p className="text-sm text-content-light dark:text-content-dark">{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseInitializer;
