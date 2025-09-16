import React, { useState } from 'react';
import '../util.css';
import { useAppDispatch, useAppState } from '../state/AppStateContext';
import { buildSnapshot } from '../state/actions';
import CitySnapshotCard from './CitySnapshotCard';

// PUBLIC_INTERFACE
export default function CityCard({ city }) {
  /** City search result card that can expand to show snapshot */
  const dispatch = useAppDispatch();
  const state = useAppState();
  const snapshot = state.snapshots[city.id];
  const [loading, setLoading] = useState(false);

  async function onSnapshot() {
    setLoading(true);
    try {
      await buildSnapshot(dispatch, state, city);
    } finally {
      setLoading(false);
    }
  }

  if (snapshot) {
    return <CitySnapshotCard snapshot={snapshot} />;
  }

  return (
    <article className="card city-card">
      <div className="thumb" aria-hidden="true" />
      <div className="city-meta">
        <div className="city-title">{city.name}</div>
        <div className="city-sub">{city.country} {city.admin1 ? `• ${city.admin1}` : ''}</div>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={onSnapshot} disabled={loading}>
          {loading ? 'Loading…' : 'Show Snapshot'}
        </button>
      </div>
    </article>
  );
}
