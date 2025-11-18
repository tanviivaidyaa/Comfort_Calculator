import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="12" fill="url(#logoGradient)" />
              <path d="M24 14C19.58 14 16 17.58 16 22C16 26.42 19.58 30 24 30C28.42 30 32 26.42 32 22C32 17.58 28.42 14 24 14ZM24 18C26.21 18 28 19.79 28 22C28 24.21 26.21 26 24 26C21.79 26 20 24.21 20 22C20 19.79 21.79 18 24 18Z" fill="white"/>
              <path d="M24 32C18.48 32 14 36.48 14 42H34C34 36.48 29.52 32 24 32Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1>Comfort Calculator</h1>
            <p className="tagline">AI-Powered Global Income Intelligence</p>
          </div>
        </div>
        <div className="header-actions">
          <Link className="header-btn premium" to="/premium">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
            </svg>
            Upgrade
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
