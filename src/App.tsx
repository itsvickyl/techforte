import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/CinematicHero';
import { About } from './components/About';
import { EventsShowcase } from './components/EventsShowcase';
import { SponsorsSection } from './components/PartnersMarquee';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import Particles from './components/Particles';
import { IntroAnimation } from './components/IntroAnimation';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { TimelinePage } from './pages/TimelinePage';
import { RulesPage } from './pages/RulesPage';
import { SupportPage } from './pages/SupportPage';

function HomePage({ introComplete, handleIntroComplete }: { introComplete: boolean; handleIntroComplete: () => void }) {
  // Lock scroll during intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introComplete]);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <main className="relative z-[1]">
        <CinematicHero />
        <About />
        <EventsShowcase />
        <SponsorsSection />
        <FAQ />
      </main>
    </>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Skip intro on non-home pages
  useEffect(() => {
    if (location.pathname !== '/') {
      setIntroComplete(true);
    }
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-accent selection:text-black">
      {/* Ambient particles overlay (non-home only to avoid competing with CinematicHero) */}

      {/* OGL ambient particles overlay */}
      <div className="fixed inset-0 z-[0] pointer-events-none">
        <Particles
          particleCount={800}
          particleSpread={15}
          speed={0.1}
          particleColors={['#00FFFF', '#0891b2', '#06b6d4', '#164e63', '#ffffff']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.6}
          alphaParticles={true}
          particleBaseSize={150}
          sizeRandomness={1.8}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
          className=""
        />
      </div>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage introComplete={introComplete} handleIntroComplete={handleIntroComplete} />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>

      <Footer />
      <FloatingChat />
    </div>
  );
}

export default App;
