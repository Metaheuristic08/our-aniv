import React, { useState } from 'react';
import { userSettings } from '../services/firebaseService';

interface WelcomePromptProps {
  onNameSet: () => void;
}

const WelcomePrompt: React.FC<WelcomePromptProps> = ({ onNameSet }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      userSettings.setUserName(name.trim());
      setTimeout(() => {
        onNameSet();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-subtle-dark rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              favorite
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-content-light dark:text-content-dark mb-3">
            Bienvenido a Nuestra Historia
          </h1>
          
          <p className="text-content-light/70 dark:text-content-dark/70 mb-8 leading-relaxed">
            Para empezar, por favor ingresa tu nombre. Este nombre no se puede cambiar después.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre..."
                className="w-full px-4 py-3 rounded-xl border-2 border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark placeholder-content-light/50 dark:placeholder-content-dark/50 focus:border-primary focus:outline-none transition-colors text-lg"
                autoFocus
                maxLength={30}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                name.trim() && !isSubmitting
                  ? 'bg-primary text-white hover:bg-primary/90 active:scale-95'
                  : 'bg-subtle-light dark:bg-subtle-dark text-content-light/40 dark:text-content-dark/40 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Guardando...
                </span>
              ) : (
                'Continuar'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-content-light/60 dark:text-content-dark/60">
            💝 Este es un espacio especial para nuestros recuerdos juntos
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePrompt;
