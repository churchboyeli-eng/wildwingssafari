import { Navigate, Route, Routes } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import CompassGuideDetail from './pages/CompassGuideDetail';
import Destinations from './pages/Destinations';
import Enquire from './pages/Enquire';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import JourneyBuilder from './pages/JourneyBuilder';
import NotFound from './pages/NotFound';
import TourDetail from './pages/TourDetail';
import Tours from './pages/Tours';

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollToTop />
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tanzania-travel-guide" element={<Destinations />} />
          <Route path="/tanzania-travel-guide/:guideSlug" element={<CompassGuideDetail />} />
          <Route path="/tanzania-compass" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/tanzania-compass/:guideSlug" element={<CompassGuideDetail />} />
          <Route path="/discover-tanzania" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/destinations" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/itineraries" element={<Tours />} />
          <Route path="/itineraries/:categoryKey" element={<Tours />} />
          <Route path="/tours" element={<Navigate to="/itineraries" replace />} />
          <Route path="/tours/:tourId" element={<TourDetail />} />
          <Route path="/plan-a-journey" element={<JourneyBuilder />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/safari-packages" element={<Navigate to="/itineraries" replace />} />
          <Route path="/safari-from-zanzibar" element={<Navigate to="/itineraries/zanzibar" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
