import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { CreateTask } from 'src/app/@core/interfaces/create-task';
import { HandleAction } from 'src/app/@core/interfaces/handle-action';
import { Task } from 'src/app/@core/models/Task';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('visible') visible: boolean = false
  @Input('task') task!: Task
  @Output('forms-submit') forms_submit: EventEmitter<HandleAction> = new EventEmitter<HandleAction>()

  onSubmit(formsInfo: CreateTask) {
    if (!this.task) return
    this.visible = false
    console.log(formsInfo)
    this.forms_submit.emit(
      {
        mode: ButtonActions.UPDATE_SUBMIT,
        task: formsInfo
      }
    )
      
  }
}
