import React, { useEffect, useRef } from 'react';
import '../util.css';
import { useAppDispatch, useAppState } from '../state/AppStateContext';
import { runSearchDebounced, setQuery } from '../state/actions';

// PUBLIC_INTERFACE
export default function SearchBar() {
  /** Search input with debounce and keyboard a11y */
  const state = useAppState();
  const { query, loading } = state;
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChange(e) {
    const v = e.target.value;
    dispatch(setQuery(v));
    runSearchDebounced(dispatch, state, v);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      // immediate search on enter
      runSearchDebounced(dispatch, state, state.query, 0);
    }
  }

  function onClickSearch() {
    runSearchDebounced(dispatch, state, state.query, 0);
  }

  return (
    <div className="card" style={{ padding: 16, background: 'var(--surface)' }} aria-live="polite">
      <div className="searchbar" role="search">
        <input
          ref={inputRef}
          className="input"
          type="search"
          placeholder="Search for a city (e.g., London, Tokyo)…"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-label="Search for a city"
        />
        <button
          className="btn"
          onClick={onClickSearch}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>
      <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
        <span className="helper">Tip: try “New York”, “London”, or “Tokyo”.</span>
        <span className="helper hide-sm">
          Press <span className="kbd">Enter</span> to search
        </span>
      </div>
    </div>
  );
}
