import { MenuItem } from "primeng/api";
import { TaskResultList } from "../models/tasks-result-list";

export function Fix2MenuItem(task: Array<TaskResultList>) {
    const menuItens: Array<MenuItem> = task.map(map => {
        return {
            label: `${map.database.id} - ${map.database.nome}`,
            icon: map.task.running ? 'pi pi-stopwatch' : 'pi pi-pause',
            items: [
                {
                    ...map
                }
            ]
        }
    })
    return menuItens
}