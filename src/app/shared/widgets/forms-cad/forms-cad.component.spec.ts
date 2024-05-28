import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadComponent } from './forms-cad.component';

describe('FormsCadComponent', () => {
  let component: FormsCadComponent;
  let fixture: ComponentFixture<FormsCadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsCadComponent]
    });
    fixture = TestBed.createComponent(FormsCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
