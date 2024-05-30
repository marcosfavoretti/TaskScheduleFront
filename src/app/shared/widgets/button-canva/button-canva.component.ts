import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';
import { HandleButtonService } from 'src/app/@core/interfaces/task-button-service';
import { Task } from 'src/app/@core/models/task';
import { TaskResultList } from 'src/app/@core/models/tasks-result-list';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { popupFrases } from 'src/app/maps/confirm-popup';

@Component({
  selector: 'app-button-canva',
  templateUrl: './button-canva.component.html',
  styleUrls: ['./button-canva.component.css']
})
export class ButtonCanvaComponent {
  @Output('button-click') clickevent: EventEmitter<ButtonActions> = new EventEmitter<ButtonActions>()
  @Input('task') task!: TaskResultList
  buttonsactions = ButtonActions
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }
  confirm(event: Event, button: ButtonActions) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: popupFrases[button],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Comando aceito', life: 3000 });
        this.clickevent.emit(button)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Comando recusado', life: 3000 });
        console.log('botao nao aprovado')
      }
    });
  }


}
