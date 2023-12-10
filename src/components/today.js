function CreateTodayElement() {
  const temperature = document.querySelector(".today-temp");
  const icon = document.querySelector(".today-icon");
  const condition = document.querySelector(".today-condition");
  const feelsLike = document.querySelector(".today-feels-like");
  const windDescription = document.querySelector(".today-wind");

  const infoContainer = document.querySelector(".right");

  return {
    temperature,
    icon,
    condition,
    feelsLike,
    windDescription,
    infoContainer,
  };
}

export default CreateTodayElement;
