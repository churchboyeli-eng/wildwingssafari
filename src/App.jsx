import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import SeoHead from './components/SeoHead';
import About from './pages/About';
import Blog, { BlogPost } from './pages/Blog';
import CompassGuideDetail from './pages/CompassGuideDetail';
import Destinations from './pages/Destinations';
import Enquire from './pages/Enquire';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import JourneyBuilder from './pages/JourneyBuilder';
import Kilimanjaro from './pages/Kilimanjaro';
import KilimanjaroRouteDetail from './pages/KilimanjaroRouteDetail';
import NotFound from './pages/NotFound';
import TourDetail from './pages/TourDetail';
import Tours from './pages/Tours';
import { itineraryCategories, topPackages } from './data/content';

function ItineraryEntry() {
  const { itineraryKey } = useParams();
  const isCategory = itineraryCategories.some((category) => category.key === itineraryKey);
  const isPackage = topPackages.some((tourPackage) => tourPackage.key === itineraryKey);

  if (isCategory) return <Tours />;
  if (isPackage) return <TourDetail />;
  return <Navigate to="/itineraries" replace />;
}

function LegacyTourRedirect() {
  const { tourId } = useParams();
  return <Navigate to={`/itineraries/${tourId}`} replace />;
}

function LegacyGuideRedirect() {
  const { guideSlug } = useParams();
  return <Navigate to={`/tanzania-travel-guide/${guideSlug}`} replace />;
}

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SeoHead />
      <ScrollToTop />
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tanzania-travel-guide" element={<Destinations />} />
          <Route path="/tanzania-travel-guide/:guideSlug" element={<CompassGuideDetail />} />
          <Route path="/tanzania-compass" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/tanzania-compass/:guideSlug" element={<LegacyGuideRedirect />} />
          <Route path="/discover-tanzania" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/destinations" element={<Navigate to="/tanzania-travel-guide" replace />} />
          <Route path="/itineraries" element={<Tours />} />
          <Route path="/itineraries/kilimanjaro/:routeKey" element={<KilimanjaroRouteDetail />} />
          <Route path="/itineraries/kilimanjaro" element={<Kilimanjaro />} />
          <Route path="/itineraries/:itineraryKey" element={<ItineraryEntry />} />
          <Route path="/tours" element={<Navigate to="/itineraries" replace />} />
          <Route path="/tours/:tourId" element={<LegacyTourRedirect />} />
          <Route path="/plan-a-journey" element={<JourneyBuilder />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Navigate to="/enquire" replace />} />
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
