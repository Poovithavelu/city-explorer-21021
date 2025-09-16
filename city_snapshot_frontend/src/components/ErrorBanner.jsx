import React from 'react';
import '../util.css';

// PUBLIC_INTERFACE
export default function ErrorBanner({ message }) {
  /** Displays a prominent error message */
  if (!message) return null;
  return (
    <div className="error-banner" role="alert" aria-live="assertive">
      <strong>Something went wrong:</strong> {message}
    </div>
  );
}
