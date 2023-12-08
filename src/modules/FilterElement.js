import PubSub from "pubsub-js";
import TagIcon from "../assets/tag.svg";

function CreateFilterElement (title, id) {
    const filterItemContainer = document.createElement("div");
    filterItemContainer.classList.add("filter-item");
    filterItemContainer.dataset.id = id;

    const hastagIcon = document.createElement("img");
    hastagIcon.src = TagIcon;
    hastagIcon.classList.add("icon");

    const filterItemTitle = document.createElement("p");
    filterItemTitle.textContent = title;

    filterItemContainer.appendChild(hastagIcon);
    filterItemContainer.appendChild(filterItemTitle);

    filterItemContainer.addEventListener("click", (e) => PubSub.publish("FILTER-CHANGED", id));

    return filterItemContainer;
} 

export default CreateFilterElement;