import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { HandleButtonService } from 'src/app/@core/interfaces/task-button-service';
import { TaskResultList } from 'src/app/@core/models/tasks-result-list';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  modalstatus: boolean = false
  @Input('tasksmenu') tasksmenu?: Array<MenuItem>
  @Input('tasks') tasks?: Array<TaskResultList>
  @Output('task-handle') task_handle: EventEmitter<HandleButtonService> = new EventEmitter<HandleButtonService>()
  selectedTask?: TaskResultList


  handleClick(modo: ButtonActions, item: TaskResultList) {
    console.log(item)
    if (modo === ButtonActions.UPDATE) {
      this.selectedTask = item
      this.modalstatus = true
      return
    }
    this.task_handle.emit({
      action: modo,
      task: item
    })
  }

  // find_task(targetTask: TaskResultList): TaskResultList | undefined {
  //   const result = this.tasks?.find(
  //     item => item.database.nome === targetTask.database.nome
  //   )
  //   return result
  // }//?????? 

}
