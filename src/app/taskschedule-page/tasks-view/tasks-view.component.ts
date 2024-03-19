import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../Object/tasks';
import { MessageService } from 'primeng/api';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { ModalComponent } from './modal/modal.component';
import { ModalExecuteLoadComponent } from './modal-execute-load/modal-execute-load.component';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {

  constructor(private task: ServiceTaskService, private msg: MessageService) { }
  tasks: Task[] = []
  @ViewChild("modal") modal_c !: ModalComponent
  @ViewChild("load") load !: ModalExecuteLoadComponent

  callbackMsg = ""



  async ngOnInit(): Promise<void> {
    this.tasks = await this.task.getTasks()
    console.table(this.tasks)
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  async deleteTask(task: Task) {
    await this.task.deleteTask({ name: task.nome, command: task.command, time: task.command }).then(
      () => {
        this.msg.add({
          closable: false,
          detail: `${task.nome} foi removida com sucesso`,
          styleClass: 'bg-success p5 text-center text-white rounded',
          life: 10000
        })
        this.deleteInLoadList(task)
      }
    ).catch(
      (err) => this.msg.add(
        {
          closable: false,
          detail: `${task.nome} nao foi removida!`,
          styleClass: 'bg-danger p5 text-center text-white rounded',
          life: 10000
        }
      )
    )
  }
  async executeTask(task: Task) {
    try {
      this.loadModal()
      const result = await this.task.execute({ command: task.command, name: task.nome, time: task.time_cron })
      this.showresults(result)
    }
    catch (err) {
      alert(err)
      this.showresults(String(err))
    }

  }

  private deleteInLoadList(task: Task) {
    const index = this.tasks.findIndex(find => find === task)
    this.tasks.splice(index)
  }

  openModal(task: Task) {
    this.modal_c.openModal(task)
  }

  loadModal() {
    this.load.openModal()
  }

  showresults(text: string) {
    this.load.showResults(text)
  }
}
