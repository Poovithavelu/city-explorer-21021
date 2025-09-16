import React, { createContext, useContext, useMemo, useReducer } from 'react';

/**
 * Central application state for City Snapshot:
 * - theme: 'light' | 'dark'
 * - query: current search string
 * - loading/error: search state
 * - results: array of GeoCity from Open-Meteo geocoding
 * - snapshots: per-city snapshot cache
 * - cache: memoized search, wiki, and weather results
 */
const initialState = {
  theme: 'light',
  query: '',
  loading: false,
  error: null,
  results: [],
  snapshots: {},
  cache: {
    search: {},
    wiki: {},
    weather: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'SEARCH_START':
      return { ...state, loading: true, error: null };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        results: action.results,
        cache: {
          ...state.cache,
          search: { ...state.cache.search, [action.queryKey]: action.results },
        },
      };
    case 'SEARCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'SNAPSHOT_SET':
      return {
        ...state,
        snapshots: { ...state.snapshots, [action.id]: action.snapshot },
      };
    case 'CACHE_WEATHER':
      return {
        ...state,
        cache: { ...state.cache, weather: { ...state.cache.weather, [action.id]: action.weather } },
      };
    case 'CACHE_WIKI':
      return {
        ...state,
        cache: { ...state.cache, wiki: { ...state.cache.wiki, [action.key]: action.wiki } },
      };
    default:
      return state;
  }
}

const AppStateContext = createContext(undefined);
const AppDispatchContext = createContext(undefined);

// PUBLIC_INTERFACE
export function useAppState() {
  /** Access application state. */
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useAppDispatch() {
  /** Access application dispatch. */
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error('useAppDispatch must be used within AppStateProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function AppStateProvider({ children, initial = initialState }) {
  /** Root provider wrapping the app with reducer state. */
  const [state, dispatch] = useReducer(reducer, initial);
  const stateMemo = useMemo(() => state, [state]);
  return (
    <AppStateContext.Provider value={stateMemo}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
