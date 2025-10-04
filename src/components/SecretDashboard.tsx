import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Photo, SupportCard } from '../config/firebase';
import { photoService, supportCardService, storageService } from '../services/firebaseService';

const SecretDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'cards' | 'init'>('photos');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [cards, setCards] = useState<SupportCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editingCard, setEditingCard] = useState<SupportCard | null>(null);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'photos') {
        const data = await photoService.getPhotos();
        setPhotos(data);
      } else if (activeTab === 'cards') {
        const data = await supportCardService.getSupportCards();
        setCards(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error al cargar datos. Verifica que Firebase esté configurado correctamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async (formData: FormData) => {
    try {
      setUploadProgress('Subiendo imagen...');
      const file = formData.get('image') as File;
      let imageUrl = formData.get('imageUrl') as string;

      if (file && file.size > 0) {
        const timestamp = Date.now();
        const path = `photos/${timestamp}_${file.name}`;
        imageUrl = await storageService.uploadImage(file, path);
      }

      setUploadProgress('Guardando foto...');
      await photoService.addPhoto({
        imageUrl,
        title: formData.get('title') as string,
        caption: formData.get('caption') as string,
        date: formData.get('date') as string,
        category: formData.get('category') as any,
        isFavorite: formData.get('isFavorite') === 'on'
      });

      setUploadProgress('');
      setShowAddPhotoForm(false);
      loadData();
      alert('Foto agregada exitosamente!');
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Error al agregar foto: ' + (error as Error).message);
      setUploadProgress('');
    }
  };

  const handleUpdatePhoto = async (id: string, formData: FormData) => {
    try {
      setUploadProgress('Actualizando...');
      const file = formData.get('image') as File;
      let imageUrl = formData.get('imageUrl') as string;

      if (file && file.size > 0) {
        const timestamp = Date.now();
        const path = `photos/${timestamp}_${file.name}`;
        imageUrl = await storageService.uploadImage(file, path);
      }

      await photoService.updatePhoto(id, {
        imageUrl,
        title: formData.get('title') as string,
        caption: formData.get('caption') as string,
        date: formData.get('date') as string,
        category: formData.get('category') as any,
        isFavorite: formData.get('isFavorite') === 'on'
      });

      setUploadProgress('');
      setEditingPhoto(null);
      loadData();
      alert('Foto actualizada exitosamente!');
    } catch (error) {
      console.error('Error updating photo:', error);
      alert('Error al actualizar foto: ' + (error as Error).message);
      setUploadProgress('');
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta foto?')) return;
    
    try {
      await photoService.deletePhoto(id);
      loadData();
      alert('Foto eliminada exitosamente!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error al eliminar foto: ' + (error as Error).message);
    }
  };

  const handleAddCard = async (formData: FormData) => {
    try {
      await supportCardService.addSupportCard({
        title: formData.get('title') as string,
        message: formData.get('message') as string,
        category: formData.get('category') as any,
        icon: formData.get('icon') as string,
        color: formData.get('color') as string
      });

      setShowAddCardForm(false);
      loadData();
      alert('Tarjeta agregada exitosamente!');
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Error al agregar tarjeta: ' + (error as Error).message);
    }
  };

  const handleUpdateCard = async (id: string, formData: FormData) => {
    try {
      await supportCardService.updateSupportCard(id, {
        title: formData.get('title') as string,
        message: formData.get('message') as string,
        category: formData.get('category') as any,
        icon: formData.get('icon') as string,
        color: formData.get('color') as string
      });

      setEditingCard(null);
      loadData();
      alert('Tarjeta actualizada exitosamente!');
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Error al actualizar tarjeta: ' + (error as Error).message);
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta tarjeta?')) return;
    
    try {
      await supportCardService.deleteSupportCard(id);
      loadData();
      alert('Tarjeta eliminada exitosamente!');
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error al eliminar tarjeta: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
              <h1 className="text-2xl font-bold text-white">Panel Secreto</h1>
            </div>
            <Link 
              to="/"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'photos'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark hover:bg-subtle-light'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">photo_library</span>
              Fotos ({photos.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'cards'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark hover:bg-subtle-light'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">style</span>
              Tarjetas ({cards.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('init')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'init'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark hover:bg-subtle-light'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">settings</span>
              Configuración
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-subtle-dark rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-content-light dark:text-content-dark">Cargando...</p>
            </div>
          ) : (
            <>
              {/* Photos Tab */}
              {activeTab === 'photos' && (
                <PhotosManager
                  photos={photos}
                  showAddForm={showAddPhotoForm}
                  editingPhoto={editingPhoto}
                  uploadProgress={uploadProgress}
                  onToggleAddForm={() => setShowAddPhotoForm(!showAddPhotoForm)}
                  onAdd={handleAddPhoto}
                  onEdit={setEditingPhoto}
                  onUpdate={handleUpdatePhoto}
                  onDelete={handleDeletePhoto}
                  onCancelEdit={() => setEditingPhoto(null)}
                />
              )}

              {/* Cards Tab */}
              {activeTab === 'cards' && (
                <CardsManager
                  cards={cards}
                  showAddForm={showAddCardForm}
                  editingCard={editingCard}
                  onToggleAddForm={() => setShowAddCardForm(!showAddCardForm)}
                  onAdd={handleAddCard}
                  onEdit={setEditingCard}
                  onUpdate={handleUpdateCard}
                  onDelete={handleDeleteCard}
                  onCancelEdit={() => setEditingCard(null)}
                />
              )}

              {/* Init Tab */}
              {activeTab === 'init' && <InitManager />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Photos Manager Component
const PhotosManager: React.FC<{
  photos: Photo[];
  showAddForm: boolean;
  editingPhoto: Photo | null;
  uploadProgress: string;
  onToggleAddForm: () => void;
  onAdd: (data: FormData) => void;
  onEdit: (photo: Photo) => void;
  onUpdate: (id: string, data: FormData) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
}> = ({ photos, showAddForm, editingPhoto, uploadProgress, onToggleAddForm, onAdd, onEdit, onUpdate, onDelete, onCancelEdit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, photoId?: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (photoId) {
      onUpdate(photoId, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-content-light dark:text-content-dark">
          Gestión de Fotos
        </h2>
        <button
          onClick={onToggleAddForm}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showAddForm ? 'close' : 'add'}</span>
          {showAddForm ? 'Cancelar' : 'Nueva Foto'}
        </button>
      </div>

      {uploadProgress && (
        <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined animate-spin">refresh</span>
            {uploadProgress}
          </span>
        </div>
      )}

      {(showAddForm || editingPhoto) && (
        <PhotoForm
          photo={editingPhoto}
          onSubmit={handleSubmit}
          onCancel={editingPhoto ? onCancelEdit : onToggleAddForm}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {photos.map(photo => (
          <div key={photo.id} className="border border-subtle-light dark:border-subtle-dark rounded-lg overflow-hidden">
            <div className="aspect-[9/16] bg-cover bg-center" style={{ backgroundImage: `url(${photo.imageUrl})` }} />
            <div className="p-4">
              <h3 className="font-bold text-content-light dark:text-content-dark mb-1">{photo.title}</h3>
              <p className="text-sm text-content-light/70 dark:text-content-dark/70 mb-2">{photo.caption}</p>
              <div className="flex gap-2 text-xs mb-3">
                <span className="px-2 py-1 bg-subtle-light dark:bg-subtle-dark rounded">{photo.date}</span>
                <span className="px-2 py-1 bg-subtle-light dark:bg-subtle-dark rounded">{photo.category}</span>
                {photo.isFavorite && <span className="px-2 py-1 bg-primary/20 text-primary rounded">★</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(photo)}
                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(photo.id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Photo Form Component
const PhotoForm: React.FC<{
  photo: Photo | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, photoId?: string) => void;
  onCancel: () => void;
}> = ({ photo, onSubmit, onCancel }) => {
  return (
    <form onSubmit={(e) => onSubmit(e, photo?.id)} className="bg-subtle-light dark:bg-background-dark p-6 rounded-lg mb-6">
      <h3 className="text-lg font-bold text-content-light dark:text-content-dark mb-4">
        {photo ? 'Editar Foto' : 'Nueva Foto'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            defaultValue={photo?.title}
            required
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            defaultValue={photo?.date}
            required
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Categoría
          </label>
          <select
            name="category"
            defaultValue={photo?.category}
            required
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          >
            <option value="first-date">Primera Cita</option>
            <option value="travel">Viaje</option>
            <option value="celebration">Celebración</option>
            <option value="milestone">Hito</option>
            <option value="everyday">Cotidiano</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFavorite"
              defaultChecked={photo?.isFavorite}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-content-light dark:text-content-dark">
              Favorito
            </span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Descripción
          </label>
          <textarea
            name="caption"
            defaultValue={photo?.caption}
            required
            rows={3}
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            URL de Imagen (o sube archivo)
          </label>
          <input
            type="url"
            name="imageUrl"
            defaultValue={photo?.imageUrl}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark mb-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
          <p className="text-xs text-content-light/60 dark:text-content-dark/60 mt-1">
            Si subes un archivo, se usará en lugar de la URL
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {photo ? 'Actualizar' : 'Agregar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-lg hover:opacity-80 transition-opacity"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

// Cards Manager Component
const CardsManager: React.FC<{
  cards: SupportCard[];
  showAddForm: boolean;
  editingCard: SupportCard | null;
  onToggleAddForm: () => void;
  onAdd: (data: FormData) => void;
  onEdit: (card: SupportCard) => void;
  onUpdate: (id: string, data: FormData) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
}> = ({ cards, showAddForm, editingCard, onToggleAddForm, onAdd, onEdit, onUpdate, onDelete, onCancelEdit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, cardId?: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (cardId) {
      onUpdate(cardId, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-content-light dark:text-content-dark">
          Gestión de Tarjetas de Apoyo
        </h2>
        <button
          onClick={onToggleAddForm}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{showAddForm ? 'close' : 'add'}</span>
          {showAddForm ? 'Cancelar' : 'Nueva Tarjeta'}
        </button>
      </div>

      {(showAddForm || editingCard) && (
        <CardForm
          card={editingCard}
          onSubmit={handleSubmit}
          onCancel={editingCard ? onCancelEdit : onToggleAddForm}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {cards.map(card => (
          <div key={card.id} className={`p-4 rounded-lg ${card.color}`}>
            <div className="flex items-start gap-3 mb-3">
              <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{card.title}</h3>
                <p className="text-sm">{card.message}</p>
                <span className="text-xs mt-2 inline-block px-2 py-1 bg-white/20 rounded">
                  {card.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(card)}
                className="flex-1 px-3 py-2 bg-white/30 hover:bg-white/40 rounded transition-colors text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(card.id)}
                className="flex-1 px-3 py-2 bg-red-500/30 hover:bg-red-500/40 rounded transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card Form Component
const CardForm: React.FC<{
  card: SupportCard | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, cardId?: string) => void;
  onCancel: () => void;
}> = ({ card, onSubmit, onCancel }) => {
  return (
    <form onSubmit={(e) => onSubmit(e, card?.id)} className="bg-subtle-light dark:bg-background-dark p-6 rounded-lg mb-6">
      <h3 className="text-lg font-bold text-content-light dark:text-content-dark mb-4">
        {card ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            defaultValue={card?.title}
            required
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Icono (Material Symbol)
          </label>
          <input
            type="text"
            name="icon"
            defaultValue={card?.icon}
            required
            placeholder="favorite, star, home..."
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Categoría
          </label>
          <select
            name="category"
            defaultValue={card?.category}
            required
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          >
            <option value="calming">Calmante</option>
            <option value="motivating">Motivador</option>
            <option value="sensory">Sensorial</option>
            <option value="routine">Rutina</option>
            <option value="general">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Color (Tailwind classes)
          </label>
          <input
            type="text"
            name="color"
            defaultValue={card?.color}
            required
            placeholder="bg-blue-100 dark:bg-blue-900/30..."
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-content-light dark:text-content-dark mb-2">
            Mensaje
          </label>
          <textarea
            name="message"
            defaultValue={card?.message}
            required
            rows={3}
            className="w-full px-3 py-2 border border-subtle-light dark:border-subtle-dark rounded-lg bg-white dark:bg-subtle-dark text-content-light dark:text-content-dark"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {card ? 'Actualizar' : 'Agregar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-lg hover:opacity-80 transition-opacity"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

// Init Manager Component
const InitManager: React.FC = () => {
  const [initializing, setInitializing] = useState(false);
  
  const handleInitialize = async () => {
    if (!confirm('¿Estás seguro? Esto cargará datos de ejemplo en Firebase.')) return;
    
    setInitializing(true);
    try {
      const { initializeDefaultData } = await import('../services/firebaseService');
      await initializeDefaultData();
      alert('Datos inicializados correctamente!');
    } catch (error) {
      console.error('Error initializing data:', error);
      alert('Error al inicializar datos: ' + (error as Error).message);
    } finally {
      setInitializing(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-content-light dark:text-content-dark mb-4">
        Configuración de Firebase
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 rounded-lg">
          <h3 className="font-bold mb-2">📋 Pasos para configurar Firebase:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ve a la Consola de Firebase: <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline">console.firebase.google.com</a></li>
            <li>Selecciona tu proyecto: <strong>nuestro-aniversario-20866</strong></li>
            <li>En el menú lateral, ve a <strong>Firestore Database</strong></li>
            <li>Haz clic en <strong>"Crear base de datos"</strong></li>
            <li>Selecciona <strong>"Empezar en modo de prueba"</strong> (o configura reglas personalizadas)</li>
            <li>Elige la ubicación más cercana (ej: southamerica-east1)</li>
            <li>En el menú lateral, ve a <strong>Storage</strong></li>
            <li>Haz clic en <strong>"Comenzar"</strong></li>
            <li>Selecciona <strong>"Empezar en modo de prueba"</strong></li>
            <li>Una vez creado, vuelve aquí y haz clic en "Inicializar Datos"</li>
          </ol>
        </div>

        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100 rounded-lg">
          <h3 className="font-bold mb-2">⚠️ Reglas de Seguridad Recomendadas</h3>
          <p className="text-sm mb-2">Para Firestore (Firestore Database → Reglas):</p>
          <pre className="bg-black/10 p-3 rounded text-xs overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: true;
      allow write: true; // ⚠️ Cambiar en producción
    }
  }
}`}
          </pre>
          <p className="text-sm mt-3 mb-2">Para Storage (Storage → Reglas):</p>
          <pre className="bg-black/10 p-3 rounded text-xs overflow-x-auto">
{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: true;
      allow write: true; // ⚠️ Cambiar en producción
    }
  }
}`}
          </pre>
        </div>

        <div className="p-4 border-2 border-dashed border-subtle-light dark:border-subtle-dark rounded-lg text-center">
          <h3 className="font-bold text-content-light dark:text-content-dark mb-3">
            Inicializar Datos de Ejemplo
          </h3>
          <p className="text-sm text-content-light/70 dark:text-content-dark/70 mb-4">
            Esto creará fotos y tarjetas de ejemplo en tu base de datos Firebase.
          </p>
          <button
            onClick={handleInitialize}
            disabled={initializing}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              initializing
                ? 'bg-subtle-light dark:bg-subtle-dark text-content-light/40 dark:text-content-dark/40 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {initializing ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin">refresh</span>
                Inicializando...
              </span>
            ) : (
              'Inicializar Datos'
            )}
          </button>
        </div>

        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 rounded-lg">
          <h3 className="font-bold mb-2">✅ Estado de la Configuración</h3>
          <p className="text-sm">
            <strong>Firebase Config:</strong> Configurado ✓<br />
            <strong>Project ID:</strong> nuestro-aniversario-20866<br />
            <strong>Storage Bucket:</strong> nuestro-aniversario-20866.firebasestorage.app
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretDashboard;
