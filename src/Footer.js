// FID2200: 28.05.19 - 13.06.19
// STUDENTNR.: 984112
// KANDIDATNR.: 600023

import React, { Component } from "react";

import './style/Footer.scss';

class Footer extends Component {
  
  render() {

    return(
      <div className="footer-wrapper">
        <p className="footer-text">
            Created with <span>❤️</span> and React. Powered by 
                <a className="footer-text__hyperlink" href='https://darksky.net/forecast/59.9133,10.739/us12/en'> Dark Sky.</a>
        </p>
      </div>
    )
  }
}

export default Footer;