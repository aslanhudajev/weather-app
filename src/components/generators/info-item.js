import InfoItemHtml from "./info-item-template.html";

function CreateInfoElement(name) {
  const container = document.createElement("div");
  container.classList = "df fdc all-alc info-item";
  container.innerHTML = InfoItemHtml;

  const title = container.querySelector(".info-title");
  const value = container.querySelector(".info-value");

  return { name, container, title, value };
}

export default CreateInfoElement;
