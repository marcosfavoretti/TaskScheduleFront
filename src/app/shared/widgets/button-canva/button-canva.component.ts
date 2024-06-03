import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { popupFrases } from 'src/app/@core/maps/confirm-popup';
import { Task } from 'src/app/@core/models/Task';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';

@Component({
  selector: 'app-button-canva',
  templateUrl: './button-canva.component.html',
  styleUrls: ['./button-canva.component.css']
})
export class ButtonCanvaComponent {
  @Output('button-click') clickevent: EventEmitter<ButtonActions> = new EventEmitter<ButtonActions>()
  @Input('task') task!: Task
  buttonsactions = ButtonActions
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }
  confirm(event: Event, button: ButtonActions) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: popupFrases[button],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'comando será executado!', life: 3000 });
        console.log(button)
        this.clickevent.emit(button)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'comando recusado', life: 3000 });
        console.log('botao nao aprovado')
      }
    });
  }


}
