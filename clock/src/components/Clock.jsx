import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: 'New York', zone: 'America/New_York', emoji: '🗽' },
    { name: 'London', zone: 'Europe/London', emoji: '🇬🇧' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', emoji: '🇯🇵' },
    { name: 'Sydney', zone: 'Australia/Sydney', emoji: '🇦🇺' },
    { name: 'Dubai', zone: 'Asia/Dubai', emoji: '🇦🇪' },
    { name: 'Singapore', zone: 'Asia/Singapore', emoji: '🇸🇬' },
  ];

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(({ name, zone }) => {
        const time = new Date().toLocaleString('en-US', { 
          timeZone: zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        newTimes[name] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-container">
      <h1 className="clock-title">🌍 World Clock</h1>
      <div className="clocks-grid">
        {timeZones.map(({ name, zone, emoji }) => (
          <div key={zone} className="clock-card">
            <div className="card-header">
              <span className="emoji">{emoji}</span>
              <h2 className="timezone-name">{name}</h2>
            </div>
            <div className="time-display">{times[name] || '--:--:--'}</div>
            <p className="timezone-label">{zone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clock;
