import { Injectable } from '@angular/core';
import { i_axios } from './axios.define';
import { CreateTask } from '../interfaces/create-task';
import { TaskHttpResponse } from '../models/task-http-response';
import { TaskResultList } from '../models/tasks-result-list';
import { fixResponse } from '../util/fix-response';
import { HandleTask } from '../interfaces/handle-task';
@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {

  constructor() { }

  async create(task: CreateTask) {
    await i_axios.post('/task', {
      "nome": task.name,
      "command": task.command,
      "time_cron": task.time
    })
      .then(() => { console.log('criado com sucesso') })
      .catch(() => { console.log('falha ao criar a tarefa') })
  }

  async getTasks(): Promise<TaskResultList[]> {
    const { data } = await i_axios.get<TaskHttpResponse[]>('/task').catch((err) => { throw new Error(err) })
    const fixArray = fixResponse(data)
    return fixArray
  }

  async deleteTask(taskid: number) {
    await i_axios.delete(`/task/${taskid}`)
      .then(() => { console.log('criado com sucesso') })
      .catch(() => { console.log('falha ao criar a tarefa') })
  }

  async execute(taskid: number): Promise<string> {
    return await i_axios.post(`/task/execute/${taskid}`).then(
      (data) => {
        console.log('comando executado')
        return data.data
      }
    ).catch(
      () => {
        console.log('deu erro ')
        throw new Error('nao foi concluido o script')
      }
    )

  }
  async update(task_id: number, new_task: CreateTask) {
    console.log(new_task)
    await i_axios.put(`/task/${task_id}`, {
      ...new_task,
    })
      .then(() => { console.log('criado com sucesso') })
      .catch(() => { console.log('falha ao criar a tarefa') })
  }

  async switchStatus(taskid: number) {
    await i_axios.post(`/task/execute/${taskid}`)
      .then(() => { console.log('criado com sucesso') })
      .catch(() => { console.log('falha ao criar a tarefa') })
  }
}
