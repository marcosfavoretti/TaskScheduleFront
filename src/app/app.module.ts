import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsCadComponent } from './shared/widgets/forms-cad/forms-cad.component';
import { NgModule, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TasksViewComponent } from './shared/widgets/tasks-view/tasks-view.component';
import { ModalComponent } from './shared/widgets/modal/modal.component';
import { ModalExecuteLoadComponent } from './shared/widgets/modal-execute-load/modal-execute-load.component';
import { TaskHomeComponent } from './pages/task-home/task-home.component';
import { SideBarComponent } from './shared/widgets/side-bar/side-bar.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { KeyValuePrinterPipe } from './shared/pipes/keyvalue-printer.pipe';
import { ButtonCanvaComponent } from './shared/widgets/button-canva/button-canva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './shared/stores/tasks-stores/tasks.state';

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
    ConfirmPopupModule,
    TabMenuModule,
    MenuModule,
    PanelModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastModule,
    BadgeModule,
    NgbModule,
    PanelMenuModule,
  ],
  providers: [MessageService, ConfirmationService,    
    importProvidersFrom(NgxsModule.forRoot([TaskState]))
],
  bootstrap: [AppComponent]
})
export class AppModule { }
