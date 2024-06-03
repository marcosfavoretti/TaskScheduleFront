import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { i_axios } from './axios.define';
import { CreateTask } from '../interfaces/create-task';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {

  constructor() { }

  create(task: CreateTask): Observable<Task> {
    return from(
      i_axios.post<Task>('/task', {
        nome: task.nome,
        command: task.command,
        time_cron: task.time_cron
      })
      .then(response => response.data)
      .catch(err => {
        console.error('Failed to create task', err);
        throw err;
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return from(
      i_axios.get<Task[]>('/task')
      .then(response => response.data)
      .catch(err => {
        console.error('Failed to get tasks', err);
        throw err;
      })
    );
  }

  deleteTask(taskid: number): Observable<void> {
    return from(
      i_axios.delete(`/task/${taskid}`)
      .then(() => console.log('Deleted successfully'))
      .catch(err => {
        console.error('Failed to delete task', err);
        throw err;
      })
    );
  }

  execute(taskid: number): Observable<void> {
    return from(
      i_axios.post(`/task/execute/${taskid}`)
      .then(() => console.log('Command executed'))
      .catch(err => {
        console.error('Failed to execute task', err);
        throw err;
      })
    );
  }

  update(taskid: number, newtask : CreateTask): Observable<void> {
    return from(
      i_axios.put(`/task/${taskid}`, newtask)
      .then(() => console.log('Updated successfully'))
      .catch(err => {
        console.error('Failed to update task', err);
        throw err;
      })
    );
  }

  switchStatus(taskid: number): Observable<void> {
    return from(
      i_axios.post(`/task/switchstatus/${taskid}`)
      .then(() => console.log('Status switched successfully'))
      .catch(err => {
        console.error('Failed to switch status', err);
        throw err;
      })
    );
  }
}
