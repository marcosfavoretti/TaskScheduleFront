import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTaskService } from 'src/app/@core/service/service-task.service';

@Component({
  selector: 'app-modal-execute-load',
  templateUrl: './modal-execute-load.component.html',
  styleUrls: ['./modal-execute-load.component.css']
})
export class ModalExecuteLoadComponent {

  @ViewChild('content') modal !: ElementRef
  closeResult = ""
  results: string = ""

  constructor(private modals: NgbModal) { }

  async openModal() {
    this.modals.open(this.modal, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.results = ""
      },
    );
  }
  async showResults(text: string) {
    this.results = text
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


}
