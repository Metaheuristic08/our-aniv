import React, { useState } from 'react';
import { userService } from '../services/userService';

interface UsernamePromptProps {
  onComplete: (username: string) => void;
}

const UsernamePrompt: React.FC<UsernamePromptProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();

    // Validation
    if (!trimmedUsername) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    if (trimmedUsername.length > 50) {
      setError('El nombre debe tener menos de 50 caracteres');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = userService.setUsername(trimmedUsername);
      
      if (success) {
        onComplete(trimmedUsername);
      } else {
        setError('El nombre ya fue configurado anteriormente');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el nombre');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background-dark/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-background-light dark:bg-background-dark border-2 border-primary rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-4xl">favorite</span>
          </div>
          <h1 className="text-3xl font-bold text-content-light dark:text-content-dark mb-2">
            ¡Bienvenido!
          </h1>
          <p className="text-content-light/70 dark:text-content-dark/70 text-sm">
            Por favor ingresa tu nombre para comenzar
          </p>
          <p className="text-primary text-xs mt-2 font-medium">
            Nota: No podrás cambiarlo después
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-content-light dark:text-content-dark mb-2"
            >
              Tu nombre
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: María"
              maxLength={50}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl border-2 border-subtle-light dark:border-subtle-dark bg-white dark:bg-background-dark text-content-light dark:text-content-dark placeholder-content-light/40 dark:placeholder-content-dark/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !username.trim()}
            className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin">refresh</span>
                Guardando...
              </>
            ) : (
              <>
                Continuar
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Info footer */}
        <div className="mt-6 pt-6 border-t border-subtle-light dark:border-subtle-dark">
          <div className="flex items-start gap-2 text-xs text-content-light/60 dark:text-content-dark/60">
            <span className="material-symbols-outlined text-base">info</span>
            <p>
              Tu nombre se guardará en este dispositivo y se usará para identificar las fotos y recuerdos que agregues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernamePrompt;
