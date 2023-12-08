import PubSub from "pubsub-js";
import CreateFormInputElement from "./FormInputElement";
import CreateFormSelectElement from "./FormSelectElement";

const TaskForm = (function () {
    PubSub.subscribe("RENDER-FILTERS", UpdateTaskForm);

    const taskFormContainer = document.createElement("div");
    taskFormContainer.classList.add("form", "hidden");

    const taskForm = document.createElement("form");

    const titleTextField = CreateFormInputElement("text", "title", "Title", "input-text", "in-task-title");
    const descTextField = CreateFormInputElement("text", "desc", "Description", "input-text", "in-task-desc");
    const dueDateield = CreateFormInputElement("date", "date", "Due date", "input-date", "in-task-date");

    const priorityDropDown = CreateFormSelectElement("priority", "Priority", "input-select", "sel-priority");
    priorityDropDown.AddOption("Low", "low");
    priorityDropDown.AddOption("Medium", "medium");
    priorityDropDown.AddOption("High", "high");

    const projectFilterDropDown = CreateFormSelectElement("project", "Project", "input-select", "sel-filter");

    const createBtn = document.createElement("button");
    createBtn.classList.add("btn");
    createBtn.id = "btn-create";
    createBtn.textContent = "Create task";
    createBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        PubSub.publish("TASK-ADDED", GetFormData())
        ClearFields();
        taskFormContainer.classList.toggle("hidden");
    })

    taskForm.appendChild(titleTextField.container);
    taskForm.appendChild(descTextField.container);
    taskForm.appendChild(dueDateield.container);
    taskForm.appendChild(priorityDropDown.container);
    taskForm.appendChild(projectFilterDropDown.container);
    taskForm.appendChild(createBtn);

    taskFormContainer.appendChild(taskForm);

    taskFormContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        taskFormContainer.classList.toggle("hidden");
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

    function UpdateTaskForm (msg, taskFilters) {
        projectFilterDropDown.inputField.innerHTML = "";

        for (const taskFilter of taskFilters) {
            projectFilterDropDown.AddOption(taskFilter.name, taskFilter.id);
        }
    }

    function ClearFields () {
        titleTextField.inputField.value = "";
        descTextField.inputField.value = "";
        priorityDropDown.inputField.value = "";
        projectFilterDropDown.inputField.value = "";
        dueDateield.inputField.value = "";
    }
 
    return { taskFormContainer };
})()

export default TaskForm;