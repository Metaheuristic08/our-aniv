import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import AnniversaryPhotoAlbum from './AnniversaryPhotoAlbum';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnniversaryPhotoAlbum />} />
    </Routes>
  </BrowserRouter>
);
