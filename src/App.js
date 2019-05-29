import React from 'react';

import GetWeather from './GetWeather';
import Footer from './Footer';

import './style/App.scss';

function App() {
  return (
    <div className="App">
      <GetWeather />
      <Footer />
    </div>
  );
}

export default App;
