import React, { Component } from "react";

import './style/GetWeather.scss';
import { Skycons } from './skycons-master/skycons';

class GetWeather extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    window.addEventListener('load', () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector(".temperature-description");
        let temperatureDegree = document.querySelector(".temperature-degree");
        let locationTimeZone = document.querySelector(".location-timezone");
    
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position =>{
                // console.log(position);
                long = position.coords.longitude;
                lat = position.coords.latitude;
    
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/c43bba052ab29fd440b1bab241b2c651/${lat},${long}`;
    
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { temperature, summary, icon } = data.currently;
                        // set DOM elements from API
                        // CONVERT FROM FAHRENHEIT TO CELSIUS
                        let celsius = (temperature - 32) * (5 / 9);
    
                        temperatureDegree.textContent = Math.floor(celsius) + " Degrees celsius";
                        temperatureDescription.textContent = summary;
                        locationTimeZone.textContent = data.timezone;
    
                        // set icon
                        setIcons(icon, document.querySelector('.icon'));
    
                        // Toggle temperature between fahrenheit and celsius
                    });
            });
        }
    
        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "red"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    });
  }

  render() {

    return(
      <div className="get-weather-wrapper">
        
        <div className="location">
            <h1 className="location-timezone"></h1>
        </div>

        <div className="icon-wrapper">
            <canvas className="icon" width="128" height="128"></canvas>
        </div>

        <div className="temperature">
            <div className="temperature-description"></div>
            <h2 className="temperature-degree"></h2>
        </div>
      
      </div>
    )
  }
}

export default GetWeather;