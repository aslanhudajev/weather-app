import PubSub from "pubsub-js";
import DeleteIcon from "../assets/delete_outline.svg";
import EditIcon from "../assets/edit.svg";

function CreateTaskElemement (title, desc, priority, dueDate, project, id, finished) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");
    taskItemContainer.dataset.id = id;

    const finishCheck = document.createElement("div");
    if (finished === true) {
        finishCheck.classList.add("finished");
    }
    finishCheck.classList.add("task-check", priority);

    const taskTitleContainer = document.createElement("div");
    taskTitleContainer.classList.add("task-title-container");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = title;

    taskTitleContainer.appendChild(finishCheck);
    taskTitleContainer.appendChild(taskTitle)
    
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const taskDesc = document.createElement("p");
    taskDesc.classList.add("task-desc");
    taskDesc.textContent = desc;
    
    const taskPriority = document.createElement("div");
    const taskPriorityTitle = document.createElement("p");
    taskPriority.classList.add("task-priority", priority);
    taskPriorityTitle.textContent = priority;
    taskPriority.appendChild(taskPriorityTitle);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = dueDate;

    const taskProject = document.createElement("div");
    const taskProjectTitle = document.createElement("p");
    taskProject.classList.add("task-project");
    taskProjectTitle.textContent = project;
    taskProject.appendChild(taskProjectTitle);

    const editBtn = document.createElement("img");
    editBtn.src = EditIcon;
    editBtn.classList.add("icon");
    editBtn.textContent = "Edit";

    const removeBtn = document.createElement("img");
    removeBtn.src = DeleteIcon;
    removeBtn.classList.add("icon");
    removeBtn.textContent = "Remove";


    infoContainer.appendChild(taskDueDate);
    //infoContainer.appendChild(taskPriority);
    //infoContainer.appendChild(taskProject);
    infoContainer.appendChild(editBtn);
    infoContainer.appendChild(removeBtn);
    
    taskItemContainer.appendChild(taskTitleContainer);
    taskItemContainer.appendChild(infoContainer);

    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        PubSub.publish("TASK-REMOVED", taskItemContainer.dataset.id);
    });

    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        PubSub.publish("TASK-EDIT-REQUESTED", taskItemContainer.dataset.id);
    });

    finishCheck.addEventListener("click", (e) => {
        e.stopPropagation();
        PubSub.publish("TASK-FINISH-TOGGLED", taskItemContainer.dataset.id)
    })

    return taskItemContainer;
} 

export default CreateTaskElemement;