const BASE_GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const BASE_WEATHER = 'https://api.open-meteo.com/v1/forecast';

function toQuery(params) {
  const u = new URLSearchParams(params);
  return u.toString();
}

// PUBLIC_INTERFACE
export async function searchCities(query, { limit = 8 } = {}) {
  /** Search cities via Open-Meteo Geocoding API.
   * Returns an array of GeoCity objects.
   */
  if (!query || query.trim().length < 2) return [];
  const url = `${BASE_GEO}?${toQuery({ name: query.trim(), count: limit, language: 'en', format: 'json' })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding search failed: ${res.status}`);
  const data = await res.json();
  const results = (data.results || []).map((r) => ({
    id: `${r.name}-${r.country}-${r.latitude.toFixed(3)}-${r.longitude.toFixed(3)}`,
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
    population: r.population,
  }));
  return results;
}

// PUBLIC_INTERFACE
export async function getCurrentWeather(lat, lon) {
  /** Fetch current weather for coordinates. Returns WeatherNow. */
  const params = {
    latitude: lat,
    longitude: lon,
    current_weather: true,
    timezone: 'auto',
  };
  const url = `${BASE_WEATHER}?${toQuery(params)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  const data = await res.json();
  const cw = data.current_weather || {};
  return {
    temperature: cw.temperature,
    weathercode: String(cw.weathercode ?? ''),
    windspeed: cw.windspeed,
    winddirection: cw.winddirection,
    timeISO: cw.time ? new Date(cw.time).toISOString() : new Date().toISOString(),
  };
}
