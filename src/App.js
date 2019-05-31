import React from 'react';

import GetWeather from './GetWeather';
import Footer from './Footer';

import './style/App.scss';
import Heading from './Heading';

function App() {
  return (
    <div className="App">
      <Heading />
      <GetWeather />
      <Footer />
    </div>
  );
}

export default App;
