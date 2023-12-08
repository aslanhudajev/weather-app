import { MathUtil } from "./Utils";
import CreateTaskFilter from "./TaskFilter";

export default function CreateProject (projectTitle) {
    let title = projectTitle;
    let id = MathUtil.RandomRange(100000);

    let projectFilter = CreateTaskFilter(title, (task) => task.project === title);
    
    return { title, id, projectFilter };
}