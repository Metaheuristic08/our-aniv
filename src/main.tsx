import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import AnniversaryPhotoAlbum from './AnniversaryPhotoAlbum.tsx';
import MosaicGenerator from './components/MosaicGenerator.tsx';
import RelationshipTimeline from './components/RelationshipTimeline.tsx';
import SupportCards from './components/SupportCards.tsx';
import AppWrapper from './components/AppWrapper.tsx';
import DiagnosticPage from './components/DiagnosticPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppWrapper>
      <Routes>
        <Route path="/" element={<AnniversaryPhotoAlbum />} />
        <Route path="/mosaic" element={<MosaicGenerator />} />
        <Route path="/timeline" element={<RelationshipTimeline />} />
        <Route path="/support" element={<SupportCards />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
      </Routes>
    </AppWrapper>
  </BrowserRouter>
);
9