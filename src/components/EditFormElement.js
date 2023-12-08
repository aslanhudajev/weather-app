import PubSub from "pubsub-js";
import CreateFormInputElement from "./FormInputElement";
import CreateFormSelectElement from "./FormSelectElement";

const EditForm = (function () {
    PubSub.subscribe("RENDER-FILTERS", UpdateEditForm);
    PubSub.subscribe("TASK-EDIT-STARTED", FillEditForm);

    const editFormContainer = document.createElement("div");
    editFormContainer.classList.add("form", "hidden");

    const taskForm = document.createElement("form");

    const titleTextField = CreateFormInputElement("text", "title", "Title", "input-text", "in-task-title");
    const descTextField = CreateFormInputElement("text", "desc", "Description", "input-text", "in-task-desc");
    const dueDateield = CreateFormInputElement("date", "date", "Due date", "input-date", "in-task-date");

    const priorityDropDown = CreateFormSelectElement("priority", "Priority", "input-select", "sel-priority");
    priorityDropDown.AddOption("Low", "low");
    priorityDropDown.AddOption("Medium", "medium");
    priorityDropDown.AddOption("High", "high");

    const projectFilterDropDown = CreateFormSelectElement("project", "Project", "input-select", "sel-filter");

    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("btn");
    confirmBtn.id = "btn-confirm";
    confirmBtn.textContent = "Confirm";
    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("task edited");
        PubSub.publish("TASK-EDITED", GetFormData())
    })

    taskForm.appendChild(titleTextField.container);
    taskForm.appendChild(descTextField.container);
    taskForm.appendChild(dueDateield.container);
    taskForm.appendChild(priorityDropDown.container);
    taskForm.appendChild(projectFilterDropDown.container);
    taskForm.appendChild(confirmBtn);

    editFormContainer.appendChild(taskForm);

    editFormContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        editFormContainer.classList.toggle("hidden");
    });

    taskForm.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    function GetFormData () {
        return { 
            taskTitle: titleTextField.inputField.value,
            taskDesc: descTextField.inputField.value,
            taskPriority: priorityDropDown.inputField.value,
            taskFilterId: projectFilterDropDown.inputField.value,
            taskDueDate: dueDateield.inputField.value,
        }
    }

    function UpdateEditForm (msg, taskFilters) {
        projectFilterDropDown.inputField.innerHTML = "";

        for (const taskFilter of taskFilters) {
            projectFilterDropDown.AddOption(taskFilter.name, taskFilter.id);
        }
    }

    function FillEditForm (msg, task) {
        titleTextField.inputField.value = task.title;
        descTextField.inputField.value = task.description;
        priorityDropDown.inputField.value = task.priority;
        projectFilterDropDown.inputField.value = task.filterId;
        dueDateield.inputField.value = task.dueDate;

        editFormContainer.classList.toggle("hidden");
    }

    return { editFormContainer };
})()

export default EditForm;