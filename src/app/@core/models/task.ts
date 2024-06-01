import { TaskInfo } from "./TaskInfo"

export type Task = {
    id?: number
    nome: string
    command: string
    time_cron: string
    taskInfo: TaskInfo
}