import "./assets/styles.css";

const App = (function () {
  const apiKey = "3e5e3012454b47aba7d195512230712";

  function Init() {}

  async function GetWeather(city) {
    const response = await fetch("", { mode: "cors" });
    const weatherData = await response.json();
  }

  Init();
})();

export default App;
