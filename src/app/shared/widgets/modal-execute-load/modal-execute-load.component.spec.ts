import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExecuteLoadComponent } from './modal-execute-load.component';

describe('ModalExecuteLoadComponent', () => {
  let component: ModalExecuteLoadComponent;
  let fixture: ComponentFixture<ModalExecuteLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExecuteLoadComponent]
    });
    fixture = TestBed.createComponent(ModalExecuteLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
