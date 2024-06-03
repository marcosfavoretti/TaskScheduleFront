import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ServiceTaskService } from "src/app/@core/service/service-task.service";
import { AddTaskAction, ExecuteTaskAction, LoadTaskAction, SwitchTaskAction, UpdateTaskAction, deleteTaskAction } from "./tasks.action";
import { catchError, of, tap } from "rxjs";
import { Task } from "src/app/@core/models/Task";
import { MessageService } from "primeng/api";

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
    constructor(private taskservice: ServiceTaskService,private messageService: MessageService){}
    
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
          this.messageService.add({ severity: 'secondary', summary: 'Confirmed', detail: 'Tarefa Carregadas', life: 3000 });
        }),
        catchError(error => {
          console.error('Failed to load tasks', error);
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Problemas na Inicialização', life: 3000 });
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
            Object.assign(newTask, {taskInfo:{running: true}})
            ctx.patchState({
              tasks: [...state.tasks, newTask]
            });
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Tarefa Adicionada', life: 3000 });
          }),
          catchError(error => {
            console.error('Failed to add task', error);
            this.messageService.add({ severity: 'error', summary: 'error', detail: 'Não foi possível adicionar a tarefa', life: 3000 });

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
                const tasks = ctx.getState().tasks.filter(task => task.id !== taskid)
                ctx.patchState({tasks: tasks})
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Deletado com sucesso', life: 3000 });

            }),
            catchError(error => {
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'Não foi possível deletar a tarefa', life: 3000 });

              return of();
            })
          );
        }

        @Action(ExecuteTaskAction)
        execute(ctx:StateContext<TaskStateModal>, {taskid}: ExecuteTaskAction){
          return this.taskservice.execute(taskid)
          .pipe(
            tap(
              ()=>{
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Tarefa Executada', life: 3000 });

              }
            ),
            catchError(error => {
              console.log(error)
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'Tarefa teve saída com valor 1', life: 3000 });
              return error;
            })
          )
        }

        @Action(SwitchTaskAction)
        switch(ctx: StateContext<TaskStateModal>, {taskid}: SwitchTaskAction){
            console.log(taskid)
            return this.taskservice.switchStatus(taskid)
            .pipe(
              tap(
                ()=>{
                const response = (ctx.getState().tasks).map(task =>{ 
                  if(taskid === task.id) task.taskInfo.running = !task.taskInfo.running 
                  return task
                })
                ctx.patchState({
                  tasks: response
                })
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Status da tarefa foi mudado', life: 3000 });
              }),
              catchError(error => {
                  this.messageService.add({ severity: 'error', summary: 'error', detail: 'Não foi possível mudar o status a tarefa', life: 3000 });
                return of();
              })
            )

        }

        
        @Action(UpdateTaskAction)
    update(ctx: StateContext<TaskStateModal>, { payload, taskid }: UpdateTaskAction) {
    console.log('ai');
    console.log(payload, taskid);
    return this.taskservice.update(taskid, payload)
        .pipe(
            tap(() => {
                const response = ctx.getState().tasks.map(task => {
                    if (task.id === taskid) {
                        Object.assign(task, payload);
                    }
                    return task;
                });
                ctx.setState({ tasks: response });
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Tarefa Atualizada', life: 3000 });

            }),
            catchError(error => {
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'Não foi possível atualizar a tarefa', life: 3000 });
            return of();
          })
        );
}
        
}