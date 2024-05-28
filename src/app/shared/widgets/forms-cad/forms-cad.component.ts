import { Component } from '@angular/core';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';

@Component({
  selector: 'app-forms-cad',
  templateUrl: './forms-cad.component.html',
  styleUrls: ['./forms-cad.component.css']
})
export class FormsCadComponent {

  constructor(private tasks: ServiceTaskService, private msg: MessageService) {

  }
  async submitForm(forms: NgForm) {
    if (!forms.valid) {
      console.log('invalido')
      this.msg.add({
        closable: false,
        detail: `Fomulario invalido`,
        styleClass: 'bg-warning p5 text-center text-white rounded',
        life: 10000
      })
      return
    }
    await this.tasks.create({
      command: forms.form.controls['comando'].value,
      name: forms.form.controls['nome'].value,
      time: forms.form.controls['tempo'].value
    }).then(
      () => {
        this.msg.add({
          closable: false,
          detail: `${forms.form.controls['nome'].value} foi criada com sucesso`,
          styleClass: 'bg-success p5 text-center text-white rounded',
          life: 10000
        })
      }
    ).catch(
      () => {
        this.msg.add({
          closable: false,
          detail: `${forms.form.controls['nome'].value} nao foi possivel ser criada`,
          styleClass: 'bg-danger p5 text-center text-white rounded',
          life: 10000
        })
      }
    )


    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
  }
}
