import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';
import { } from '../../../@core/interfaces/create-task';
import { HandleTask } from 'src/app/@core/interfaces/handle-task';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('visible') visible: boolean = false

}
