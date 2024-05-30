import { ButtonActions } from "../@core/enum/button-actions.enum";
import { ServiceTaskService } from "../@core/service/service-task.service";
export const actionMap: Record<ButtonActions, any> = {
    delete: new ServiceTaskService().deleteTask,
    run: new ServiceTaskService().execute,
    switch: new ServiceTaskService().switchStatus,
    update: new ServiceTaskService().update,
    update_submit: new ServiceTaskService().update,
}