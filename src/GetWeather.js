// FID2200: 28.05.19 - 13.06.19
// STUDENTNR.: 984112
// KANDIDATNR.: 600023

import React, { Component } from "react";
import { Skycons } from './skycons-master/skycons';

import './style/GetWeather.scss';

class GetWeather extends Component {
//   constructor() {
//     super();
    
//   }

  componentDidMount() {
    window.addEventListener('load', () => {
        let long;
        let lat;
        let locationTimeZone = document.querySelector(".location-timezone");
        let temperatureCurrent__summary = document.querySelector(".temperature-current__summary");
        let temperatureDegree = document.querySelector(".temperature-current__degree");
        let temperatureDegreeHigh = document.querySelector(".temperature-degree__high");
        let temperatureDegreeLow = document.querySelector(".temperature-degree__low");
        let sunrise = document.querySelector(".sunrise-time");
        let sunset = document.querySelector(".sunset-time");
        let tomorrowsSummaryString = document.querySelector(".tomorrows-summary");

    
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(position);
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const darkSkyApiKey = 'c43bba052ab29fd440b1bab241b2c651';

                // AN API FROM HEROKU THAT ENABLES CROSS-ORIGIN REQUESTS - USE AS PROXY TO AVOID ERROR AND APP CRASH
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${long}`;
    
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // DECLARE VARIABLES FOR THE API CALL TYPES
                        let { temperature, summary, icon } = data.currently;
                        const { temperatureHigh, temperatureLow, sunriseTime, sunsetTime } = data.daily.data[0];
                        const tomorrowsSummary = data.daily.data[1].summary;
                        
                        // CONVERT FROM FAHRENHEIT TO CELSIUS
                        let celsius = (temperature - 32) * (5 / 9);
                        let celsiusHigh = (temperatureHigh - 32) * (5 / 9);
                        let celsiusLow = (temperatureLow - 32) * (5 / 9);
    
                        // ADD THE TEXT CONTENT TO THE FRONT-END FROM THE TIMEZONE, SUMMARY AND TEMPERATURE DATA COLLECTED
                        locationTimeZone.textContent = data.timezone;
                        temperatureCurrent__summary.textContent = summary;
                        temperatureDegree.textContent = Math.floor(celsius) + " C°";

                        temperatureDegreeHigh.textContent = "High: " + Math.floor(celsiusHigh) + " C°";
                        temperatureDegreeLow.textContent = "Low: " + Math.floor(celsiusLow) + " C°";

                            // CONVERT TIME FROM UNIX TO READEABLE TIME STAMP
                            // FORMULA FROM A UNIX TIME CONVERTER I FOUND ONLINE (https://www.epochconverter.com/)
                        
                            // CREATE A DATE OBJECT BASED ON THE UNIX TIME AND MULTIPLY BY 1000, SO THE ARGUMENT IS IN MS, NOT S.
                            let dateSunRise = new Date(sunriseTime*1000);
                            // HOURS PART FROM TIMESTAMP
                            let hoursRise = dateSunRise.getHours();
                            // MINUTES PART FROM TIMESTAMP
                            let minutesRise = "0" + dateSunRise.getMinutes();
                            // STORE THE TIME IN THE CONVERTED FORMAT IN A VARIABLE
                            let formattedSunRiseTime = hoursRise + ':' + minutesRise.substr(-2); 
                         
                            // DO THE SAME FOR SUNSET AS FOR SUNRISE
                            let dateSunSet = new Date(sunsetTime*1000);
                            let hoursSet = dateSunSet.getHours();
                            let minutesSet = "0" + dateSunSet.getMinutes();
                            let formattedSunSetTime = hoursSet + ':' + minutesSet.substr(-2); 

                        // ADD THE TEXT CONTENT TO THE FRONT-END FROM SUN SET/RISE IN CORRECT FORMAT
                        sunrise.textContent = "Sunrise: " + formattedSunRiseTime;
                        sunset.textContent = "Sunset: " + formattedSunSetTime;

                        // DISPLAY THE SUMMARY OF TOMORROWS WEATHER
                        tomorrowsSummaryString.textContent = "Tomorrow: " + tomorrowsSummary;
    
                        // SET THE ICON FROM SKYCONS
                        setIcons(icon, document.querySelector('.icon'));

                    });
            });
        }
    
        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "#31E5B5"});
            // REPLACE "-" WITH "_" AND SET UPPER CASE TO MATCH SKYCONS WITH DARK SKY API'S ICON NAMES
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            // ANIMATE ICONS
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
        <div className="icon-temperature-container">
            <div className="temperature">
                <div className="temperature-current">
                    <div className="temperature-current__summary"></div>
                    <h2 className="temperature-current__degree"></h2>
                </div>
                <h3 className="temperature-degree__high"></h3>
                <h3 className="temperature-degree__low"></h3>
            </div>
            <div className="icon-wrapper">
                <canvas className="icon" width="220" height="220"></canvas>
            </div>
        </div>
        <div className="sunset-sunrise-wrapper">
            <p className="sunrise-time"></p>
            <p className="sunset-time"></p>
        </div>
        <div className="tomorrows-summary-wrapper">
            <p className="tomorrows-summary"></p>
        </div>
      </div>
    )
  }
}

export default GetWeather;