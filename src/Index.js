import PubSub, { publish } from "pubsub-js";

import DOMHandler from "./DOMHandler";
import StorageHandler from "./StorageHandler"

import CreateTask from "./Task";
import CreateTaskFilter from "./TaskFilter";

import "./assets/style.css"
import EditForm from "./components/EditFormElement";

const App = (function () {
    PubSub.subscribe("TASK-ADDED", AddTask);
    PubSub.subscribe("TASK-REMOVED", RemoveTask);
    PubSub.subscribe("TASK-EDITED", EditTask);
    PubSub.subscribe("TASK-EDIT-REQUESTED", SendEditData);
    PubSub.subscribe("TASK-FINISH-TOGGLED", ToggleFinishTask);
    PubSub.subscribe("FILTER-ADDED", AddFilter);
    PubSub.subscribe("FILTER-CHANGED", ChangeFilter);

    let tasks = StorageHandler.LoadTasks();
    let taskFilters = StorageHandler.LoadFilters();
    console.log(tasks);
    console.log(taskFilters);

    let taskPendingEditIndex;

    let currentFilter;

    function Init () {
        if (taskFilters.length === 0) {
            taskFilters.push(CreateTaskFilter("Inbox"));
            StorageHandler.SaveFilters(taskFilters);
        }
        currentFilter = taskFilters[0];

        PubSub.publish("RENDER-FILTERS", taskFilters);
        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function AddTask (msg, taskData) {
        tasks.push(CreateTask(taskData.taskTitle, taskData.taskDecc, taskData.taskPriority, taskData.taskDueDate, taskData.taskFilterId));
        StorageHandler.SaveTasks(tasks);
        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function RemoveTask (msg, id) {
        tasks = tasks.filter((task) => task.id !== parseInt(id));
        StorageHandler.SaveTasks(tasks);
        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function EditTask (msg, taskEditData) {
        tasks[taskPendingEditIndex].title = taskEditData.taskTitle;
        tasks[taskPendingEditIndex].description = taskEditData.taskDesc;
        tasks[taskPendingEditIndex].priority = taskEditData.taskPriority;
        tasks[taskPendingEditIndex].filterId = taskEditData.taskFilterId;
        tasks[taskPendingEditIndex].dueDate = taskEditData.taskDueDate;
        StorageHandler.SaveTasks(tasks);
        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function ToggleFinishTask (msg, id) {
        const taskFinishedId = tasks.findIndex((task) => task.id === parseInt(id));
        if (tasks[taskFinishedId].finished === false) {
            tasks[taskFinishedId].finished = true;
        } else {
            tasks[taskFinishedId].finished = false;
        }

        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function AddFilter (msg, filterData) {
        taskFilters.push(CreateTaskFilter(filterData.filterName, (task) => task.title === this.name));
        StorageHandler.SaveFilters(taskFilters);
        PubSub.publish("RENDER-FILTERS", taskFilters);
    }

    function RemoveFilter (id) {
        taskFilters = taskFilters.filter((project) => project.id !== id);
        StorageHandler.SaveFilters(taskFilters);
        PubSub.publish("RENDER-FILTERS", taskFilters);
    }

    function ChangeFilter (msg, filterId) {
        currentFilter = taskFilters.find((filter) => filter.id === filterId);
        PubSub.publish("RENDER-VIEW", FilterTasks());
    }

    function FilterTasks () {
        //return tasks.filter((task) => task.project === currentFilter.name);
        const filteredTasks = tasks.filter((task) => parseInt(task.filterId) === currentFilter.id);
        filteredTasks.sort((task) => {
            if (task.finished === false) {
                return -1;
            } else {
                return 1;
            }
        })

        return { filteredTasks, filterName: currentFilter.name }
    }

    function SendEditData (msg, id) {
        taskPendingEditIndex = tasks.findIndex((task) => task.id === parseInt(id));
        const taskToEdit = tasks[taskPendingEditIndex];
        PubSub.publish("TASK-EDIT-STARTED", taskToEdit);
    }

    Init();
})()

export default App;