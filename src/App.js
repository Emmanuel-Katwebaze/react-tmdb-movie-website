import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TvShows from './components/tVShows';
import DetailsPage from './components/DetailsPage';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CelebrityPage from './components/CelebrityPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}        
        <Route path="/" element={<LandingPage />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/person/:id" element={<CelebrityPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;