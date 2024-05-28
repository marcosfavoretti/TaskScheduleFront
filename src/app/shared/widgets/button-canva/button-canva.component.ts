import { Component, Input, OnInit } from '@angular/core';
import { TaskResultList } from 'src/app/@core/models/tasks-result-list';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';

@Component({
  selector: 'app-button-canva',
  templateUrl: './button-canva.component.html',
  styleUrls: ['./button-canva.component.css']
})
export class ButtonCanvaComponent {

  @Input('task') task!: TaskResultList
  constructor(private taskservice: ServiceTaskService) { }

  async deletetask() {
    await this.taskservice.deleteTask(this.task.database.id)
  }

  async switchstatustask() {
    await this.taskservice.switchStatus(this.task.database.id)
  }

  edittask() {

  }

  submitedit() {

  }
  async executetask() {
    await this.taskservice.execute(this.task.database.id)

  }
}
