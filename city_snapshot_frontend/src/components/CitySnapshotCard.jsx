import React from 'react';
import '../util.css';
import { celcius, shortCountry, weatherCodeMap } from '../utils/format';

// PUBLIC_INTERFACE
export default function CitySnapshotCard({ snapshot }) {
  /** Card displaying combined city snapshot */
  const { city, weather, wiki } = snapshot;
  return (
    <article className="card city-card" aria-label={`Snapshot for ${city.name}`}>
      {wiki?.thumbnail ? (
        <img className="thumb" src={wiki.thumbnail} alt={`${city.name} thumbnail`} />
      ) : (
        <div className="thumb" aria-hidden="true" />
      )}
      <div className="city-meta">
        <div className="city-title">{city.name}</div>
        <div className="city-sub">{shortCountry(city.country, city.admin1)}</div>
        {wiki?.extract ? (
          <div className="helper" style={{ marginTop: 4, maxHeight: 42, overflow: 'hidden' }}>
            {wiki.extract}
          </div>
        ) : null}
      </div>
      <div className="city-meta" style={{ alignItems: 'flex-end' }}>
        {weather ? (
          <div className="metrics" style={{ justifyContent: 'flex-end' }}>
            <span className="metric">
              <span aria-hidden="true">🌡️</span> {celcius(weather.temperature)}
            </span>
            {weather.weathercode && (
              <span className="metric hide-sm">
                <span aria-hidden="true">⛅</span> {weatherCodeMap[weather.weathercode] || 'Weather'}
              </span>
            )}
          </div>
        ) : (
          <div className="helper">Weather unavailable</div>
        )}
        {wiki?.url && (
          <div className="card-actions" style={{ marginTop: 8 }}>
            <a className="btn secondary" href={wiki.url} target="_blank" rel="noreferrer">Wikipedia</a>
          </div>
        )}
      </div>
    </article>
  );
}
