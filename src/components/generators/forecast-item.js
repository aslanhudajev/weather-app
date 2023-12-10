import ForecastHtml from "./forecast-item.html";

function CreateForecastItem(name) {
  const container = document.createElement("div");
  container.classList = "df dfr all-alc forecast-item";
  container.innerHTML = ForecastHtml;

  const day = document.querySelector("#day");
  const day = document.querySelector("#morning-temp");

  return {};
}

export default CreateForecastItem;
