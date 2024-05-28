import { TaskHttpResponse } from "../models/task-http-response";
import { TaskResultList } from "../models/tasks-result-list";

export function fixResponse(response: Array<TaskHttpResponse>): TaskResultList[] {
    const fixArray: TaskResultList[] = response.map(map => { return { database: map.database, lastexec: map.lastexec, task: map.task[0] } })
    return fixArray
}