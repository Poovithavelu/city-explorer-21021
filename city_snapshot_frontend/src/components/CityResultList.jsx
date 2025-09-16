import React from 'react';
import '../util.css';
import { useAppState } from '../state/AppStateContext';
import CityCard from './CityCard';
import { CityCardSkeleton } from './Skeletons';

// PUBLIC_INTERFACE
export default function CityResultList() {
  /** Renders list of search results with loading and empty states */
  const { results, loading, query } = useAppState();

  if (loading) {
    return (
      <div className="results-grid">
        <CityCardSkeleton />
        <CityCardSkeleton />
        <CityCardSkeleton />
      </div>
    );
  }

  if (!results.length && query && query.length >= 2) {
    return <div className="helper">No results found for “{query}”.</div>;
  }

  return (
    <div className="results-grid">
      {results.map(c => (
        <CityCard key={c.id} city={c} />
      ))}
    </div>
  );
}
