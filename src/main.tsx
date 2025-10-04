import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import { useState, lazy, Suspense } from 'react';
import WelcomePrompt from './components/WelcomePrompt.tsx';
import { userSettings } from './services/firebaseService';
import './index.css';

// Lazy load components for better performance
const AnniversaryPhotoAlbum = lazy(() => import('./AnniversaryPhotoAlbum.tsx'));
const MosaicGenerator = lazy(() => import('./components/MosaicGenerator.tsx'));
const RelationshipTimeline = lazy(() => import('./components/RelationshipTimeline.tsx'));
const SupportCards = lazy(() => import('./components/SupportCards.tsx'));
const SecretDashboard = lazy(() => import('./components/SecretDashboard.tsx'));

// Loading component
const PageLoader = () => (
  <div className="flex flex-col h-screen justify-center items-center bg-background-light dark:bg-background-dark">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
    <p className="mt-4 text-content-light dark:text-content-dark">Cargando...</p>
  </div>
);

const App = () => {
  const [showWelcome, setShowWelcome] = useState(!userSettings.hasUserName());

  const handleNameSet = () => {
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && <WelcomePrompt onNameSet={handleNameSet} />}
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AnniversaryPhotoAlbum />} />
            <Route path="/mosaic" element={<MosaicGenerator />} />
            <Route path="/timeline" element={<RelationshipTimeline />} />
            <Route path="/support" element={<SupportCards />} />
            <Route path="/secreto" element={<SecretDashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
9