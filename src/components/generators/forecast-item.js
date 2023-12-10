import ForecastHtml from "./forecast-item-template.html";

function CreateForecastElement() {
  const container = document.createElement("tr");
  //container.classList = "df fdr all-alc forecast-item";
  container.innerHTML = ForecastHtml;

  const day = container.querySelector("#day");
  const averageTemp = container.querySelector("#avg-temp");
  const condition = container.querySelector("#cond");
  const averageHum = container.querySelector("#avg-hum");
  const chanceOfRain = container.querySelector("#chance-of-rain");

  return {
    container,
    day,
    averageTemp,
    condition,
    averageHum,
    chanceOfRain,
  };
}

export default CreateForecastElement;
