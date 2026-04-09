import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CountryPage } from './pages/CountryPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', fontFamily: 'var(--font-display)' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '1rem' }}>404</h1>
      <p style={{ color: 'var(--ink-muted)', marginBottom: '2rem' }}>Page not found</p>
      <a
        href="/"
        style={{
          padding: '10px 24px',
          border: '1px solid var(--border-strong)',
          borderRadius: '100px',
          fontSize: '0.875rem',
          color: 'var(--ink-soft)',
          transition: 'all 200ms',
        }}
      >
        ← Go home
      </a>
    </div>
  );
}

export default App;
