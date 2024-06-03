import { MenuItem } from "primeng/api";
import { Task } from "../models/Task";

export function Fix2MenuItem(task: Array<Task>): Array<MenuItem> {
    const menuItens: Array<MenuItem> = task.map(map => {
        return {
            label: `${map.id} - ${map.nome}`,
            icon: map.taskInfo.running ? 'pi pi-stopwatch' : 'pi pi-pause',
            items: [
                {   
                    ...map
                }
            ]
        }
    });
    return menuItens;
}
