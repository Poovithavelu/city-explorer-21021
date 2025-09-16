import React, { useEffect } from 'react';
import './App.css';
import './util.css';
import { AppStateProvider, useAppState } from './state/AppStateContext';
import SearchBar from './components/SearchBar';
import PopularCities from './components/PopularCities';
import CityResultList from './components/CityResultList';
import ThemeToggle from './components/ThemeToggle';
import ErrorBanner from './components/ErrorBanner';

function AppShell() {
  const { theme, error } = useAppState();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-wrap">
      <main className="container main">
        <header className="header">
          <div className="brand">
            <div className="brand-badge" aria-hidden="true">
              <span>CS</span>
            </div>
            <div>
              <h1 className="title">City Snapshot</h1>
              <div className="subtitle">Search a city to view weather and a quick wiki summary.</div>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <section aria-labelledby="search-section">
          <h2 id="search-section" className="section-title">Search</h2>
          <div className="divider" />
          <SearchBar />
          <div style={{ marginTop: 12 }}>
            <PopularCities />
          </div>
        </section>

        <section style={{ marginTop: 22 }} aria-labelledby="results-section">
          <h2 id="results-section" className="section-title">Results</h2>
          <div className="divider" />
          {error && <ErrorBanner message={error} />}
          <CityResultList />
        </section>

        <footer className="footer">
          Built with Open‑Meteo and Wikipedia • No API keys required
        </footer>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root app component wired with AppStateProvider */
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  );
}

export default App;
