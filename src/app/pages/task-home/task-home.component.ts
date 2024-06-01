import { Component, OnInit } from '@angular/core';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { AddTaskAction, ExecuteTaskAction, LoadTaskAction, SwitchTaskAction, UpdateTaskAction, deleteTaskAction } from 'src/app/shared/stores/tasks-stores/tasks.action';
import { MenuItem } from 'primeng/api';
import { Fix2MenuItem } from 'src/app/@core/util/fix-menuItem';
import { Task } from 'src/app/@core/models/Task';
import { HandleAction } from 'src/app/@core/interfaces/handle-action';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent  implements OnInit{
  // tasks!: Array<TaskHttpResponse>
  menutasks!: Array<MenuItem>
  task$ !: Observable<Task> ;
  buttonAction = ButtonActions
  
  constructor(
    private store: Store
  ){}

  task = this.task$ = this.store.select(state => state.TaskStateModal.tasks)
  
  ngOnInit(): void {
    this.store.dispatch(new LoadTaskAction())
    this.task$.subscribe((data: any)=>{
      this.menutasks = this.getMenuTasks(data)
    })
  }
  
    actionHandle(handleBtn : HandleAction){
      console.log(actionButton, task)
      switch (actionButton) {
        case ButtonActions.DELETE:
          if(!task.id)return
          this.store.dispatch(new deleteTaskAction(task.id))
          break;
          case ButtonActions.RUN:
            if(!task.id)return
            this.store.dispatch(new ExecuteTaskAction(task.id))
            break;
            case ButtonActions.SWITCHSTATUS:
              if(!task.id)return
              this.store.dispatch(new SwitchTaskAction(task.id))
              break;
              case ButtonActions.UPDATE:
                if(!task.id)return
                this.store.dispatch(new UpdateTaskAction({...task}, task.id))
                break;
                case ButtonActions.UPDATE_SUBMIT:
                  if(!task.id)return
                  this.store.dispatch(new UpdateTaskAction({...task}, task.id))  
                  break;
                  case ButtonActions.CREATE:
                  this.store.dispatch(new AddTaskAction({...task}))
                  break;
                  
                  default:
                    throw new Error('não foi possível mapear a ação')
                    break;
                  }
                }

                getMenuTasks(task: Task[]) {
                  return Fix2MenuItem(task)
                }
              
              }
              