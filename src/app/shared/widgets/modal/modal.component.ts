import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonActions } from 'src/app/@core/enum/button-actions.enum';
import { CreateTask } from 'src/app/@core/interfaces/create-task';
import { HandleAction } from 'src/app/@core/interfaces/handle-action';
import { Task } from 'src/app/@core/models/Task';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('visible') visible: boolean = false;
  
  private _task?: Task;
  @Input()
  set task(value: Task | undefined) {
    this._task = value;
    this.updatePresetForms();
  }
  get task(): Task | undefined {
    return this._task;
  }
  
  @Output('forms-submit') forms_submit: EventEmitter<HandleAction> = new EventEmitter<HandleAction>();

  presetForms: CreateTask = {
    command: 'comando',
    nome: 'nome',
    time_cron: "time cron",
    id: undefined
  };

  private updatePresetForms() {
    if (this._task) {
      this.presetForms = {
        command: this._task.command || 'comando',
        nome: this._task.nome || 'nome',
        time_cron: this._task.time_cron || "time cron",
        id: this._task.id
      };
    }
  }

  onSubmit(formsInfo: CreateTask) {
    if (!this.task) return;
    this.visible = false;
    this.forms_submit.emit(
      {
        mode: ButtonActions.UPDATE_SUBMIT,
        task: {...formsInfo, id: this.task.id}
      }
    );
  }

  handleVisible(){
    this.visible = !this.visible;
  }
}
