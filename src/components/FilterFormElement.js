import PubSub from "pubsub-js";
import CreateFormInputElement from "./FormInputElement";

function CreateFilterForm () {
    const filterFormContainer = document.createElement("div");
    filterFormContainer.classList.add("form", "hidden");

    const filterForm = document.createElement("form");

    const nameTextField = CreateFormInputElement("input", "name", "Project name", "input-text", "in-filter-name");

    const createBtn = document.createElement("button");
    createBtn.classList.add("btn");
    createBtn.id = "btn-create-filter";
    createBtn.textContent = "Create project";
    createBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        PubSub.publish("FILTER-ADDED", GetFormData());
        ClearFields();
        filterFormContainer.classList.toggle("hidden");
    });

    filterForm.appendChild(nameTextField.container);
    filterForm.appendChild(createBtn);

    filterFormContainer.appendChild(filterForm);

    filterFormContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        filterFormContainer.classList.toggle("hidden");
    });

    filterForm.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    function GetFormData () {
        return { 
            filterName: nameTextField.inputField.value,
        }
    }

    function ClearFields () {
        nameTextField.inputField.value = "";
    }
    
    return filterFormContainer;
}

export default CreateFilterForm;