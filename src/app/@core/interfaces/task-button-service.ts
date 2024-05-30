import { ButtonActions } from "../enum/button-actions.enum";
import { TaskResultList } from "../models/tasks-result-list";
import { HandleTask } from "./handle-task";

export interface HandleButtonService {
    task: TaskResultList | undefined,
    action: ButtonActions
}