import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ServiceTaskService } from "src/app/@core/service/service-task.service";
import { AddTaskAction, ExecuteTaskAction, LoadTaskAction, SwitchTaskAction, deleteTaskAction } from "./tasks.action";
import { catchError, of, tap } from "rxjs";
import { Task } from "src/app/@core/models/Task";

export class TaskStateModal{
    tasks!: Array<Task>
}

@State({
    name: 'TaskStateModal',
    defaults:{
        tasks : []
    }
})

@Injectable()
export class TaskState{
    constructor(private taskservice: ServiceTaskService){}
    
    @Selector()
    static getTasks(state: TaskStateModal){
        return state.tasks
    }

    @Action(LoadTaskAction)
    load(ctx: StateContext<TaskStateModal>) {
      return this.taskservice.getTasks()
      .pipe(
        tap((tasks: Task[]) => {
          ctx.patchState({ tasks: tasks });
        }),
        catchError(error => {
          console.error('Failed to load tasks', error);
          return of([]);
        })
      );
    }

    @Action(AddTaskAction)
    add(ctx: StateContext<TaskStateModal>, { payload }: AddTaskAction) {
        return this.taskservice.create({
          command: payload.command,
          nome: payload.nome,
          time_cron: payload.time_cron
        }).pipe(
          tap((newTask: Task) => {
            const state = ctx.getState();
            ctx.patchState({
              tasks: [...state.tasks, newTask]
            });
          }),
          catchError(error => {
            console.error('Failed to add task', error);
            return of();
          })
        );
      }

      @Action(deleteTaskAction)
      delete(ctx: StateContext<TaskStateModal>, {taskid}: deleteTaskAction) {
        console.log(taskid)
          return this.taskservice.deleteTask(taskid)
          .pipe(
            tap(() => {
                const tasks = ctx.getState().tasks.filter(task => task.id != taskid)
                ctx.patchState({tasks: tasks})
            }),
            catchError(error => {
              console.error('Failed to add task', error);
              return of();
            })
          );
        }

        @Action(ExecuteTaskAction)
        execute(ctx:StateContext<TaskStateModal>, {taskid}: ExecuteTaskAction){
          return this.taskservice.execute(taskid)
        }

        @Action(SwitchTaskAction)
        switch(ctx: StateContext<TaskStateModal>, {taskid}: SwitchTaskAction){
            return this.taskservice.switchStatus(taskid)
            .pipe(
              tap(
                ()=>{
                const response = (ctx.getState().tasks).map(task =>{ 
                  task.id === taskid? !task : task
                  return task
                })
                ctx.patchState({
                  tasks: response
                })
              })
            )

        }
        
}