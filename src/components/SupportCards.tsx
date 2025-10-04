import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { SupportCard } from '../config/firebase';
import { dataService } from '../services/dataService';
import NavigationFooter from './NavigationFooter.tsx';

const SupportCards: React.FC = () => {
  const [cards, setCards] = useState<SupportCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<SupportCard[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<SupportCard | null>(null);

  const categories = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'calming', label: 'Calmante', icon: 'air' },
    { id: 'motivating', label: 'Motivador', icon: 'star' },
    { id: 'sensory', label: 'Sensorial', icon: 'touch_app' },
    { id: 'routine', label: 'Rutina', icon: 'schedule' },
    { id: 'general', label: 'General', icon: 'favorite' }
  ];

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const supportCards = await dataService.getSupportCards();
        setCards(supportCards);
        setFilteredCards(supportCards);
      } catch (err) {
        console.error('Error loading support cards:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter(card => card.category === activeCategory));
    }
  }, [activeCategory, cards]);

  const SupportCardComponent: React.FC<{ 
    card: SupportCard; 
    onClick: () => void;
    index: number;
  }> = ({ card, onClick, index }) => (
    <div 
      className={`
        p-5 sm:p-6 rounded-xl shadow-lg cursor-pointer
        transform transition-all duration-300 active:scale-95 sm:hover:scale-102 sm:hover:shadow-xl
        ${card.color} border-2 border-transparent sm:hover:border-opacity-50 touch-manipulation
      `}
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">
              {card.icon}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg sm:text-xl mb-2 leading-tight">
            {card.title}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed opacity-90 line-clamp-3">
            {card.message}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide font-medium opacity-75">
              {card.category}
            </span>
            <span className="material-symbols-outlined text-base opacity-60">
              touch_app
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const CategoryFilter: React.FC<{ 
    category: typeof categories[0]; 
    isActive: boolean; 
    onClick: () => void;
  }> = ({ category, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium
        transition-all duration-200 whitespace-nowrap touch-manipulation
        ${isActive 
          ? 'bg-primary text-white shadow-lg scale-105' 
          : 'bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80'
        }
      `}
    >
      <span className="material-symbols-outlined text-lg">
        {category.icon}
      </span>
      <span className="hidden sm:inline">{category.label}</span>
    </button>
  );

  const Modal: React.FC<{ card: SupportCard; onClose: () => void }> = ({ card, onClose }) => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`
          w-full sm:max-w-md p-6 sm:p-8 rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-all duration-300
          ${card.color} animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 safe-area-inset-bottom
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator for mobile */}
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4 sm:hidden"></div>
        
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="material-symbols-outlined text-3xl sm:text-4xl">
              {card.icon}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{card.title}</h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8">{card.message}</p>
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors touch-manipulation font-medium text-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-content-light dark:text-content-dark">Cargando mensajes de apoyo...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-subtle-light/20 dark:border-subtle-dark/20">
        <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
          <Link to="/" className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors touch-manipulation">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Mensajes de Apoyo
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4">
          {/* Introduction */}
          <div className="text-center py-4 sm:py-6 mb-4 sm:mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                favorite
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-content-light dark:text-content-dark mb-2">
              Siempre Aquí Para Ti
            </h2>
            <p className="text-content-light/70 dark:text-content-dark/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
              Mensajes diseñados para brindarte calma, motivación y apoyo cuando los necesites. 
              Toca cualquier card para ver el mensaje completo.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-4 mb-4 sm:mb-6 scrollbar-hide px-1">
            {categories.map((category) => (
              <CategoryFilter
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>

          {/* Support Cards Grid */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:mb-8">
            {filteredCards.map((card, index) => (
              <SupportCardComponent
                key={card.id}
                card={card}
                index={index}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-content-light/30 dark:text-content-dark/30 mb-4 block">
                search_off
              </span>
              <p className="text-content-light/60 dark:text-content-dark/60">
                No hay mensajes en esta categoría
              </p>
            </div>
          )}
        </div>
      </main>
      <NavigationFooter />

      {/* Modal */}
      {selectedCard && (
        <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default SupportCards;