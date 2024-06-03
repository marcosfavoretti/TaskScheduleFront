import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { CreateTask } from 'src/app/@core/interfaces/create-task';
import { HandleAction } from 'src/app/@core/interfaces/handle-action';
import { Task } from 'src/app/@core/models/Task';
import { ModalComponent } from '../modal/modal.component';

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
  selectedTask?: Task
  @ViewChild('modal') modal !: ModalComponent

  updateSubmit({modo, item}:{modo: ButtonActions, item: CreateTask}){
    console.log(item)
    const task = this.tasks?.find(task => task.id === item.id)
    if(!task) return
    Object.assign(task, item)
    console.log(task)
    this.handleClick(modo, task)
  }
  handleClick(modo: ButtonActions, item: Task) {
    if (modo === ButtonActions.UPDATE) {
      this.selectedTask = item
      this.modal.handleVisible()
      this.modal.task = item
      return
    }
    console.log(modo)
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
