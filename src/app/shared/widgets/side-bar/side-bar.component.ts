import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { HandleAction } from 'src/app/@core/interfaces/handle-action';
import { Task } from 'src/app/@core/models/Task';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  modalstatus: boolean = false
  @Input('tasksmenu') tasksmenu?: Array<MenuItem>
  @Input('tasks') tasks?: Array<Task>
  @Output('task-handle') task_handle: EventEmitter<HandleAction> = new EventEmitter<HandleAction>()
  selectedTask!: Task


  handleClick(modo: ButtonActions, item: Task) {
    console.log(item)
    if (modo === ButtonActions.UPDATE) {
      this.selectedTask = item
      this.modalstatus = true
      return
    }
    this.task_handle.emit({
      mode: modo,
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
