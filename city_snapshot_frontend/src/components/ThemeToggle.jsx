import React from 'react';
import '../util.css';
import { useAppDispatch, useAppState } from '../state/AppStateContext';
import { setTheme } from '../state/actions';

// PUBLIC_INTERFACE
export default function ThemeToggle() {
  /** Theme toggle button */
  const { theme } = useAppState();
  const dispatch = useAppDispatch();
  const next = theme === 'light' ? 'dark' : 'light';

  const onToggle = () => {
    dispatch(setTheme(next));
  };

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      aria-label={'Switch to ' + next + ' theme'}
      onClick={onToggle}
      title={'Switch to ' + next + ' theme'}
    >
      <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className="hide-sm">{next === 'dark' ? 'Dark' : 'Light'} Mode</span>
    </button>
  );
}
