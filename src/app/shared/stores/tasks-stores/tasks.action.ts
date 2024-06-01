import { Task } from "src/app/@core/models/Task"

export class AddTaskAction{
    static readonly type = '[AddTask] add task'
    constructor(public payload: Task){}
}

export class LoadTaskAction{
    static readonly type = '[AddTask] load task'
    constructor(){}
}
export class UpdateTaskAction{
    static readonly type = '[AddTask] update task'
    constructor(public payload: Task, public taskid: number){}
}

export class ExecuteTaskAction{
    static readonly type = '[AddTask] execute task'
    constructor(public taskid: number){}
}


export class SwitchTaskAction{
    static readonly type = '[AddTask] switch task'
    constructor(public taskid: number){}
}


export class deleteTaskAction{
    static readonly type = '[AddTask] delete task'
    constructor(public taskid: number){}
}