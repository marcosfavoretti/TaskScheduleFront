import { ButtonActions } from "../enum/button-actions.enum";
import { TaskResultList } from "../models/tasks-result-list";

export interface ModalResponse {
    modo: ButtonActions,
    item: TaskResultList
}