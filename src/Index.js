import "./assets/styles.css";

const App = (function () {
  const apiKey = "";

  function Init() {}

  async function GetWeather(city) {
    const response = await fetch("", { mode: "cors" });
    const weatherData = await response.json();
  }

  Init();
})();

export default App;
