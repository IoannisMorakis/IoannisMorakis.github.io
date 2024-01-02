import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasComponent } from './muestras.component';

describe('MuestrasComponent', () => {
  let component: MuestrasComponent;
  let fixture: ComponentFixture<MuestrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuestrasComponent]
    });
    fixture = TestBed.createComponent(MuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
