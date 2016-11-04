import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import trips from './data/trips.json';
import stations from './data/stations.json';
import './index.css';

ReactDOM.render(
  <App trips={trips.slice(199, trips.length)} stations={stations.stations} />,
  document.getElementById('root')
);
