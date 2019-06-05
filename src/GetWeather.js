import React, { Component } from "react";
import { Skycons } from './skycons-master/skycons';

import bgRainy from './images/rainy.jpg';
import bgSunny from './images/sunny.jpg';
import bgCloudy from './images/cloudy.jpg';
import bgSnowy from './images/snowy.jpg';
import bgWindy from './images/windy.jpg';

import './style/GetWeather.scss';

class GetWeather extends Component {
  constructor() {
    super();
    // this.state = {
    //     backgroundImage: null
    // }
  }

  componentDidMount() {
    window.addEventListener('load', () => {
        let long;
        let lat;
        let locationTimeZone = document.querySelector(".location-timezone");
        let temperatureCurrent__summary = document.querySelector(".temperature-current__summary");
        let temperatureDegree = document.querySelector(".temperature-degree");
        let temperatureDegreeHigh = document.querySelector(".temperature-degree__high");
        let temperatureDegreeLow = document.querySelector(".temperature-degree__low");
        let sunrise = document.querySelector(".sunrise-time");
        let sunset = document.querySelector(".sunset-time");
        let tomorrowsSummaryString = document.querySelector(".tomorrows-summary");
    
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
                        const { temperatureHigh, temperatureLow, sunriseTime, sunsetTime } = data.daily.data[0];
                        const tomorrowsSummary = data.daily.data[1].summary;
                        // console.log('this is high temp' + temperatureHigh + 'this is low temp' + temperatureLow);
                        // set DOM elements from API
                        // CONVERT FROM FAHRENHEIT TO CELSIUS
                        let celsius = (temperature - 32) * (5 / 9);
                        let celsiusHigh = (temperatureHigh - 32) * (5 / 9);
                        let celsiusLow = (temperatureLow - 32) * (5 / 9);
    
                        locationTimeZone.textContent = data.timezone;
                        temperatureCurrent__summary.textContent = summary;
                        temperatureDegree.textContent = Math.floor(celsius) + " C°";

                        temperatureDegreeHigh.textContent = "High: " + Math.floor(celsiusHigh) + " C°";
                        temperatureDegreeLow.textContent = "Low: " + Math.floor(celsiusLow) + " C°";
                        
                            // Create a new JavaScript Date object based on the timestamp
                            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                            let dateSunRise = new Date(sunriseTime*1000);
                            // Hours part from the timestamp
                            let hoursRise = dateSunRise.getHours();
                            // Minutes part from the timestamp
                            let minutesRise = "0" + dateSunRise.getMinutes();
                            // Seconds part from the timestamp
                            // var seconds = "0" + dateSunRise.getSeconds();

                            // Will display time in 10:30:23 format
                            let formattedSunRiseTime = hoursRise + ':' + minutesRise.substr(-2); 
                            // + ':' + seconds.substr(-2);
                            
                            let dateSunSet = new Date(sunsetTime*1000);
                            // Hours part from the timestamp
                            let hoursSet = dateSunSet.getHours();
                            // Minutes part from the timestamp
                            let minutesSet = "0" + dateSunSet.getMinutes();
                            // Seconds part from the timestamp
                            // var seconds = "0" + dateSunRise.getSeconds();

                            // Will display time in 10:30:23 format
                            let formattedSunSetTime = hoursSet + ':' + minutesSet.substr(-2); 
                            // + ':' + seconds.substr(-2);



                        // A UNIX time converter i found online:
                        // https://www.epochconverter.com/

                        // Collect sunset and sunrise from API
                        sunrise.textContent = "Sunrise: " + formattedSunRiseTime;
                        sunset.textContent = "Sunset: " + formattedSunSetTime;

                        // display the summary of tomorrow
                        tomorrowsSummaryString.textContent = "Tomorrow: " + tomorrowsSummary;

    
                        // set icon
                        setIcons(icon, document.querySelector('.icon'));

                    });
            });
        }
    
        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

        // function setBackground(icon) {
        //     let backgroundImage = [];
        //     if (icon === "partly-cloudy-day") {
        //         backgroundImage = bgRainy;
        //     }
        // }
        // setBackground();

    });
  }

  render() {

    return(
      <div className="get-weather-wrapper">
          
        <img className="background-image" src={bgSunny} alt="background" />
        
        <div className="location">
            <h1 className="location-timezone"></h1>
        </div>

        <div className="icon-temperature-container">

            <div className="temperature">
                <div className="temperature-current__summary"></div>
                <h2 className="temperature-degree"></h2>
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