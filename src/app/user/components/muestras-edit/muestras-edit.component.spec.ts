import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasEditComponent } from './muestras-edit.component';

describe('MuestrasEditComponent', () => {
  let component: MuestrasEditComponent;
  let fixture: ComponentFixture<MuestrasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuestrasEditComponent]
    });
    fixture = TestBed.createComponent(MuestrasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
