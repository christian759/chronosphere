import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GlobePage } from './pages/GlobePage';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { WorldTimeProvider } from './context/WorldTimeContext';

function LayoutWrapper() {
  const location = useLocation();
  const isImmersive = location.pathname === '/globe';

  if (isImmersive) {
    return (
      <Routes>
        <Route path="/globe" element={<GlobePage />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <WorldTimeProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </WorldTimeProvider>
  );
}

export default App;
