import CreateTodayElement from "./components/today";
import CreateInfoElement from "./components/generators/info-item";

const DOMHandler = (function () {
  const form = document.querySelector("form");

  const cityName = document.querySelector(".city");
  const cityInfo = document.querySelector(".city-info");
  const date = document.querySelector(".date");

  const today = CreateTodayElement();
  const infoElements = [];

  function Init(infoOptions) {
    //for every infoOption, create an infoElement
    infoOptions.forEach((option) => {
      const infoElement = CreateInfoElement(option.name);
      infoElement.title.textContent = option.name;
      infoElements.push(infoElement);
    });

    //for every infoElement, append an item to the DOM
    infoElements.forEach((infoElement) => {
      today.infoContainer.appendChild(infoElement.container);
    });
  }

  function UpdateToday(data) {
    //Update city and local date & time
    cityName.textContent = data.location.name;
    cityInfo.textContent = data.location.country;
    date.textContent = data.location.localtime;

    //Update main current temperature
    today.temperature.textContent = `${data.current.temp_c} ºC`;
    today.icon.src = data.current.condition.icon;
    today.condition.textContent = data.current.condition.text;
    today.feelsLike.textContent = `Feels like: ${data.current.feelslike_c} ºC`;
    today.windDescription.textContent = `Wind speed: ${data.current.wind_kph}`;
  }

  function UpdateTodayInfo(data, infoOptions) {
    infoOptions.forEach((infoOption) => {
      infoElements.find(
        (infoElement) => infoElement.name === infoOption.name
      ).value.textContent = data.current[infoOption.token];
    });
  }

  return { Init, UpdateToday, UpdateTodayInfo };
})();

export default DOMHandler;
