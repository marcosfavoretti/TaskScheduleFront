import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';
import { Task } from 'src/app/@core/models/task';
import { CreateTask } from 'src/app/@core/interfaces/create-task';
import { FormsTask } from 'src/app/@core/interfaces/forms-task';

@Component({
  selector: 'app-forms-cad',
  templateUrl: './forms-cad.component.html',
  styleUrls: ['./forms-cad.component.css']
})
export class FormsCadComponent {
  @Input('tittle') tittle!: string
  @Input("preset-input") preset_input?: CreateTask
  @Output('forms-submit') forms_submit: EventEmitter<FormsTask> = new EventEmitter<FormsTask>();
  constructor(
    private msg: MessageService) { }
  async submitForm(forms: NgForm) {
    if (!forms.valid) {
      console.log('invalido', forms.value)
      this.msg.add({
        closable: false,
        detail: `Fomulario invalido`,
        styleClass: 'bg-warning p5 text-center text-white rounded',
        life: 10000
      })
      return
    }
    this.forms_submit.emit({
      command: forms.form.controls['comando'].value,
      name: forms.form.controls['nome'].value,
      time: forms.form.controls['tempo'].value
    })
    forms.reset()



    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
  }
}
