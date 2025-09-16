import React from 'react';
import '../util.css';

// PUBLIC_INTERFACE
export function CityCardSkeleton() {
  /** Loading placeholder for city card */
  return (
    <div className="card city-card">
      <div className="thumb skeleton" />
      <div className="city-meta" style={{ width: '100%' }}>
        <div className="skeleton" style={{ height: 16, width: '40%' }} />
        <div className="skeleton" style={{ height: 12, width: '70%', marginTop: 8 }} />
      </div>
      <div className="metrics">
        <div className="skeleton" style={{ height: 28, width: 90 }} />
        <div className="skeleton hide-sm" style={{ height: 28, width: 120 }} />
      </div>
    </div>
  );
}
