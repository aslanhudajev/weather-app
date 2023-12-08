const StorageHandler = (function () {
    function SaveTasks (tasks) {
        localStorage.tasks = JSON.stringify(tasks);
    }

    function LoadTasks () {
        const tasks = localStorage.tasks;
        if (tasks !== null && tasks !== undefined) {
            return JSON.parse(tasks);
        } 
        else {
            return [];
        }
    }

    function SaveFilters (taskFilters) {
        localStorage.taskFilters = JSON.stringify(taskFilters);
    }

    function LoadFilters () {
        const taskFilters = localStorage.taskFilters;
        if (taskFilters !== null && taskFilters !== undefined) {
            return JSON.parse(taskFilters);
        } 
        else {
            return [];
        }
    }

    return { SaveTasks, LoadTasks, SaveFilters, LoadFilters}
})()

export default StorageHandler;