import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import AnniversaryPhotoAlbum from './AnniversaryPhotoAlbum.tsx';
import MosaicGenerator from './components/MosaicGenerator.tsx';
import RelationshipTimeline from './components/RelationshipTimeline.tsx';
import SupportCards from './components/SupportCards.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import FirebaseInitializer from './components/FirebaseInitializer.tsx';
import { firebaseService } from './services/firebaseService';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user name exists
    const checkUserName = async () => {
      try {
        const name = await firebaseService.getUserName();
        setUserName(name);
      } catch (error) {
        console.error('Error checking user name:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserName();
  }, []);

  const handleNameSubmit = async (name: string) => {
    try {
      await firebaseService.setUserName(name);
      setUserName(name);
    } catch (error) {
      console.error('Error saving user name:', error);
      alert('Error al guardar el nombre. Por favor, intenta de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-content-light dark:text-content-dark">Cargando...</p>
      </div>
    );
  }

  if (!userName) {
    return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnniversaryPhotoAlbum />} />
          <Route path="/mosaic" element={<MosaicGenerator />} />
          <Route path="/timeline" element={<RelationshipTimeline />} />
          <Route path="/support" element={<SupportCards />} />
        </Routes>
      </BrowserRouter>
      <FirebaseInitializer />
    </>
  );
};

export default App;
