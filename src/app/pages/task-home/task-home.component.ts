import { Component, OnInit } from '@angular/core';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { MenuItem } from 'primeng/api';
import { TaskHttpResponse } from 'src/app/@core/models/task-http-response';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent implements OnInit {
  tasks!: Array<MenuItem>

  constructor(private tasksService: ServiceTaskService) { }

  async ngOnInit() {
    const tasks = await this.tasksService.getTasks()
    const menuItens: Array<MenuItem> = tasks.map(map => {
      return {
        label: `${map.database.id} - ${map.database.nome}`,
        items: [
          {
            ...map
          }
        ]
      }
    })
    this.tasks = menuItens
  }




}
