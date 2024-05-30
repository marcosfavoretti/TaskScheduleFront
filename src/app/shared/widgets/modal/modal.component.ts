import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { CreateTask } from '../../../@core/interfaces/create-task';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';
import { TaskResultList } from 'src/app/@core/models/tasks-result-list';
import { ModalResponse } from 'src/app/@core/interfaces/modal-response';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { FormsTask } from 'src/app/@core/interfaces/forms-task';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('visible') visible: boolean = false
  @Input('task') task?: TaskResultList
  @Output('forms-submit') forms_submit: EventEmitter<ModalResponse> = new EventEmitter<ModalResponse>()

  onSubmit(formsInfo: FormsTask) {
    if (!this.task) return
    this.visible = false
    console.log(formsInfo)
    this.forms_submit.emit({
      item: {
        ... this.task,
        database: {
          command: formsInfo.command,
          nome: formsInfo.name,
          time_cron: formsInfo.time,
          id: this.task.database.id
        },
      },
      modo: ButtonActions.UPDATE_SUBMIT
    })
  }
}
