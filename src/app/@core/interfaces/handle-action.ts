import { ButtonActions } from "../enum/button-actions.enum";
import { CreateTask } from "./create-task";

export interface HandleAction {
    mode : ButtonActions,
    task : CreateTask
}