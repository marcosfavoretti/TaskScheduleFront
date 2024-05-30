import { Component, OnInit } from '@angular/core';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { MenuItem, MessageService } from 'primeng/api';
import { TaskResultList } from 'src/app/@core/models/tasks-result-list';
import { HandleButtonService } from 'src/app/@core/interfaces/task-button-service';
import { Fix2MenuItem } from 'src/app/@core/util/fix-menuItem';
import { actionMap } from 'src/app/maps/action-map';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';
import { CreateTask } from 'src/app/@core/interfaces/create-task';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent implements OnInit {
  tasks!: Array<TaskResultList>
  menutasks!: Array<MenuItem>

  constructor(
    private tasksService: ServiceTaskService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.tasks = await this.tasksService.getTasks()
    this.menutasks = this.getMenuTasks()
  }
  async createTask($event: CreateTask) {
    await this.tasksService.create($event).then(
      () => {
        this.messageService.add({
          closable: false,
          detail: `${$event.name} foi criada com sucesso`,
          styleClass: 'bg-success p5 text-center text-white rounded',
          life: 10000
        })
      }
    ).catch(
      () => {
        this.messageService.add({
          closable: false,
          detail: `${$event.name} nao foi possivel ser criada`,
          styleClass: 'bg-danger p5 text-center text-white rounded',
          life: 10000
        })
      }
    )
    this.tasks = await this.tasksService.getTasks()
    this.menutasks = this.getMenuTasks()
  }


  async makeaction($event: HandleButtonService) {
    console.log($event.action, $event.task)
    if (!$event.task) return
    const actionfunc: (task: HandleTask) => Promise<void> = actionMap[$event.action]
    console.log('->', actionfunc)
    actionfunc({
      command: $event.task?.database.command,
      name: $event.task?.database.nome,
      id: $event.task?.database.id,
      time: $event.task?.database.time_cron
    })
      .then(
        () =>
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Comando realizado', life: 3000 })

      )
      .catch(
        (err) =>
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: `O comando teve algum problema na execução\n${err}`, life: 3000 })
      )
    this.tasks = await this.tasksService.getTasks()
    this.menutasks = this.getMenuTasks()
  }

  getMenuTasks(): Array<MenuItem> {
    return Fix2MenuItem(this.tasks)
  }


}
