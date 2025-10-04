import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import { useState } from 'react';
import AnniversaryPhotoAlbum from './AnniversaryPhotoAlbum.tsx';
import MosaicGenerator from './components/MosaicGenerator.tsx';
import RelationshipTimeline from './components/RelationshipTimeline.tsx';
import SupportCards from './components/SupportCards.tsx';
import SecretDashboard from './components/SecretDashboard.tsx';
import WelcomePrompt from './components/WelcomePrompt.tsx';
import { userSettings } from './services/firebaseService';
import './index.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(!userSettings.hasUserName());

  const handleNameSet = () => {
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && <WelcomePrompt onNameSet={handleNameSet} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnniversaryPhotoAlbum />} />
          <Route path="/mosaic" element={<MosaicGenerator />} />
          <Route path="/timeline" element={<RelationshipTimeline />} />
          <Route path="/support" element={<SupportCards />} />
          <Route path="/secreto" element={<SecretDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
9