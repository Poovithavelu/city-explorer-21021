import React from 'react';
import '../util.css';
import { useAppDispatch, useAppState } from '../state/AppStateContext';
import { setQuery, runSearchDebounced } from '../state/actions';

const POPULAR = [
  { label: 'London' },
  { label: 'New York' },
  { label: 'Tokyo' }
];

// PUBLIC_INTERFACE
export default function PopularCities() {
  /** Quick search chips for popular cities */
  const dispatch = useAppDispatch();
  const state = useAppState();

  function clickCity(label) {
    dispatch(setQuery(label));
    runSearchDebounced(dispatch, state, label, 0);
  }

  return (
    <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
      {POPULAR.map(c => (
        <button
          key={c.label}
          className="btn secondary"
          style={{ padding: '8px 12px', fontSize: 14 }}
          onClick={() => clickCity(c.label)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
