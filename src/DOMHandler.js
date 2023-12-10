import PubSub from "pubsub-js";

import CreateTodayElement from "./components/today";
import CreateInfoElement from "./components/generators/info-item";
import CreateForecastElement from "./components/generators/forecast-item";

const DOMHandler = (function () {
  const form = document.querySelector("form");
  const cityField = document.querySelector("input");

  const cityName = document.querySelector(".city");
  const cityInfo = document.querySelector(".city-info");
  const date = document.querySelector(".date");

  const today = CreateTodayElement();
  const week = document.querySelector(".week tbody");
  const infoElements = {};

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const forecastElements = [];

  function Init(infoOptions, days) {
    //for every infoOption, create an infoElement and append it to the container
    infoOptions.forEach((option) => {
      const infoElement = CreateInfoElement();
      infoElement.title.textContent = option.name;
      infoElements[option.token] = {
        element: infoElement,
      };
    });

    for (const prop in infoElements) {
      if (Object.hasOwnProperty.call(infoElements, prop)) {
        today.infoContainer.appendChild(infoElements[prop].element.container);
      }
    }

    for (let i = 0; i < days; i++) {
      const forecastElement = CreateForecastElement();
      forecastElements.push(forecastElement);
      week.appendChild(forecastElement.container);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      PubSub.publish("CITY_CHANGED", cityField.value);
    });
  }

  function UpdateToday(data) {
    //Update city and local date & time
    cityName.textContent = data.location.name;
    cityInfo.textContent = data.location.country;
    date.textContent = data.location.localtime;

    //Update main current temperature
    today.temperature.textContent = `${data.current.temp_c}ºC`;
    today.icon.src = data.current.condition.icon;
    today.condition.textContent = data.current.condition.text;
    today.feelsLike.textContent = `Feels like: ${data.current.feelslike_c}ºC`;
    today.windDescription.textContent = `Wind speed: ${data.current.wind_kph}`;
  }

  function UpdateTodayInfo(data, infoOptions) {
    infoOptions.forEach((option) => {
      infoElements[option.token].element.value.textContent =
        data.current[option.token];
    });
  }

  function UpdateForecast(data, days) {
    for (let i = 0; i < days; i++) {
      const dayName = new Date(data.forecastday[i].date).getDay();
      const element = forecastElements[i];
      element.day.textContent = dayNames[dayName];
      element.averageTemp.textContent = `${data.forecastday[i].day.avgtemp_c}ºC`;
      element.condition.src = data.forecastday[i].day.condition.icon;
      element.averageHum.textContent = data.forecastday[i].day.avghumidity;
      element.chanceOfRain.textContent =
        data.forecastday[i].day.daily_chance_of_rain;
    }
  }

  return { Init, UpdateToday, UpdateTodayInfo, UpdateForecast };
})();

export default DOMHandler;
