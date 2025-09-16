const BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

function sanitizeTitle(name) {
  return encodeURIComponent(String(name || '').trim().replace(/\s+/g, '_'));
}

// PUBLIC_INTERFACE
export async function getCitySummary(cityName) {
  /** Fetch Wikipedia summary + thumbnail for a city name. Returns object or null. */
  const title = sanitizeTitle(cityName);
  if (!title) return null;
  const url = `${BASE}${title}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    title: data.title,
    extract: data.extract,
    thumbnail: data.thumbnail?.source,
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
  };
}
