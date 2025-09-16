import { searchCities, getCurrentWeather } from '../services/openMeteo';
import { getCitySummary } from '../services/wikipedia';

let debounceTimer;

// PUBLIC_INTERFACE
export function setTheme(theme) {
  /** Set the theme */
  return { type: 'SET_THEME', theme };
}

// PUBLIC_INTERFACE
export function setQuery(query) {
  /** Set the search query */
  return { type: 'SET_QUERY', query };
}

// PUBLIC_INTERFACE
export function runSearch(dispatch, state, query) {
  /** Fire a search with caching */
  const q = (query ?? state.query ?? '').trim();
  if (q.length < 2) {
    dispatch({ type: 'SEARCH_SUCCESS', results: [], queryKey: q });
    return;
  }
  const cached = state.cache.search[q];
  if (cached) {
    dispatch({ type: 'SEARCH_SUCCESS', results: cached, queryKey: q });
    return;
  }
  dispatch({ type: 'SEARCH_START' });
  searchCities(q)
    .then(results => dispatch({ type: 'SEARCH_SUCCESS', results, queryKey: q }))
    .catch(err => dispatch({ type: 'SEARCH_ERROR', error: err.message || String(err) }));
}

// PUBLIC_INTERFACE
export function runSearchDebounced(dispatch, state, query, delay = 350) {
  /** Debounced search to limit API traffic */
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => runSearch(dispatch, state, query), delay);
}

// PUBLIC_INTERFACE
export async function buildSnapshot(dispatch, state, city) {
  /** Build a snapshot by merging weather and wiki with caching */
  const id = city.id;
  let weather = state.cache.weather[id];
  if (!weather) {
    try {
      weather = await getCurrentWeather(city.latitude, city.longitude);
      dispatch({ type: 'CACHE_WEATHER', id, weather });
    } catch (e) {
      // proceed without weather if it fails
      weather = undefined;
    }
  }
  const wikiKey = city.name;
  let wiki = state.cache.wiki[wikiKey];
  if (!wiki) {
    try {
      wiki = await getCitySummary(city.name);
      if (wiki) dispatch({ type: 'CACHE_WIKI', key: wikiKey, wiki });
    } catch (e) {
      wiki = undefined;
    }
  }
  const snapshot = { city, weather, wiki };
  dispatch({ type: 'SNAPSHOT_SET', id, snapshot });
  return snapshot;
}
