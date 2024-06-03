import { Component, OnInit } from '@angular/core';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { Store } from '@ngxs/store';
import { Observable, catchError, of, tap } from 'rxjs';
import { AddTaskAction, ExecuteTaskAction, LoadTaskAction, SwitchTaskAction, UpdateTaskAction, deleteTaskAction } from 'src/app/shared/stores/tasks-stores/tasks.action';
import { MenuItem, MessageService } from 'primeng/api';
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
    private store: Store,
    private messageService: MessageService
  ){}

  task = this.task$ = this.store.select(state => state.TaskStateModal.tasks)
  
  ngOnInit(): void {
    this.store.dispatch(new LoadTaskAction())
    this.task$.subscribe((data: any)=>{
      this.menutasks = this.getMenuTasks(data)
    })
  }
  
    actionHandle(handleBtn : HandleAction){
      console.log(handleBtn.task)
      switch (handleBtn.mode) {
        case ButtonActions.DELETE:
          if(!handleBtn.task.id) return
          this.store.dispatch(new deleteTaskAction(handleBtn.task.id))
          break;
          case ButtonActions.RUN:
          if(!handleBtn.task.id) return
          this.store.dispatch(new ExecuteTaskAction(handleBtn.task.id))
            break;
            case ButtonActions.SWITCHSTATUS:
            if(!handleBtn.task.id) return
              this.store.dispatch(new SwitchTaskAction(handleBtn.task.id))
              break;
              case ButtonActions.UPDATE:
              if(!handleBtn.task.id) return
                this.store.dispatch(new UpdateTaskAction({...handleBtn.task}, handleBtn.task.id))
                break;
                case ButtonActions.UPDATE_SUBMIT:
                if(!handleBtn.task.id) return
                  this.store.dispatch(new UpdateTaskAction({...handleBtn.task}, handleBtn.task.id))  
                  break;
                  case ButtonActions.CREATE:
                  this.store.dispatch(new AddTaskAction({...handleBtn.task}))
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
              