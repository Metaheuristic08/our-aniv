import React, { useState } from 'react';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError('Por favor, ingresa un nombre válido (mínimo 2 caracteres)');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('El nombre es demasiado largo (máximo 50 caracteres)');
      return;
    }
    
    onNameSubmit(trimmedName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white dark:bg-subtle-dark/50 rounded-2xl shadow-2xl p-8 border border-subtle-light dark:border-subtle-dark">
          {/* Welcome Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-5xl">
              favorite
            </span>
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-center text-content-light dark:text-content-dark mb-2">
            ¡Bienvenido/a!
          </h1>
          <p className="text-center text-content-light/70 dark:text-content-dark/70 mb-8">
            Este es nuestro espacio especial para guardar nuestras memorias juntos
          </p>

          {/* Name Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="userName" 
                className="block text-sm font-medium text-content-light dark:text-content-dark mb-2"
              >
                ¿Cuál es tu nombre?
              </label>
              <input
                id="userName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Ingresa tu nombre..."
                className="w-full px-4 py-3 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-content-light dark:text-content-dark placeholder-content-light/50 dark:placeholder-content-dark/50 transition-all"
                autoFocus
                maxLength={50}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            {/* Important Note */}
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                  info
                </span>
                <p className="text-sm text-content-light dark:text-content-dark">
                  <strong>Importante:</strong> Una vez que ingreses tu nombre, no podrás cambiarlo. 
                  Elige con cuidado.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Continuar
            </button>
          </form>
        </div>

        {/* Decorative Hearts */}
        <div className="flex justify-center gap-4 mt-8 opacity-30">
          <span className="material-symbols-outlined text-primary text-2xl animate-pulse">
            favorite
          </span>
          <span className="material-symbols-outlined text-primary text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>
            favorite
          </span>
          <span className="material-symbols-outlined text-primary text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>
            favorite
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
