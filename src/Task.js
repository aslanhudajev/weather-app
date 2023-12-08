import { MathUtil } from "./Utils.js";

export default function CreateTask (taskTitle = "Untitled", taskDesc = "", taskPriority = "high", taskDueDate = new Date(), taskFilterId) {
    let title = taskTitle;
    let description = taskDesc;
    let priority = taskPriority;
    let dueDate = taskDueDate;
    let filterId = taskFilterId;
    let finished = false;
    let id = MathUtil.RandomRange(100000);

    return { title, description, priority, dueDate, filterId, finished, id };
}