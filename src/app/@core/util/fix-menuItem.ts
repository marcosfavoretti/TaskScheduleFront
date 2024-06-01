import { MenuItem } from "primeng/api";
import { TaskModel } from "../interfaces/task-model";

export function Fix2MenuItem(task: Array<TaskModel>): Array<MenuItem> {
    const menuItens: Array<MenuItem> = task.map(map => {
        return {
            label: `${map.id} - ${map.nome}`,
            icon: map.nome ? 'pi pi-stopwatch' : 'pi pi-pause',
            items: [
                {
                    map
                }
            ]
        }
    });
    return menuItens;
}
