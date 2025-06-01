import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/server-info')
      .then(res => res.json())
      .then(setServerData)
      .catch(err => console.error("Fetch error:", err));
  }, []);

  if (!serverData) return <div className="loading">Loading server info...</div>;

  return (
    <div className="container">
      <h1 className="title">SERVER INFO</h1>

      <div className="info-row">
        <div><strong>PLAYERS:</strong> {serverData.players}</div>
        <div><strong>PING:</strong> {serverData.ping}</div>
        <div><strong>TICKRATE:</strong> {serverData.tickrate}</div>
      </div>

      <div className="content-grid">
        <div className="column">
          <h2>SETTINGS</h2>
          <ul>
            {Object.entries(serverData.settings).map(([key, value]) => (
              <li key={key}>
                <span className="label">{formatKey(key)}</span>
                <span className="value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        {serverData.advanced &&(
        <div className="column">
          <h2>ADVANCED</h2>
          <ul>
            {Object.entries(serverData.advanced).map(([key, value]) => (
              <li key={key}>
                <span className="label">{formatKey(key)}</span>
                <span className="value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        )}
        <div className="column">
          <h2>RULES</h2>
          <ul>
            {Object.entries(serverData.rules).map(([key, value]) => (
              <li key={key}>
                <span className="label">{formatKey(key)}</span>
                <span className="value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function formatKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default App;
