import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import AnniversaryPhotoAlbum from './AnniversaryPhotoAlbum.tsx';
import MosaicGenerator from './components/MosaicGenerator.tsx';
import RelationshipTimeline from './components/RelationshipTimeline.tsx';
import SupportCards from './components/SupportCards.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnniversaryPhotoAlbum />} />
      <Route path="/mosaic" element={<MosaicGenerator />} />
      <Route path="/timeline" element={<RelationshipTimeline />} />
      <Route path="/support" element={<SupportCards />} />
    </Routes>
  </BrowserRouter>
);
9