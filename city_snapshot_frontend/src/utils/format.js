export const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail'
};

export function celcius(v) {
  return `${Math.round(v)}°C`;
}

export function shortCountry(country, admin1) {
  return admin1 ? `${country} • ${admin1}` : country;
}

export function createCityId(name, country, lat, lon) {
  return `${name}-${country}-${lat.toFixed(3)}-${lon.toFixed(3)}`;
}

export function isoNow() {
  return new Date().toISOString();
}
