import PubSub from "pubsub-js";
import TaskForm from "./components/TaskFormElement.js";
import EditForm from "./components/EditFormElement.js";
import CreateTaskElemement from "./modules/TaskElement.js";
import CreateFilterForm from "./components/FilterFormElement.js";
import CreateFilterElement from "./modules/FilterElement.js";

const  DOMHandler = (function () {
    PubSub.subscribe("RENDER-VIEW", RenderTaskView);
    PubSub.subscribe("RENDER-FILTERS", RenderFilterView);

    //Main content init

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    //Filter view init

    const filterViewContainer = document.createElement("div");
    filterViewContainer.classList.add("container");

    const filterViewTitleContainer = document.createElement("div");
    filterViewTitleContainer.classList.add("filter-view-title");

    const filterViewTitle = document.createElement("h1");
    filterViewTitle.textContent = "Projects";

    const showFilterFormBtn = document.createElement("button");
    showFilterFormBtn.classList.add("btn");
    showFilterFormBtn.id = "btn-show-taskform";
    showFilterFormBtn.textContent = "+";

    filterViewTitleContainer.appendChild(filterViewTitle);
    filterViewTitleContainer.appendChild(showFilterFormBtn);

    const filterView = document.createElement("div");
    filterView.classList.add("filter-view");

    //Task view init

    const todoViewContainer = document.createElement("div");
    todoViewContainer.classList.add("container", "todo-view-container");

    const todoViewTitleContainer = document.createElement("div");
    todoViewTitleContainer.classList.add("todo-view-title");

    const todoViewTitle = document.createElement("h1");

    const showTaskFormBtn = document.createElement("button");
    showTaskFormBtn.classList.add("btn");
    showTaskFormBtn.id = "btn-show-taskform";
    showTaskFormBtn.textContent = "+";

    todoViewTitleContainer.appendChild(todoViewTitle);
    todoViewTitleContainer.appendChild(showTaskFormBtn);

    const todoView = document.createElement("div");
    todoView.classList.add("todo-view");
    
    //Creating filter form. The task form is a imported factory singleton
    const filterForm = CreateFilterForm();

    function Init () {
        document.body.appendChild(filterForm);
        document.body.appendChild(TaskForm.taskFormContainer);
        document.body.appendChild(EditForm.editFormContainer);

        document.body.appendChild(contentContainer);

        contentContainer.appendChild(filterViewContainer);
        contentContainer.appendChild(todoViewContainer);
        filterViewContainer.appendChild(filterViewTitleContainer);
        filterViewContainer.appendChild(filterView);
        todoViewContainer.appendChild(todoViewTitleContainer);
        todoViewContainer.appendChild(todoView);

        showTaskFormBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
    
            TaskForm.taskFormContainer.classList.toggle("hidden");
        });

        showFilterFormBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
    
            filterForm.classList.toggle("hidden");
        });
    }

    function RenderTaskView (msg, data) {
        todoView.innerHTML = "";

        for (const task of data.filteredTasks) {
            todoView.appendChild(CreateTaskElemement(task.title, task.desc, task.priority, task.dueDate, task.filterId, task.id, task.finished));
        }

        todoViewTitle.textContent = data.filterName;
    }

    function RenderFilterView (msg, taskFilters) {
        const filterFormChoices = taskFilters;

        filterView.innerHTML = "";

        for (const taskFilter of taskFilters) {
            filterView.appendChild(CreateFilterElement(taskFilter.name, taskFilter.id));
        }
    }

    Init()

    return { RenderFilterView }
})()

export default DOMHandler;