import { Component, ElementRef, ViewChild } from '@angular/core';
import { ITask } from '../../forms-cad/ITask';
import { MessageService } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../Object/tasks';
import { ServiceTaskService } from 'src/app/service/service-task.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  task: ITask = {
    command: '',
    time: '',
    name: ""
  };
  view_task !: Task
  @ViewChild('content') modal !: ElementRef

  closeResult = ""

  constructor(private msg: MessageService, private modals: NgbModal, private task_s: ServiceTaskService) { }
  async submitForm() {
    if (!this.task.command || !this.task.name || !this.task.time) {
      this.msg.add({
        closable: false,
        detail: `Fomulario invalido`,
        styleClass: 'bg-warning p5 text-center text-white rounded',
        life: 10000
      })
      throw new Error("formulario invalido")
    }
    console.log(this.task)
    await this.task_s.update(this.view_task.id_task, this.task).then(
      () => {
        this.msg.add({
          closable: false,
          detail: `tarefa alterada`,
          styleClass: 'bg-success p5 text-center text-white rounded',
          life: 10000
        })
        window.location.reload()
      }
    ).catch(
      () => {
        this.msg.add({
          closable: false,
          detail: `nao foi possivel mudar a task`,
          styleClass: 'bg-danger p5 text-center text-white rounded',
          life: 10000
        })
      }
    )
  }

  async openModal(task: Task) {
    this.view_task = task
    this.task = {
      command: task.command,
      time: task.time_cron,
      name: task.nome
    }
    this.modals.open(this.modal, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


}
