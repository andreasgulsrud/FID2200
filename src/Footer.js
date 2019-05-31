import React, { Component } from "react";

import './style/Footer.scss';


class Footer extends Component {
//   constructor() {
//     super();

//   }

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