import PubSub from "pubsub-js";
import { MathUtil } from "./Utils.js";

function CreateTaskFilter (filterName, fn = (e) => e) {
    const name = filterName;
    const filterQuery = (name + "-VIEW-REQUESTED").toUpperCase();
    const id = MathUtil.RandomRange(1000000);

    function FilterTasks (tasks) {
        return tasks.filter(fn);
    }

    function GetQuery () {
        return filterQuery;
    }    

    return { name, id, FilterTasks, GetQuery };
}

export default CreateTaskFilter;