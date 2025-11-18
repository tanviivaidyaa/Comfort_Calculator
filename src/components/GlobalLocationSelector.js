import React, { useState } from 'react';
import './GlobalLocationSelector.css';
import { GLOBAL_REGIONS, US_STATES_CITIES } from '../data/globalCitiesData';

const GlobalLocationSelector = ({ 
  selectedRegion, 
  setSelectedRegion,
  selectedCountry, 
  setSelectedCountry,
  selectedCity, 
  setSelectedCity, 
  onCalculate, 
  loading 
}) => {
  const [viewMode, setViewMode] = useState('global'); // 'global' or 'us-detailed'

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCountry('');
    setSelectedCity('');
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedCountry(state); // Reuse country field for US states
    setSelectedCity('');
  };

  const countries = selectedRegion && GLOBAL_REGIONS[selectedRegion] 
    ? Object.keys(GLOBAL_REGIONS[selectedRegion]) 
    : [];

  const cities = selectedCountry && selectedRegion && GLOBAL_REGIONS[selectedRegion]?.[selectedCountry]
    ? GLOBAL_REGIONS[selectedRegion][selectedCountry]
    : [];

  const usCities = selectedCountry && US_STATES_CITIES[selectedCountry]
    ? US_STATES_CITIES[selectedCountry]
    : [];

  return (
    <div className="global-location-selector">
      <div className="selector-header">
        <h3>🌍 Select Your Location</h3>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'global' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('global');
              setSelectedRegion('');
              setSelectedCountry('');
              setSelectedCity('');
            }}
          >
            🌎 Global Cities
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'us-detailed' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('us-detailed');
              setSelectedRegion('North America');
              setSelectedCountry('');
              setSelectedCity('');
            }}
          >
            🇺🇸 US States (Detailed)
          </button>
        </div>
      </div>

      {viewMode === 'global' ? (
        <div className="selector-grid">
          <div className="input-group">
            <label htmlFor="region-select">
              <span className="label-icon">🗺️</span>
              Region
            </label>
            <div className="select-wrapper">
              <select
                id="region-select"
                value={selectedRegion}
                onChange={handleRegionChange}
                disabled={loading}
              >
                <option value="">Choose a region...</option>
                {Object.keys(GLOBAL_REGIONS).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="country-select">
              <span className="label-icon">🏳️</span>
              Country
            </label>
            <div className="select-wrapper">
              <select
                id="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                disabled={!selectedRegion || loading}
              >
                <option value="">Choose a country...</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="city-select">
              <span className="label-icon">🏙️</span>
              City
            </label>
            <div className="select-wrapper">
              <select
                id="city-select"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedCountry || loading}
              >
                <option value="">Choose a city...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="selector-grid">
          <div className="input-group">
            <label htmlFor="state-select">
              <span className="label-icon">🗺️</span>
              US State
            </label>
            <div className="select-wrapper">
              <select
                id="state-select"
                value={selectedCountry}
                onChange={handleStateChange}
                disabled={loading}
              >
                <option value="">Choose a state...</option>
                {Object.keys(US_STATES_CITIES).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="us-city-select">
              <span className="label-icon">🏙️</span>
              City
            </label>
            <div className="select-wrapper">
              <select
                id="us-city-select"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedCountry || loading}
              >
                <option value="">Choose a city...</option>
                {usCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Calculate button moved to App.js to appear after lifestyle options */}
    </div>
  );
};

export default GlobalLocationSelector;
