import DOMHandler from "./DOMHandler";
import PubSub from "pubsub-js";

import "./assets/styles.css";

const App = (function () {
  PubSub.subscribe("CITY_CHANGED", CityChanged);

  const apiKey = "3e5e3012454b47aba7d195512230712";
  const baseApiUrl = "https://api.weatherapi.com/v1/";

  const days = 7;

  const infoOptions = [
    { name: "UV Index", token: "uv" },
    { name: "Humidity", token: "humidity" },
    { name: "Wind direction", token: "wind_degree" },
    { name: "Cloudiness", token: "cloud" },
    { name: "Percipitation", token: "precip_mm" },
    { name: "Pressure", token: "pressure_mb" },
  ];

  function Init() {
    //Initialize DOMHandler
    DOMHandler.Init(infoOptions, 7);
    CityChanged();
  }

  async function GetWeatherData(city) {
    const response = await fetch(
      baseApiUrl + `forecast.json?key=${apiKey}&q=${city}&days=${days}`,
      {
        mode: "cors",
      }
    );
    const weatherData = await response.json();
    return weatherData;
  }

  async function CityChanged(msg, city = "New York") {
    const weatherData = await GetWeatherData(city);
    console.log(await weatherData.forecast);

    SendDataToDOMHandler(weatherData);
  }

  function SendDataToDOMHandler(weatherData) {
    DOMHandler.UpdateToday(weatherData);
    DOMHandler.UpdateTodayInfo(weatherData, infoOptions);
    DOMHandler.UpdateForecast(weatherData.forecast, days);
  }

  Init();
})();

export default App;
