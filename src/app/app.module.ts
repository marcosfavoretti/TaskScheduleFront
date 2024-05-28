import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsCadComponent } from './shared/widgets/forms-cad/forms-cad.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TasksViewComponent } from './shared/widgets/tasks-view/tasks-view.component';
import { ModalComponent } from './shared/widgets/modal/modal.component';
import { ModalExecuteLoadComponent } from './shared/widgets/modal-execute-load/modal-execute-load.component';
import { TaskHomeComponent } from './pages/task-home/task-home.component';
import { SideBarComponent } from './shared/widgets/side-bar/side-bar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'
import { DialogModule } from 'primeng/dialog';

import { KeyValuePrinterPipe } from './shared/pipes/keyvalue-printer.pipe';
import { ButtonCanvaComponent } from './shared/widgets/button-canva/button-canva.component';

@NgModule({
  declarations: [
    KeyValuePrinterPipe,
    AppComponent,
    TaskHomeComponent,
    TasksViewComponent,
    FormsCadComponent,
    ModalComponent,
    ModalExecuteLoadComponent,
    SideBarComponent,
    ButtonCanvaComponent,
  ],
  imports: [
    ButtonModule,
    BadgeModule,
    InputTextModule,
    DialogModule,
    PanelMenuModule,
    CardModule,
    ToastModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
